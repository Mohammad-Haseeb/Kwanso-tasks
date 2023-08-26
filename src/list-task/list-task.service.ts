import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateListTaskDto } from './dto/create-list-task.dto';
import { ListTask } from './entities/list-task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import {
  ListTaskResponse,
  TaskListListResponseResponse,
} from './dto/list-task-response.entity';
import { UserResponse } from 'src/user/dto/user-response.dto';

@Injectable()
export class ListTaskService {
  constructor(
    @InjectRepository(ListTask)
    private readonly listTaskRepository: Repository<ListTask>,
    private readonly userService: UserService,
  ) {}
  async create(
    id: number,
    createListTaskDto: CreateListTaskDto,
  ): Promise<ListTaskResponse> {
    try {
      const { user }: UserResponse = await this.userService.findOne(id);

      const newTask = await this.listTaskRepository.create({
        ...createListTaskDto,
        user,
      });

      const task = await this.listTaskRepository.save(newTask);

      const responseTask: ListTaskResponse = {
        task: {
          id: task.id,
          name: task.name,
        },
      };

      return responseTask;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async find(id: number): Promise<TaskListListResponseResponse> {
    try {
      const listTask = await this.listTaskRepository.find({
        where: { userId: id },
        select: ['id', 'name'],
      });
      if (!listTask) {
        throw new HttpException(
          'No list found with this this',
          HttpStatus.NOT_FOUND,
        );
      }

      return { tasks: listTask };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
