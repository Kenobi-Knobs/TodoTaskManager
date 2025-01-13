import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';
import { CreateTask } from '../models/create-task-dto.model';
import { environment } from '../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('should a GET request and return task list', () => {
      const mockTasks: Task[] = [
        { id: '1', date: '2025-01-01', description: 'Task 1' },
        { id: '2', date: '2025-01-02', description: 'Task 2' }
      ];

      service.getTasks().subscribe((tasks) => {
        expect(tasks.length).toBe(2);
        expect(tasks).toEqual(mockTasks);
      });

      const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks`);
      expect(req.request.method).toBe('GET');
      req.flush(mockTasks);
    });
  });

  describe('addTask', () => {
    it('should send a POST request and return the added task', () => {
      const newTask: CreateTask = { description: 'New Task' };
      const mockTask: Task = { id: '3', date: '2025-01-03', description: 'New Task' };

      service.addTask(newTask).subscribe((task) => {
        expect(task).toEqual(mockTask);
      });

      const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newTask);
      req.flush(mockTask);
    });
  });

  describe('deleteTask', () => {
    it('should send a DELETE request', () => {
      const taskId = '1';

      service.deleteTask(taskId).subscribe();

      const req = httpTestingController.expectOne(`${environment.apiUrl}/tasks/${taskId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
