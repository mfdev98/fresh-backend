import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Like } from '../../libs/dto/like/like';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { LikeInput } from '../../libs/dto/like/like.input';
import { NotificationInput } from '../../libs/dto/notification/notification.input';
import { Notification } from '../../libs/dto/notification/notification';

@Resolver()
export class NotificationResolver {
    constructor(private readonly notificationService: NotificationService) { }

    @UseGuards(AuthGuard)
    @Mutation((returns) => Notification)
    public async createNotification(@Args('input') input: NotificationInput, @AuthMember('_id') memberId: ObjectId): Promise<Notification> {
        console.log('Mutation: Create Notification');
        return await this.notificationService.createNotification(input);
    }

 
    @UseGuards(AuthGuard)
    @Query(() => [Notification])
    public async getMemberNotifications( @AuthMember('_id') memberId: ObjectId): Promise<Notification[]> {
        console.log('Query: Get Notifications');
        console.log(await this.notificationService.getMemberNotifications(memberId));

        return await this.notificationService.getMemberNotifications(memberId)
    }

 
    @UseGuards(AuthGuard)
    @Mutation((returns) => Notification)
    public async removeNotification(@Args('id') input: string): Promise<Notification> {
        console.log('Query: removePlantByAdmin');
        const id = shapeIntoMongoObjectId(input);
        return await this.notificationService.removeNotification(id);
    }

}