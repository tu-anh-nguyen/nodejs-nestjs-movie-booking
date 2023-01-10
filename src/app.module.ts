import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/User/user.model';
import { UserModule } from './modules/User/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const AppDataSource = TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    database: config.get('DB_NAME'),
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT'),
    username: config.get('DB_USERNAME'),
    password: config.get('DB_PASSWORD'),
    synchronize: true,
    entities: [User],
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AppDataSource,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
