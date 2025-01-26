import { Module } from '@nestjs/common';
import { UserprogressService } from './userprogress.service';
import { UserprogressController } from './userprogress.controller';

@Module({
  controllers: [UserprogressController],
  providers: [UserprogressService],
})
export class UserprogressModule {}
