// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}


import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()  // Optional field for update
  @IsString()
  mobileNumber?: string;

  // readonly UserId?: number;

  // readonly EmailId?: string;

  // readonly Password?: string;

  // readonly MobileNo?: string;


  // You can add other fields here that are updateable (like email, name, etc.)
}