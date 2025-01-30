import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto{
  @ApiProperty()
  @IsOptional()
  @IsString()
  EmailId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  Password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  MobileNo?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  IsActive: boolean;
}