import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ListTaskModule } from './list-task/list-task.module';
import connectionOptions from './../ormconfig';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ...connectionOptions, autoLoadEntities: true }),
    UserModule,
    ListTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
