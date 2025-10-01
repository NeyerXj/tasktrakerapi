import { IsBoolean, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateTask{
    @ApiPropertyOptional({ description: 'Новое название задачи', example: 'New Title' })
    @IsString({message: 'Title must be a string'})
    @IsOptional()
    title: string;

    @ApiPropertyOptional({ description: 'Новый текст задачи', example: 'Updated context' })
    @IsString({message: 'Context must be a string'})
    @IsOptional()
    context: string;

    @ApiPropertyOptional({ description: 'Флаг выполнения', example: true })
    @IsBoolean({message: 'isCompleted must be a boolean'})
    @IsOptional()
    isCompleted: boolean;
}