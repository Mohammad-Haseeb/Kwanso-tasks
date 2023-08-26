import { Test, TestingModule } from '@nestjs/testing';
import { ListTaskService } from './list-task.service';

describe('ListTaskService', () => {
  let service: ListTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListTaskService],
    }).compile();

    service = module.get<ListTaskService>(ListTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
