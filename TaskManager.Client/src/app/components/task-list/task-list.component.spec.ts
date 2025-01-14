import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Task } from '../../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;

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
      { id: '1', date: '2021-01-01', description: 'Task 1', isPinned: true },
      { id: '2', date: '2021-01-02', description: 'Task 2', isPinned: false }
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(mockTasks));

    fixture.detectChanges();

    const taskItems = fixture.nativeElement.querySelectorAll('.task-item');
    expect(taskItems.length).toBe(mockTasks.length);
    expect(taskItems[0].textContent).toContain(mockTasks[0].description);
    expect(taskItems[1].textContent).toContain(mockTasks[1].description);
  });

  it('should add a new task to the list', () => {
    const newTask: Task = { id: '3', date: '2021-01-03', description: 'Task 3', isPinned: false };

    component.onTaskAdded(newTask);

    expect(component.unpinnedTasks.length).toBe(1);
    expect(component.unpinnedTasks[0]).toEqual(newTask);
  });

  it('should delete a task from the list', () => {
    const mockTasks: Task[] = [
      { id: '1', date: '2021-01-01', description: 'Task 1', isPinned: false },
      { id: '2', date: '2021-01-02', description: 'Task 2', isPinned: false }
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(mockTasks));
    fixture.detectChanges();

    const taskIdToDelete = '1';

    spyOn(taskService, 'deleteTask').and.returnValue(of(undefined));

    component.onTaskDelete(taskIdToDelete);

    expect(component.unpinnedTasks.length).toBe(1);
    expect(component.unpinnedTasks[0].id).toBe('2');
  });

  it('should pin a task', () => {
    const mockTasks: Task[] = [
      { id: '1', date: '2021-01-01', description: 'Task 1', isPinned: false },
      { id: '2', date: '2021-01-02', description: 'Task 2', isPinned: true }
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(mockTasks));
    fixture.detectChanges();

    const taskToPin = mockTasks[0];

    spyOn(taskService, 'updateTask').and.returnValue(of(taskToPin));

    component.onTaskPin(taskToPin);

    expect(component.pinnedTasks.length).toBe(2);
    expect(component.unpinnedTasks.length).toBe(0);
  });

  it('should unpin a task', () => {
    const mockTasks: Task[] = [
      { id: '1', date: '2021-01-01', description: 'Task 1', isPinned: false },
      { id: '2', date: '2021-01-02', description: 'Task 2', isPinned: true }
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(mockTasks));
    fixture.detectChanges();

    const taskToUnpin = mockTasks[1];

    spyOn(taskService, 'updateTask').and.returnValue(of(taskToUnpin));

    component.onTaskUnpin(taskToUnpin);

    expect(component.unpinnedTasks.length).toBe(2);
    expect(component.pinnedTasks.length).toBe(0);
  });
});
