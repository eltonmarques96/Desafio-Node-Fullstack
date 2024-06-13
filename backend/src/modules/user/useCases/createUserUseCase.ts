import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { hash } from 'bcrypt';

interface createUserRequest {
  email: string;
  fullName: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ fullName, email, password }: createUserRequest) {
    const _password = await hash(password, 10);
    const firstName = fullName.split(' ').slice(0, 1).join(' ');
    const lastName = fullName.split(' ').slice(1).join(' ');
    const user = new User({
      firstName,
      lastName,
      email,
      password: _password,
    });
    await this.userRepository.create(user);
    return user;
  }
}
