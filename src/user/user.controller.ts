import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

  //get all users
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): ReturnType<UserService['findUser']> {
    return this.userService.findUser(limit, offset);

  }

  //getbyid

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id:string):ReturnType<UserService['findById']>{
    return this.userService.findById(id)

  }

  //create-user
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @Body() data: CreateUserDto,
  ): ReturnType<UserService['createUser']> {
    return this.userService.createUser(data);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): ReturnType<UserService['updateUser']> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteUser(@Param('id') id: string): ReturnType<UserService['deleteUser']> {
    return this.userService.deleteUser(id);
  }


}
