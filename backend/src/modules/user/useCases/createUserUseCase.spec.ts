import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../repositories/fakes/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';

describe('Create User', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);
    await createUserUseCase.execute({
      email: 'email@email.com',
      fullName: 'Random Person Name',
      password: '123456',
    });
    expect(userRepositoryInMemory.users[0].email).toEqual('email@email.com');
    expect(userRepositoryInMemory.users[0].firstName).toEqual('Random');
    expect(userRepositoryInMemory.users[0].lastName).toEqual('Person Name');
  });

  it('Should be able to create user with password encrypted', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);
    const UserPasswordWithoutEncryption = '123456';
    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      fullName: 'Random Person Name',
      password: UserPasswordWithoutEncryption,
    });

    const userHasPassWordEncrypted = await compare(
      UserPasswordWithoutEncryption,
      user.password,
    );
    expect(userHasPassWordEncrypted).toEqual(true);
  });
});
