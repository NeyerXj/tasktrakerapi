import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import type { Request } from "express";

export const Authorized = createParamDecorator(
    (data: keyof UserEntity, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest() as Request

        const user = req.user

        return data ? user?.[data] : user;
    }
)