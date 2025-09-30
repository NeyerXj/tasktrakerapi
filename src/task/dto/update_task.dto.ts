import { IsBoolean, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class UpdateTask{
    @IsString({message: 'Title must be a string'})
    @IsOptional()
    title: string;

    @IsString({message: 'Context must be a string'})
    @IsOptional()
    context: string;

    @IsBoolean({message: 'isCompleted must be a boolean'})
    @IsOptional()
    isCompleted: boolean;
}