import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';
import { CreateTask } from '../models/create-task-dto.model';
import { UpdateTask } from '../models/update-task-dto.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  getTasks() : Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  addTask(task: CreateTask) : Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks`, task);
  }

  deleteTask(taskId: string) : Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/tasks/${taskId}`);
  }

  updateTask(taskId: string, task: UpdateTask) : Observable<Task> {
    return this.http.patch<Task>(`${environment.apiUrl}/tasks/${taskId}`, task);
  }
}
