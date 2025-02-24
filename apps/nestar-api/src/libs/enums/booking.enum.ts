import { registerEnumType } from '@nestjs/graphql';

export enum BookingType {
	TOURS = 'TOURS',
	ATTRACTION = 'ATTRACTION',
	EXPERIENCE = 'EXPERIENCE',
}
registerEnumType(BookingType, {
	name: 'BookingType',
});

export enum BookingStatus {
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(BookingStatus, {
	name: 'BookingStatus',
});

export enum BookingLocation {
	SEOUL = 'SEOUL',
	BUSAN = 'BUSAN',
	INCHEON = 'INCHEON',
	DAEGU = 'DAEGU',
	GYEONGJU = 'GYEONGJU',
	GWANGJU = 'GWANGJU',
	CHONJU = 'CHONJU',
	DAEJON = 'DAEJON',
	JEJU = 'JEJU',
}
registerEnumType(BookingLocation, {
	name: 'BookingLocation',
});
