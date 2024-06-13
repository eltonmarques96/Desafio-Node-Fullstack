import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from './useCases/createUserUseCase';
import { User } from '@prisma/client';
import { CreateUserBody } from './dto/userBody';

@Controller('user')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  // @Get()
  // async getUsers(): Promise<User[]> {
  //   return await this.userService.getUsers();
  // }

  // @Get(':id')
  // async getUser(@Param('id') id: number): Promise<User> {
  //   return await this.userService.getUser(id);
  // }

  @Post()
  async creeateUser(@Body() body: CreateUserBody): Promise<User> {
    const { email, password, fullName } = body;
    const user = await this.createUserUseCase.execute({
      email,
      password,
      fullName,
    });
    return user;
  }

  // @Put(':id')
  // async replaceUser(
  //   @Param('id') id: number,
  //   @Body() newData: User,
  // ): Promise<User> {
  //   return await this.userService.replaceUser(id, newData);
  // }

  // @Patch(':id')
  // async updateUser(
  //   @Param('id') id: number,
  //   @Body() newData: User,
  // ): Promise<User> {
  //   return await this.userService.updateUser(id, newData);
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: number): boolean {
  //   return await this.userService.deleteUser(id);
  // }~
}
