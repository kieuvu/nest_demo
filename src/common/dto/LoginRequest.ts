import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
