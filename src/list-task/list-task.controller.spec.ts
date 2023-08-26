import { Test, TestingModule } from '@nestjs/testing';
import { ListTaskController } from './list-task.controller';
import { ListTaskService } from './list-task.service';

describe('ListTaskController', () => {
  let controller: ListTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListTaskController],
      providers: [ListTaskService],
    }).compile();

    controller = module.get<ListTaskController>(ListTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
