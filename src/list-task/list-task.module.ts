import { Module } from '@nestjs/common';
import { ListTaskService } from './list-task.service';
import { ListTaskController } from './list-task.controller';
import { ListTask } from './entities/list-task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListTask]), UserModule],
  controllers: [ListTaskController],
  providers: [ListTaskService],
})
export class ListTaskModule {}
