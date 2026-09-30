import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { Address } from '../schemas/address.schema';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string;
 
	@ValidateNested()
	@Type(() => Address)
	address: Address
 
}
