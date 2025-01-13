using TodoTask = TaskManager.Server.Models.Task;

namespace TaskManager.Server.Services
{
    public interface ITasksService
    {
        Task<List<TodoTask>> GetTasksAsync();
        Task CreateTaskAsync(TodoTask task);
        Task DeleteTaskAsync(string id);
    }
}
