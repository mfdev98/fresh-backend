import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';
import { Member } from '../member/member';
import { Property } from '../property/property';
import { Booking } from '../booking/booking';
import { BoardArticle } from '../board-article/board-article';

@ObjectType()
export class Notification {
	@Field(() => String)
	_id: string;

	@Field(() => NotificationType)
	notificationType: NotificationType;

	@Field(() => NotificationStatus)
	notificationStatus: NotificationStatus;

	@Field(() => NotificationGroup)
	notificationGroup: NotificationGroup;

	@Field(() => String)
	notificationTitle: string;

	@Field(() => String, { nullable: true })
	notificationDesc?: string;

	@Field(() => String)
	authorId: ObjectId;

	@Field(() => String)
	receiverId: ObjectId;

	@Field(() => String)
	notificationRefId: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	@Field(() => Member)
	senderData: Member;

	@Field(() => Property, { nullable: true })
	propertyData?: Property;

	@Field(() => Booking, { nullable: true })
	bookingData?: Booking;

	@Field(() => BoardArticle, { nullable: true })
	blogData?: BoardArticle;
}

/* @ObjectType()
export class Notifications {
    @Field(() => [Notification])
    notification: Notification[];


} */
