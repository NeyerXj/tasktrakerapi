import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { TaskEntity } from 'src/task/entities/task.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';
import { TaskModule } from 'src/task/task.module';
import { UserEntity } from 'src/user/entities/user.entity';


@Module({
    imports: [TypeOrmModule.forFeature([TaskEntity, TagEntity, UserEntity]), TaskModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: getJwtConfig,
        inject: [ConfigService],
      }),
    ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
