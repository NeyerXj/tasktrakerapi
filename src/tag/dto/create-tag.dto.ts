import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTag{
    @ApiPropertyOptional({ description: 'ID задачи, к которой привязывается тег', example: '8a0a9f31-0b0f-4f4c-9b3e-8b5a1c0b6a4e' })
    @IsOptional()
    @IsUUID('4')
    taskId: string

    @ApiProperty({ description: 'Название тега', example: 'home' })
    @IsString()
    @IsNotEmpty()
    @Length(2,16)
    tagname: string
}