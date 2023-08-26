import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ListTaskService } from './list-task.service';
import { CreateListTaskDto } from './dto/create-list-task.dto';
import { AuthGuard } from '../user/Auth.guard';
import {
  ListTaskResponse,
  TaskListListResponseResponse,
} from './dto/list-task-response.entity';

@UseGuards(AuthGuard)
@Controller('')
export class ListTaskController {
  constructor(private readonly listTaskService: ListTaskService) {}

  @Post('create-task')
  async create(
    @Request() req,
    @Body() createListTaskDto: CreateListTaskDto,
  ): Promise<ListTaskResponse> {
    return this.listTaskService.create(req.user.id, createListTaskDto);
  }

  @Get('list-tasks')
  async findAll(@Request() req): Promise<TaskListListResponseResponse> {
    return this.listTaskService.find(req.user.id);
  }
}
