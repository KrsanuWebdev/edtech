import { Injectable } from '@nestjs/common';
import { CreateUserprogressDto } from './dto/create-userprogress.dto';
import { UpdateUserprogressDto } from './dto/update-userprogress.dto';

@Injectable()
export class UserprogressService {
  create(createUserprogressDto: CreateUserprogressDto) {
    return 'This action adds a new userprogress';
  }

  findAll() {
    return `This action returns all userprogress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userprogress`;
  }

  update(id: number, updateUserprogressDto: UpdateUserprogressDto) {
    return `This action updates a #${id} userprogress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userprogress`;
  }
}
