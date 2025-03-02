import { Field, InputType } from '@nestjs/graphql';
import { isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../enums/notification.enum';

@InputType()
export class NotificationInput {
	/*    @IsNotEmpty()
    @Field(() => String)
    memberId: ObjectId; */

	@IsNotEmpty()
	@Field(() => NotificationType)
	notificationType: NotificationType;

	@IsNotEmpty()
	@Field(() => NotificationGroup)
	notificationGroup: NotificationGroup;

	@IsNotEmpty()
	@Field(() => String)
	notificationTitle: string;

	@IsOptional()
	@Field(() => String, { nullable: true })
	notificationDesc?: string;

	authorId: ObjectId;

	@IsOptional()
	@Field(() => String, { nullable: true })
	receiverId?: ObjectId;

	@IsNotEmpty()
	@Field(() => String)
	notificationRefId: ObjectId;
}
