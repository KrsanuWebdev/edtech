import { PartialType } from '@nestjs/swagger';
import { CreateUserprogressDto } from './create-userprogress.dto';

export class UpdateUserprogressDto extends PartialType(CreateUserprogressDto) {}
