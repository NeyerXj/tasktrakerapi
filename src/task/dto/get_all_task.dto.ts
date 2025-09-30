import { IsString, IsUUID } from "class-validator";

export class GetAllTask{
    @IsUUID('4')
    userId: string
}