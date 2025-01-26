import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserprogressService } from './userprogress.service';
import { CreateUserprogressDto } from './dto/create-userprogress.dto';
import { UpdateUserprogressDto } from './dto/update-userprogress.dto';

@Controller('userprogress')
export class UserprogressController {
  constructor(private readonly userprogressService: UserprogressService) {}

  @Post()
  create(@Body() createUserprogressDto: CreateUserprogressDto) {
    return this.userprogressService.create(createUserprogressDto);
  }

  @Get()
  findAll() {
    return this.userprogressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userprogressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserprogressDto: UpdateUserprogressDto) {
    return this.userprogressService.update(+id, updateUserprogressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userprogressService.remove(+id);
  }
}
