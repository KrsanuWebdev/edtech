import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  EmailId: string;

  @IsString()
  @IsOptional()
  Password?: string;

  @IsString()
  @IsOptional()
  MobileNo?: string;

  @IsBoolean()
  @IsOptional()
  IsActive?: boolean;
}
