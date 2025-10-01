import { IsUUID } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class DeleteTask{
    @ApiProperty({ description: 'ID задачи для удаления', example: 'c7f3d7a2-0e7a-4e68-a8ab-9a6d1b0b2e9f' })
    @IsUUID('4')
    id:string
}