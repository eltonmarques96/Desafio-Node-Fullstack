import { User as UserRaw } from '@prisma/client';
import { User } from 'src/modules/user/entities/User';

export class PrismaUserMapper {
  static toPrisma({
    createdAt,
    email,
    firstName,
    lastName,
    id,
    password,
  }: User): UserRaw {
    return {
      createdAt,
      email,
      firstName,
      lastName,
      id,
      password,
    };
  }
}
