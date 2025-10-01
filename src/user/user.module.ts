import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TaskEntity } from 'src/task/entities/task.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './strateges/jwt.strategie';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule,TypeOrmModule.forFeature([UserEntity]), JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: getJwtConfig,
    inject: [ConfigService]
  })],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports:[UserService]
})
export class UserModule {}
