import { IsInt, IsString, IsOptional } from "class-validator";

export class CreateStudentDto {

  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsOptional()
  @IsString()
  email?: string;
}

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsInt()
  age?: number;
  @IsOptional()
  @IsString()
  email?: string;
}