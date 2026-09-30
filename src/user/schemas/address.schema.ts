import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsString } from 'class-validator';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
	@IsString()
	@Prop()
	street: string;

	@IsString()
	@Prop()
	city: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
