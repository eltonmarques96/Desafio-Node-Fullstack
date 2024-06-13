import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor() {}

  // @Get()
  // async getUsers(): Promise<User[]> {
  //   return await this.userService.getUsers();
  // }

  // @Get(':id')
  // async getUser(@Param('id') id: number): Promise<User> {
  //   return await this.userService.getUser(id);
  // }

  // @Post()
  // async addUser(@Body() user: User): Promise<User[]> {
  //   return await this.userService.addUser(user);
  // }

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
