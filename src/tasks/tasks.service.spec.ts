import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  getTaskById: jest.fn(),
});

const mockUser = {
  username: 'kapil',
  id: '123',
  password: '2342433645',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls Taskrepository.getTasks ans returns the result', async () => {
      taskRepository.getTasks.mockResolvedValue('some value');
      const res = await tasksService.getTasks(null, mockUser);
      expect(res).toEqual('some value');
    });
  });

  describe('getTaskById', () => {
    it('calls TaskRepository.getTaskById and returns the result', async () => {
      taskRepository.getTaskById.mockResolvedValue('someValue');
      const res = await tasksService.getTaskById('1234', mockUser);
      expect(res).toEqual('someValue');
    });

    it('calls the taskRepository.getTsskById and thow the excetion', async () => {
      taskRepository.getTaskById.mockResolvedValue(null);
      expect(await tasksService.getTaskById('1234', mockUser)).toEqual(null);
    });
  });
});
