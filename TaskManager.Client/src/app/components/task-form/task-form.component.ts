import { Component, Output, EventEmitter} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CreateTask } from '../../models/create-task-dto.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  taskDescription: string = '';
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private taskService: TaskService) { }

  onSubmit(): void {
    if (this.taskDescription.trim()) {
      const newTask: CreateTask = {
        description: this.taskDescription
      };

      this.taskService.addTask(newTask).subscribe((data) => {
        this.taskDescription = '';
        this.taskAdded.emit(data);
      });
    }
  }
}
