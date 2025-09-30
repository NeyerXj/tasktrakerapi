import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import type { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/auth.decor';
import { UserEntity } from './entities/user.entity';
import { Authorized } from './decorators/authorizate.decor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res({passthrough: true}) res: Response, @Body() dto: CreateUserDto) {
    return this.userService.createUser(res, dto);
  }
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Res({passthrough: true}) res: Response,@Body() dto: LoginUser){
    return this.userService.login(res,dto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request,@Res({passthrough: true}) res: Response ){
    return await this.userService.refresh(req,res)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({passthrough: true}) res: Response ){
    return await this.userService.logout(res)
  }

  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized() user: UserEntity){
    return user
  }
}
