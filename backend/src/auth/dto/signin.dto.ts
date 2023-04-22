/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  email: string;


  @IsString()
  @IsNotEmpty()
  password: string;
}
