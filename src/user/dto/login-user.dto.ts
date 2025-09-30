import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginUser{
    @IsEmail({}, {message: 'Email must be a valid email address'})
    @IsNotEmpty()
    email: string
    
    @IsString({message: 'Password must be a string'})
    @IsNotEmpty()
    password:string
}