export interface CreateUserDto {
  fullname: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  fullname?: string;
  email?: string;
  password?: string;
}
