import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';
import { provideHttpClient} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Task } from '../../models/task.model';
import { of } from 'rxjs';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: TaskService;

  describe('TaskFormComponent', () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;
    let taskService: TaskService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TaskFormComponent],
        providers: [
          TaskService,
          provideHttpClient(),
          provideHttpClientTesting()
        ]
      });

      fixture = TestBed.createComponent(TaskFormComponent);
      component = fixture.componentInstance;
      taskService = TestBed.inject(TaskService);
    });

    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should emit taskAdded event when a task is added successfully', () => {
      const mockTask: Task = { id: '1', date: '2021-01-01', description: 'New Task' };

      spyOn(component.taskAdded, 'emit');

      spyOn(taskService, 'addTask').and.returnValue(of(mockTask));

      component.taskDescription = 'New Task';
      component.onSubmit();

      expect(component.taskAdded.emit).toHaveBeenCalledWith(mockTask);
    });

    it('should not emit taskAdded event if task description is empty', () => {
      spyOn(component.taskAdded, 'emit');
      component.taskDescription = '';
      component.onSubmit();

      expect(component.taskAdded.emit).not.toHaveBeenCalled();
    });

    it('should call addTask on taskService when task is submitted', () => {
      const mockTask: Task = { id: '1', date: '2021-01-01', description: 'New Task' };

      spyOn(component.taskAdded, 'emit');
      spyOn(taskService, 'addTask').and.returnValue(of(mockTask));

      component.taskDescription = 'New Task';
      component.onSubmit();

      expect(component.taskAdded.emit).toHaveBeenCalledWith(mockTask);
    });
  });
});