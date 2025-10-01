import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DeleteTag{
    @IsUUID('4')
    @IsNotEmpty()
    tagid: string
}