using TodoTask = TaskManager.Server.Models.Task;
using UpdateTaskDto = TaskManager.Server.Models.UpdateTaskDto;


namespace TaskManager.Server.Services
{
    public interface ITasksService
    {
        Task<List<TodoTask>> GetTasksAsync();
        Task CreateTaskAsync(TodoTask task);
        Task DeleteTaskAsync(string id);
        Task UpdateTaskAsync(string id, UpdateTaskDto task);
    }
}
