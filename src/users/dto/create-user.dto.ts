import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}