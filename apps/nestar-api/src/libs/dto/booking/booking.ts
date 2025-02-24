import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { BookingLocation, BookingStatus, BookingType } from '../../enums/booking.enum';
import { Member, TotalCounter } from '../member/member';
import { MeLiked } from '../like/like';

@ObjectType()
export class Booking {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => BookingType)
	bookingType: BookingType;

	@Field(() => BookingStatus)
	bookingStatus: BookingStatus;

	@Field(() => BookingLocation)
	bookingLocation: BookingLocation;

	@Field(() => String)
	bookingTitle: string;

	@Field(() => Number)
	bookingPrice: number;

	@Field(() => Int)
	bookingViews: number;

	@Field(() => Int)
	bookingLikes: number;

	@Field(() => Int)
	bookingComments: number;

	@Field(() => Int)
	bookingRank: number;

	@Field(() => [String])
	bookingImages: string[];

	@Field(() => String, { nullable: true })
	bookingDesc?: string[];

	@Field(() => String)
	memberId: ObjectId;

	@Field(() => Date, { nullable: true })
	soldAt?: Date;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date, { nullable: true })
	deletedAt?: Date;

	@Field(() => Date, { nullable: true })
	constructedAt?: Date;

	@Field(() => Date)
	updatedAt: Date;

	//** from aggregation */
	@Field(() => [MeLiked], { nullable: true })
	meLiked?: MeLiked[];

	@Field(() => Member, { nullable: true })
	memberData?: Member;
}

@ObjectType()
export class Bookings {
	@Field(() => [Booking])
	list: Booking[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}
