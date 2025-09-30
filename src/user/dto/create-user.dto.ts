import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from "class-validator";


export class CreateUserDto {
    @IsString({message: 'Username must be a string'})
    @Length(4, 20, {message: 'Username must be between 4 and 20 characters'})
    @IsNotEmpty()
    username: string;

    @IsString({message: 'Password must be a string'})
    @IsNotEmpty()
    password: string;

    @IsString({message: 'Password must be a string'})
    @IsNotEmpty()
    re_password: string;

    @IsEmail({}, {message: 'Email must be a valid email address'})
    @IsNotEmpty()
    email: string;
}