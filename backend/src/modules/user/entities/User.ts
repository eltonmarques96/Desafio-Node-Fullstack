import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

export interface UserSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}

export class User {
  props: UserSchema;
  _id: string;

  constructor(props: Replace<UserSchema, { createdAt?: Date }>, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName;
  }
  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }
  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
