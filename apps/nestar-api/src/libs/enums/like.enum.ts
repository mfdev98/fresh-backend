import { registerEnumType } from '@nestjs/graphql';

export enum LikeGroup {
	MEMBER = 'MEMBER',
	PROPERTY = 'PROPERTY',
	ARTICLE = 'ARTICLE',
	BOOKING = 'BOOKING',
}
registerEnumType(LikeGroup, {
	name: 'LikeGroup',
});
