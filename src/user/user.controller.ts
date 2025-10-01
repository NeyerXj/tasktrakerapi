import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUser } from './dto/login-user.dto';
import type { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Authorization } from './decorators/auth.decor';
import { UserEntity } from './entities/user.entity';
import { Authorized } from './decorators/authorizate.decor';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь создан и выдан accessToken' })
  @ApiResponse({ status: 400, description: 'Passwords do not match | Username or email already exists' })
  @ApiBody({ type: CreateUserDto })
  async register(@Res({passthrough: true}) res: Response, @Body() dto: CreateUserDto) {
    return this.userService.createUser(res, dto);
  }
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Логин пользователя' })
  @ApiResponse({ status: 200, description: 'Успешная авторизация и выдача accessToken' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: LoginUser })
  async login(@Res({passthrough: true}) res: Response,@Body() dto: LoginUser){
    return this.userService.login(res,dto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновление accessToken по refreshToken (из cookie)' })
  @ApiResponse({ status: 200, description: 'Выдан новый accessToken' })
  @ApiResponse({ status: 401, description: 'No valid refreshToken' })
  async refresh(@Req() req: Request,@Res({passthrough: true}) res: Response ){
    return await this.userService.refresh(req,res)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Выход (стирание refreshToken cookie)' })
  @ApiResponse({ status: 200, description: 'Успешный выход' })
  async logout(@Res({passthrough: true}) res: Response ){
    return await this.userService.logout(res)
  }

  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: 'Текущий пользователь' })
  @ApiResponse({ status: 200, description: 'Данные текущего пользователя' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async me(@Authorized() user: UserEntity){
    return user
  }
}
