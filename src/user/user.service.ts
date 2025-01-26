import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'; // Assuming you're using Sequelize ORM
import { User } from '../shared/models/user.model'; // Import the User model
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto); 
  }

  async findAll() {
    const users = await this.userModel.findAll(); 
    return users;
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({ where: { UserId: id } });
    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  // Update user by ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ where: { UserId: id } });
    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      return await user.update(updateUserDto);
    } catch (error) {
      throw new HttpException(
        `Failed to update user: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }




  async remove(id: number) {
    try {
      const user = await this.userModel.findOne({ where: { UserId: id } });
      if (!user || !user.IsActive) {
        throw new HttpException(
          `User with ID ${id} not found or already inactive`,
          HttpStatus.NOT_FOUND,
        );
      }
      await user.update({ IsActive: false });
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(
        `Failed to delete user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
