import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { BookingLocation, BookingStatus, BookingType } from '../../enums/booking.enum';
import { ObjectId } from 'mongoose';

@InputType()
export class BookingUpdate {
	@IsNotEmpty()
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
	@Field(() => BookingType, { nullable: true })
	bookingType?: BookingType;

	@IsOptional()
	@Field(() => BookingStatus, { nullable: true })
	bookingStatus?: BookingStatus;

	@IsOptional()
	@Field(() => BookingLocation, { nullable: true })
	bookingLocation?: BookingLocation;

	@IsOptional()
	@Length(3, 100)
	@Field(() => String, { nullable: true })
	bookingTitle?: string;

	@IsOptional()
	@Field(() => Number, { nullable: true })
	bookingPrice?: number;

	@IsOptional()
	@Field(() => [String], { nullable: true })
	bookingImages?: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	bookingDesc?: string;

	soldAt?: Date;

	deletedAt?: Date;

	@IsOptional()
	@Field(() => Date, { nullable: true })
	constructedAt?: Date;
}
