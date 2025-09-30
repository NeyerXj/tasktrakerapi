import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateTaskDto {
    @IsString({message: 'Title must be a string'})
    @Length(4, 100, {message: 'Title must be between 1 and 100 characters'})
    @ApiProperty({description: 'Task title', example: 'Hello World'})
    title: string;
    @IsString({message: 'Context must be a string'})
    @Length(1, 5000, {message: 'Context must be between 1 and 5000 characters'})
    @ApiProperty({description: 'Task context', example:"HelloWorld(print)"})
    context: string;
    @IsBoolean({message: 'isCompleted must be a boolean'})
    @IsOptional()
    @ApiPropertyOptional({description: 'Is completed task?', example:false})
    isCompleted: boolean = false;
}