import { registerEnumType } from '@nestjs/graphql';

export enum ViewGroup {
	MEMBER = 'MEMBER',
	ARTICLE = 'ARTICLE',
	PROPERTY = 'PROPERTY',
	BOOKING = 'BOOKING',
}
registerEnumType(ViewGroup, {
	name: 'ViewGroup',
});
