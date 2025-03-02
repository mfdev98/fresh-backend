import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Bookings, Booking } from '../../libs/dto/booking/booking';
import {
	AgentBookingsInquiry,
	AllBookingsInquiry,
	BookingsInquiry,
	BookingInput,
	BOrdinaryInquiry,
} from '../../libs/dto/booking/booking.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { BookingUpdate } from '../../libs/dto/booking/booking.update';
import { AuthGuard } from '../auth/guards/auth.guard';

@Resolver()
export class BookingResolver {
	constructor(private readonly bookingService: BookingService) {}

	@Roles(MemberType.AGENT)
	@UseGuards(RolesGuard)
	@Mutation(() => Booking)
	public async createBooking(
		@Args('input') input: BookingInput,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Booking> {
		console.log('Mutation: createBooking');
		input.memberId = memberId;
		return await this.bookingService.createBooking(input);
	}

	@UseGuards(WithoutGuard)
	@Query((returns) => Booking)
	public async getBooking(@Args('bookingId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Booking> {
		console.log('Query: getBooking');
		const bookingId = shapeIntoMongoObjectId(input);
		console.log('id, member: ', bookingId);

		return await this.bookingService.getBooking(memberId, bookingId);
	}

	@Roles(MemberType.AGENT)
	@UseGuards(RolesGuard)
	@Mutation((returns) => Booking)
	public async updateBooking(
		@Args('input') input: BookingUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Booking> {
		console.log('Mutation: updateBooking');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.bookingService.updateBooking(memberId, input);
	}

	@UseGuards(WithoutGuard)
	@Query((returns) => Bookings)
	public async getBookings(
		@Args('input') input: BookingsInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Bookings> {
		console.log('Query: getBookings');
		return await this.bookingService.getBookings(memberId, input);
	}

	// @UseGuards(AuthGuard)
	// @Query((returns) => Bookings)
	// public async getFavorites(
	// 	@Args('input') input: BOrdinaryInquiry,
	// 	@AuthMember('_id') memberId: ObjectId,
	// ): Promise<Bookings> {
	// 	console.log('Querty: getFavorites');
	// 	return await this.bookingService.getFavorites(memberId, input);
	// }

	// @UseGuards(AuthGuard)
	// @Query((returns) => Bookings)
	// public async getVisited(
	// 	@Args('input') input: BOrdinaryInquiry,
	// 	@AuthMember('_id') memberId: ObjectId,
	// ): Promise<Bookings> {
	// 	console.log('Querty: getVisited');
	// 	return await this.bookingService.getVisited(memberId, input);
	// }

	@Roles(MemberType.AGENT)
	@UseGuards(RolesGuard)
	@Query((retunrs) => Bookings)
	public async getAgentBookings(
		@Args('input') input: AgentBookingsInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Bookings> {
		console.log('Query: getAgentBookings');
		return await this.bookingService.getAgentBookings(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Booking)
	public async likeTargetBooking(
		@Args('bookingId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Booking> {
		console.log('Mutation: likeTargetBooking');
		const likeRefId = shapeIntoMongoObjectId(input);
		return await this.bookingService.likeTargetBooking(memberId, likeRefId);
	}

	//** ADMIN **/

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query((returns) => Bookings)
	public async getAllBookingsByAdmin(
		@Args('input') input: AllBookingsInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Bookings> {
		console.log(`Query: getAllBookingsByAdmin`);
		return await this.bookingService.getAllBookingsByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation((returns) => Booking)
	public async updateBookingByAdmin(@Args('input') input: BookingUpdate): Promise<Booking> {
		console.log('Mutation: updateBookingByAdmin');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.bookingService.updateBookingByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation((returns) => Booking)
	public async removeBookingByAdmin(@Args('bookingId') input: string): Promise<Booking> {
		console.log('Mutation: removeBookingByAdmin');
		const bookingId = shapeIntoMongoObjectId(input);
		return await this.bookingService.removeBookingByAdmin(bookingId);
	}
}
