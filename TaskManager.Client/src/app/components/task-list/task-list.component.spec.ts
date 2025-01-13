import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Task } from '../../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        TaskService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display tasks', () => {
    const mockTasks: Task[] = [
      { id: '1', date: '2021-01-01', description: 'Task 1' },
      { id: '2', date: '2021-01-02', description: 'Task 2' }
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(mockTasks));

    fixture.detectChanges();

    const taskItems = fixture.nativeElement.querySelectorAll('.task-item');
    expect(taskItems.length).toBe(mockTasks.length);
    expect(taskItems[0].textContent).toContain('Task 1');
    expect(taskItems[1].textContent).toContain('Task 2');
  });

  it('should add a new task to the list', () => {
    const newTask: Task = { id: '3', date: '2021-01-03', description: 'Task 3' };

    component.onTaskAdded(newTask);

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0]).toEqual(newTask);
  });

  it('should delete a task from the list', () => {
    const mockTasks: Task[] = [
      { id: '1', date: '2021-01-01', description: 'Task 1' },
      { id: '2', date: '2021-01-02', description: 'Task 2' }
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(mockTasks));
    fixture.detectChanges();

    const taskIdToDelete = '1';

    spyOn(taskService, 'deleteTask').and.returnValue(of(undefined));

    component.onTaskDelete(taskIdToDelete);

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].id).toBe('2');
  });
});
