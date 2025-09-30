import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export async function getTypeOrmConfig(configService: ConfigService):Promise<TypeOrmModuleOptions> {
    return {
    type: 'postgres',
      host: configService.getOrThrow('POSTGRES_HOST'),
      port: configService.getOrThrow<number>('POSTGRES_PORT'),
      username: configService.getOrThrow('POSTGRES_USER'),
      password: configService.getOrThrow('POSTGRES_PASSWORD'),
      database: configService.getOrThrow('POSTGRES_DB'),
      autoLoadEntities: true,
      synchronize: true,
    }
}