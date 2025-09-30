import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID } from 'crypto';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from './interfaces/jwt.interface';
import { LoginUser } from './dto/login-user.dto';
import type { Request, Response } from 'express';
import { isDev } from 'src/utils/is-dev.utils';

@Injectable()
export class UserService {
    
    private readonly JWT_ACCESS_TOKEN_TTL: string;
    private readonly JWT_REFRESH_TOKEN_TTL: string;

    private readonly COOKIE_DOMAIN: string

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly JwtService: JwtService,) {
        this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN')
        this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL')
        this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL')
    }

    async findByUsername(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({where: {username}});
        if (!user) {
            throw new BadRequestException('User not found');
        }
        return user;
    }

    async findByUUID(id: string){
        const user = await this.userRepository.findOne({where:{id}});
        if (!user){
            return false
        }
        return true
    }



    async createUser(res: Response,dto: CreateUserDto) {
        const {username, password, re_password, email} = dto;
        if (password !== re_password) {
            throw new BadRequestException('Passwords do not match');
        }
        const existingUser = await this.userRepository.findOne({where: [{username}, {email}]});
        if (existingUser) {
            throw new BadRequestException('Username or email already exists');
        }

        const hashpassword = await hash(password)

        const user = this.userRepository.create({username, password: hashpassword, email});
        await this.userRepository.save(user);
        const createdUser = await this.userRepository.findOne({where: {username}});
        if (!createdUser) {
            throw new BadRequestException('User not found after creation');
        }
        const userUUID = createdUser.id as UUID;
        return this.auth(res,user.id)
    }

    private auth(res: Response, id: string){
        const {accessToken, refreshToken} = this.generateTokens(id)

        this.setCookie(res, refreshToken, new Date(Date.now() + 60 * 60 * 24 * 7))

        return {accessToken};
    }

    async login(res: Response,dto: LoginUser){
        const {password, email} = dto;
        const user = await this.userRepository.findOne({where: {email},select:{
            id: true,
            password: true,
        }});
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isValidPassword = await verify(user.password, password);

        if(!isValidPassword){
            throw new NotFoundException('User not found');
        }

        return this.auth(res, user.id)
    }

    async refresh(req: Request, res: Response){
        const refreshToken = req.cookies['refreshToken'];
        if(!refreshToken){
            throw new UnauthorizedException('No valid refreshToken')
        }
        const payload: JwtPayload = await this.JwtService.verifyAsync(refreshToken);

        if(payload){
            const user = await this.userRepository.findOne({
                where:{
                    id: payload.id
                },
                select: {
                    id: true
                }
            });
            if(!user){
                throw new NotFoundException('User not found')
            }
            return this.auth(res, user.id)
        }
    }

    async validate(id: string){
        const user = await this.userRepository.findOne({where:{
            id
        }})

        if(!user){
            throw new NotFoundException('User not found')
        }

        return user;
    }

    async logout(res: Response){
        this.setCookie(res, 'refreshToken', new Date(0))
        return true
    }

    private generateTokens(id: string){
        const payload:JwtPayload = {id};

        const accessToken = this.JwtService.sign(payload, {expiresIn: this.JWT_ACCESS_TOKEN_TTL})
        const refreshToken = this.JwtService.sign(payload, {expiresIn: this.JWT_REFRESH_TOKEN_TTL})

        return{
            accessToken,
            refreshToken
        }
    }

    private setCookie(res: Response, value: string, expires: Date){
        res.cookie('refreshToken', value, {
            httpOnly: true,
            domain: this.COOKIE_DOMAIN,
            expires,
            secure: !isDev(this.configService),
            sameSite: isDev(this.configService) ? 'none' : 'lax'
        })
    }
}
