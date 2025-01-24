
// import { Injectable, HttpException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';  // Assuming you're using Sequelize ORM
// import { User } from '../shared/models/user.model';  // Import the User model
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectModel(User) private readonly userModel: typeof User,  // Inject the User model
//   ) {}

//   async create(createUserDto: CreateUserDto) {
//     return await this.userModel.create(createUserDto);  // Create user logic
//   }

//   async findAll() {
//     return await this.userModel.findAll();  // Retrieve all users
//   }

//   async findOne(id: number) {
//     return await this.userModel.findOne({ where: { UserId: id } });   // Retrieve a user by ID
//   }



//   async update(id: number, UpdateUserDto: UpdateUserDto) {
//     const user = await this.userModel.findOne({ where: { UserId: id } }); // Use UserId instead of id
//     if (!user) {
//       throw new Error('User  not found');  // Handle user not found case
//     }
//     return await user.update(UpdateUserDto);  // Update the user with the provided data
//   }


//   async remove(id: number) {
//     const user = await this.userModel.findOne({ where: { UserId: id } });
//     if (!user) {
//       throw new Error('User not found');  // Handle user not found case
//     }
//     await user.destroy();  // Delete the user
//   }
// }



import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'; // Assuming you're using Sequelize ORM
import { User } from '../shared/models/user.model'; // Import the User model
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User, // Inject the User model
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto); // Create user logic
  }

  async findAll() {
    const users = await this.userModel.findAll(); // Retrieve all users
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
    const user = await this.userModel.findOne({ where: { UserId: id } });
    if (!user) {
      throw new HttpException(
        `User with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await user.destroy();
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(
        `Failed to delete user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
