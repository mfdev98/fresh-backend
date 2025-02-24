import { Schema } from 'mongoose';
import { BookingLocation, BookingStatus, BookingType } from '../libs/enums/booking.enum';

const BookingSchema = new Schema(
	{
		bookingType: {
			type: String,
			enum: BookingType,
			required: true,
		},

		bookingStatus: {
			type: String,
			enum: BookingStatus,
			default: BookingStatus.ACTIVE,
		},

		bookingLocation: {
			type: String,
			enum: BookingLocation,
			required: true,
		},

		bookingTitle: {
			type: String,
			required: true,
		},

		bookingPrice: {
			type: Number,
			required: true,
		},

		bookingViews: {
			type: Number,
			default: 0,
		},

		bookingLikes: {
			type: Number,
			default: 0,
		},

		bookingComments: {
			type: Number,
			default: 0,
		},

		bookingRank: {
			type: Number,
			default: 0,
		},

		bookingImages: {
			type: [String],
			required: true,
		},

		bookingDesc: {
			type: String,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

		soldAt: {
			type: Date,
		},

		deletedAt: {
			type: Date,
		},

		constructedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'bookings' },
);

BookingSchema.index({ bookingType: 1, bookingLocation: 1, bookingTitle: 1, bookingPrice: 1 }, { unique: true });

export default BookingSchema;
