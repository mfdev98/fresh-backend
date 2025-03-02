import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { BookingLocation, BookingStatus, BookingType } from '../../enums/booking.enum';
import { ObjectId } from 'mongoose';
import { availableBookingSorts } from '../../config';
import { Direction } from '../../enums/common.enum';

@InputType()
export class BookingInput {
	@IsNotEmpty()
	@Field(() => BookingType)
	bookingType: BookingType;

	@IsNotEmpty()
	@Field(() => BookingLocation)
	bookingLocation: BookingLocation;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	bookingTitle: string;

	@IsNotEmpty()
	@Field(() => Number)
	bookingPrice: number;

	@IsNotEmpty()
	@Field(() => [String])
	bookingImages: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	bookingDesc?: string;

	memberId?: ObjectId;

	@IsOptional()
	@Field(() => Date, { nullable: true })
	constructedAt?: Date;
}

@InputType()
export class PriceRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class PeriodRange {
	@Field(() => Date)
	start: Date;

	@Field(() => Date)
	end: Date;
}

@InputType()
class BISearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => [BookingLocation], { nullable: true })
	locationList?: BookingLocation[];

	@IsOptional()
	@Field(() => [BookingType], { nullable: true })
	typeList?: BookingType[];

	@IsOptional()
	@Field(() => PriceRange, { nullable: true })
	priceRange?: PriceRange;

	@IsOptional()
	@Field(() => PeriodRange, { nullable: true })
	periodRange?: PeriodRange;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;
}

@InputType()
export class BookingsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableBookingSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => BISearch)
	search: BISearch;
}

@InputType()
class ABISearch {
	@IsOptional()
	@Field(() => BookingStatus, { nullable: true })
	bookingStatus?: BookingStatus;
}

@InputType()
export class AgentBookingsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableBookingSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => ABISearch)
	search: ABISearch;
}

@InputType()
class ALBISearch {
	@IsOptional()
	@Field(() => BookingStatus, { nullable: true })
	bookingStatus?: BookingStatus;

	@IsOptional()
	@Field(() => [BookingLocation], { nullable: true })
	bookingLocationList?: BookingLocation[];
}

@InputType()
export class AllBookingsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableBookingSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => ALBISearch)
	search: ALBISearch;
}
@InputType()
export class BOrdinaryInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;
}
