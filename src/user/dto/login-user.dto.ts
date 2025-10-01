import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginUser{
    @ApiProperty({ description: 'Email пользователя', example: 'john@example.com' })
    @IsEmail({}, {message: 'Email must be a valid email address'})
    @IsNotEmpty()
    email: string
    
    @ApiProperty({ description: 'Пароль', example: 'P@ssw0rd' })
    @IsString({message: 'Password must be a string'})
    @IsNotEmpty()
    password:string
}