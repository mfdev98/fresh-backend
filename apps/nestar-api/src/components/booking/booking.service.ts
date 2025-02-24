import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Bookings, Booking } from '../../libs/dto/booking/booking';
import {
	AgentBookingsInquiry,
	AllBookingsInquiry,
	OrdinaryInquiry,
	BookingsInquiry,
	BookingInput,
} from '../../libs/dto/booking/booking.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { MemberService } from '../member/member.service';
import { StatisticModifier, T } from '../../libs/types/common';
import { BookingStatus } from '../../libs/enums/booking.enum';
import { ViewGroup } from '../../libs/enums/view.enum';
import { ViewService } from '../view/view.service';
import { BookingUpdate } from '../../libs/dto/booking/booking.update';
import * as moment from 'moment';
import { lookupAuthMemberLiked, lookupMember, shapeIntoMongoObjectId } from '../../libs/config';
import { LikeService } from '../like/like.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';

@Injectable()
export class BookingService {
	constructor(
		@InjectModel('Booking') private readonly bookingModel: Model<Booking>,
		private memberService: MemberService,
		private viewService: ViewService,
		private likeService: LikeService,
	) {}

	public async createBooking(input: BookingInput): Promise<Booking> {
		try {
			const result = await this.bookingModel.create(input);
			//increase memberProperties
			await this.memberService.memberStatsEditor({ _id: result.memberId, targetKey: 'memberBookings', modifier: 1 });

			return result;
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}

	public async getBooking(memberId: ObjectId, bookingId: ObjectId): Promise<Booking> {
		const search: T = {
			_id: bookingId,
			bookingStatus: BookingStatus.ACTIVE,
		};
		console.log('search', search);
		const targetBooking: Booking = await this.bookingModel.findOne(search).lean().exec();
		console.log('target: ', targetBooking);
		if (!targetBooking) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		if (memberId) {
			const viewInput = { memberId: memberId, viewRefId: bookingId, viewGroup: ViewGroup.BOOKING };
			const newView = await this.viewService.recordView(viewInput);
			if (newView) {
				await this.bookingStatsEditor({ _id: bookingId, targetKey: 'bookingViews', modifier: 1 });
				targetBooking.bookingViews++;

				const likeInput = { memberId: memberId, likeRefId: bookingId, likeGroup: LikeGroup.BOOKING };
				targetBooking.meLiked = await this.likeService.checkLikeExistence(likeInput);
			}
			const likeInput = { memberId: memberId, likeRefId: bookingId, likeGroup: LikeGroup.BOOKING };
			targetBooking.meLiked = await this.likeService.checkLikeExistence(likeInput);
		}
		targetBooking.memberData = await this.memberService.getMember(null, targetBooking.memberId);
		return targetBooking;
	}

	public async updateBooking(memberId: ObjectId, input: BookingUpdate): Promise<Booking> {
		let { bookingStatus, soldAt, deletedAt } = input;
		const search: T = {
			_id: input._id,
			memberId: memberId,
			bookingStatus: BookingStatus.ACTIVE,
		};

		if (bookingStatus === BookingStatus.SOLD) soldAt = moment().toDate();
		else if (bookingStatus === BookingStatus.DELETE) deletedAt = moment().toDate();

		const result = await this.bookingModel.findByIdAndUpdate(search, input, { new: true }).exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		if (soldAt || deletedAt) {
			await this.memberService.memberStatsEditor({
				_id: memberId,
				targetKey: 'memberBookings',
				modifier: -1,
			});
		}

		return result;
	}

	public async getBookings(memberId: ObjectId, input: BookingsInquiry): Promise<Bookings> {
		const match: T = { bookingStatus: BookingStatus.ACTIVE };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		this.shapeMatchQuery(match, input);
		console.log('match:', match);

		const result = await this.bookingModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupAuthMemberLiked(memberId),
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		return result[0];
	}

	private shapeMatchQuery(match: T, input: BookingsInquiry): void {
		const { memberId, locationList, typeList, periodRange, priceRange, text } = input.search;

		if (memberId) match.memberId = shapeIntoMongoObjectId(memberId);
		if (locationList && locationList.length) match.bookingLocation = { $in: locationList };
		if (typeList && typeList.length) match.bookingType = { $in: typeList };

		if (priceRange) match.bookingPrice = { $gte: priceRange.start, $lte: priceRange.end };
		if (periodRange) match.createdAt = { $gte: periodRange.start, $lte: periodRange.end };

		if (text) match.bookingTitle = { $regex: new RegExp(text, 'i') };
	}

	public async getFavorites(memberId: ObjectId, input: OrdinaryInquiry): Promise<Bookings> {
		return await this.likeService.getFavoriteBookings(memberId, input);
	}

	public async getVisited(memberId: ObjectId, input: OrdinaryInquiry): Promise<Bookings> {
		return await this.viewService.getVisitedBookings(memberId, input);
	}

	public async getAgentBookings(memberId: ObjectId, input: AgentBookingsInquiry): Promise<Bookings> {
		const { bookingStatus } = input.search;
		if (bookingStatus === BookingStatus.DELETE) throw new BadRequestException(Message.NOT_ALLOWED_REQUEST);

		const match: T = {
			memberId: memberId,
			bookingStatus: bookingStatus ?? { $ne: BookingStatus.DELETE },
		};
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		const result = await this.bookingModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		return result[0];
	}

	public async likeTargetBooking(memberId: ObjectId, likeRefId: ObjectId): Promise<Booking> {
		const target: Booking = await this.bookingModel
			.findOne({ _id: likeRefId, bookingStatus: BookingStatus.ACTIVE })
			.exec();
		if (!target) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		const input: LikeInput = {
			memberId: memberId,
			likeRefId: likeRefId,
			likeGroup: LikeGroup.BOOKING,
		};

		const modifier: number = await this.likeService.toggleLike(input);
		const result = await this.bookingStatsEditor({ _id: likeRefId, targetKey: 'bookingLikes', modifier: modifier });

		if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
		return result;
	}

	public async getAllBookingsByAdmin(input: AllBookingsInquiry): Promise<Bookings> {
		const { bookingStatus, bookingLocationList } = input.search;
		const match: T = {};
		const sort: T = {
			[input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC,
		};

		if (bookingStatus) match.bookingStatus = bookingStatus;
		if (bookingLocationList) match.bookingLocation = { $in: bookingLocationList };

		const result = await this.bookingModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();

		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		return result[0];
	}

	public async updateBookingByAdmin(input: BookingUpdate): Promise<Booking> {
		let { bookingStatus, soldAt, deletedAt } = input;
		const search: T = {
			_id: input._id,
			bookingStatus: BookingStatus.ACTIVE,
		};

		if (bookingStatus === BookingStatus.SOLD) soldAt = moment().toDate();
		else if (bookingStatus === BookingStatus.DELETE) deletedAt = moment().toDate();

		const result = await this.bookingModel
			.findOneAndUpdate(search, input, {
				new: true,
			})
			.exec();

		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		if (soldAt || deletedAt) {
			await this.memberService.memberStatsEditor({
				_id: result.memberId,
				targetKey: 'memberBookings',
				modifier: -1,
			});
		}
		return result;
	}

	public async removeBookingByAdmin(bookingId: ObjectId): Promise<Booking> {
		const search: T = { _id: bookingId, bookingStatus: BookingStatus.DELETE };
		const result = await this.bookingModel.findOneAndDelete(search).exec();
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);

		return result;
	}

	public async bookingStatsEditor(input: StatisticModifier): Promise<Booking> {
		const { _id, targetKey, modifier } = input;
		return await this.bookingModel
			.findByIdAndUpdate(
				_id,
				{
					$inc: { [targetKey]: modifier },
				},
				{ new: true },
			)
			.exec();
	}
}
