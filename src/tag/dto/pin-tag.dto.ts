import { IsNotEmpty, IsUUID } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class PinTag{
    @ApiProperty({ description: 'ID тега, который нужно привязать к задаче', example: '2f4bfa99-5d26-4cbb-a0b2-5f3a0a8f9d2e' })
    @IsUUID('4')
    @IsNotEmpty()
    tagId: string
    @ApiProperty({ description: 'ID задачи, к которой привязать тег', example: '8a0a9f31-0b0f-4f4c-9b3e-8b5a1c0b6a4e' })
    @IsUUID('4')
    @IsNotEmpty()
    taskId: string
}