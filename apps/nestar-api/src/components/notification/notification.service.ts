import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { Notification } from '../../libs/dto/notification/notification';
import { NotificationInput } from '../../libs/dto/notification/notification.input';
import { isEqual, shapeIntoMongoObjectId } from '../../libs/config';

@Injectable()
export class NotificationService {
	constructor(
		@InjectModel('Notification')
		private readonly notificationModel: Model<Notification>,
	) {}

	async deleteNotification(authorId: ObjectId, notificationRefId: ObjectId): Promise<Notification> {
		return await this.notificationModel
			.findOneAndDelete({
				authorId: authorId,
				notificationRefId: notificationRefId,
			})
			.exec();
	}
	async removeNotification(notificationId: ObjectId): Promise<Notification> {
		return await this.notificationModel
			.findByIdAndDelete({
				_id: notificationId,
			})
			.exec();
	}

	public async createNotification(input: NotificationInput): Promise<Notification> {
		const notify: NotificationInput = {
			...input,
			receiverId: shapeIntoMongoObjectId(input.receiverId),
			notificationRefId: shapeIntoMongoObjectId(input.notificationRefId),
		};
		if (isEqual(input.receiverId, input.authorId)) {
			console.log('You liked your own plant!');
			return null;
		}
		const result = await this.notificationModel.create(notify);
		console.log('notification', result);
	}
	async getMemberNotifications(receiverId: ObjectId) {
		return await this.notificationModel.aggregate([
			{
				$match: { receiverId }, // Match notifications for the receiver
			},
			{
				$lookup: {
					from: 'members', // Join with the members collection
					localField: 'authorId',
					foreignField: '_id',
					as: 'authorData',
				},
			},
			{
				$unwind: { path: '$authorData', preserveNullAndEmptyArrays: true }, // Flatten authorData
			},
			{
				$lookup: {
					from: 'plants', // Join with the plants collection
					localField: 'notificationRefId',
					foreignField: '_id',
					as: 'plantData',
				},
			},
			{
				$unwind: { path: '$plantData', preserveNullAndEmptyArrays: true }, // Flatten plantData
			},
			{
				$lookup: {
					from: 'boardArticles', // Join with the boardArticles collection
					localField: 'notificationRefId',
					foreignField: '_id',
					as: 'blogData',
				},
			},
			{
				$unwind: { path: '$blogData', preserveNullAndEmptyArrays: true }, // Flatten blogData
			},
			{
				$addFields: {
					_id: { $toString: '$_id' }, // Convert ObjectId to string
				},
			},
			{
				$project: {
					_id: 1,
					notificationType: 1,
					notificationStatus: 1,
					notificationGroup: 1,
					notificationTitle: 1,
					notificationDesc: 1,
					authorId: 1,
					receiverId: 1,
					notificationRefId: 1,
					createdAt: 1,
					updatedAt: 1,
					senderData: '$authorData',
					plantData: 1,
					blogData: 1,
				},
			},
		]);
	}
}
