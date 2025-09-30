import { IsUUID } from "class-validator"

export class DeleteTask{
    @IsUUID('4')
    id:string
}