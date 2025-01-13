import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { UpdateTask } from '../../models/update-task-dto.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  standalone: false,
})
export class TaskListComponent implements OnInit {
  unpinnedTasks: Task[] = [];
  pinnedTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => {
      this.unpinnedTasks = data.filter(task => !task.isPinned);
      this.pinnedTasks = data.filter(task => task.isPinned);
    });
  }

  onTaskAdded(newTask: Task): void {
    this.unpinnedTasks.push(newTask);
  }

  onTaskDelete(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.unpinnedTasks = this.unpinnedTasks.filter(task => task.id !== taskId);
      this.pinnedTasks = this.pinnedTasks.filter(task => task.id !== taskId);
    });
  }

  onTaskPin(pinnedTask: Task) {
    let updatedTask = { isPinned: true, description: pinnedTask.description } as UpdateTask;
    this.taskService.updateTask(pinnedTask.id, updatedTask).subscribe(() => {
      this.pinnedTasks.push(pinnedTask);
      this.unpinnedTasks = this.unpinnedTasks.filter(task => task.id !== pinnedTask.id);
      this.pinnedTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }

  onTaskUnpin(unpinnedTask: Task) {
    let updatedTask = { isPinned: false, description: unpinnedTask.description } as UpdateTask;
    this.taskService.updateTask(unpinnedTask.id, updatedTask).subscribe(() => {
      this.unpinnedTasks.push(unpinnedTask);
      this.pinnedTasks = this.pinnedTasks.filter(task => task.id !== unpinnedTask.id);
      this.unpinnedTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }
}
