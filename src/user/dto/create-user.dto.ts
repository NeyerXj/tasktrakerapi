import { IsEmail, IsNotEmpty, IsString, IsUUID, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
    @ApiProperty({ description: 'Имя пользователя', example: 'john_doe' })
    @IsString({message: 'Username must be a string'})
    @Length(4, 20, {message: 'Username must be between 4 and 20 characters'})
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Пароль', example: 'P@ssw0rd' })
    @IsString({message: 'Password must be a string'})
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'Подтверждение пароля', example: 'P@ssw0rd' })
    @IsString({message: 'Password must be a string'})
    @IsNotEmpty()
    re_password: string;

    @ApiProperty({ description: 'Email', example: 'john@example.com' })
    @IsEmail({}, {message: 'Email must be a valid email address'})
    @IsNotEmpty()
    email: string;
}