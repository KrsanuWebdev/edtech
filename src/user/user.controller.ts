// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Delete,
//   HttpException,
//   HttpStatus,
//   Patch,
// } from '@nestjs/common';
// import { UserService } from './user.service';  // Correct Import for UserService
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) { } // Inject UserService

//   @Post()
//   async create(@Body() createUserDto: CreateUserDto) {
//     try {
//       const newUser = await this.userService.create(createUserDto);
//       return {
//         status: true,
//         message: 'User created successfully',
//         data: newUser,
//       };
//     } catch (error) {
//       throw new HttpException(
//         {
//           status: false,
//           message: error.message || 'Failed to create user',
//         },
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   @Get()
//   async findAll() {
//     try {
//       const users = await this.userService.findAll();
//       return {
//         status: true,
//         message: 'Users retrieved successfully',
//         data: users,
//       };
//     } catch (error) {
//       throw new HttpException(
//         {
//           status: false,
//           message: error.message || 'Failed to retrieve users',
//         },
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) { // Keep 'id' as the parameter name
//     try {
//       const data = await this.userService.findOne(+id); // Pass the id as a number
//       return {
//         success: true,
//         data,
//         message: 'User  Fetched Successfully',
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.message,
//       };
//     }
//   }


//   // Updated PATCH method for user update
//   @Patch(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() updateUserDto: UpdateUserDto,
//   ) {
//     try {
//       const updatedUser = await this.userService.update(Number(id), updateUserDto);
//       return {
//         status: true,
//         message: 'User updated successfully',
//         data: updatedUser,
//       };
//     } catch (error) {
//       throw new HttpException(
//         {
//           status: false,
//           message: error.message || 'Failed to update user',
//         },
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }



//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     try {
//       await this.userService.remove(Number(id));
//       return {
//         status: true,
//         message: 'User deleted successfully',
//       };
//     } catch (error) {
//       throw new HttpException(
//         {
//           status: false,
//           message: error.message || 'Failed to delete user',
//         },
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }


  
// }






import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Patch,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service'; // Correct Import for UserService
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {} // Inject UserService

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return {
        status: true,
        message: 'User created successfully',
        data: newUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: error.message || 'Failed to create user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      if (!users.length) {
        return {
          status: false,
          message: 'No users found in the database',
          data: [],
        };
      }
      return {
        status: true,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: error.message || 'Failed to retrieve users',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(+id);
      if (!data) {
        throw new HttpException(
          {
            status: false,
            message: `User with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        data,
        message: 'User fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: error.message || 'Failed to fetch user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(Number(id), updateUserDto);
      return {
        status: true,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: error.message || 'Failed to update user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(Number(id));
      return {
        status: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          message: error.message || 'Failed to delete user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

