import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';

@Module({
    imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: getTypeOrmConfig, inject: [ConfigService],
}) ,UserModule, TaskModule, TagModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
