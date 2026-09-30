import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Address } from '../schemas/address.schema';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => Address)
	address?: Address;
}