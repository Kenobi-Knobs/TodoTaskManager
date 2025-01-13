using MongoDB.Driver;
using TodoTask = TaskManager.Server.Models.Task;

namespace TaskManager.Server.Services
{
    public class TasksService : ITasksService
    {
        private readonly MongoDBService _mongoDBService;

        public TasksService(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public async Task<List<TodoTask>> GetTasksAsync()
        {
            return await _mongoDBService.tasksCollection.Find(task => true).ToListAsync();
        }

        public async Task CreateTaskAsync(TodoTask task)
        {
            task.Date = DateTime.Now;
            await _mongoDBService.tasksCollection.InsertOneAsync(task);
        }

        public async Task DeleteTaskAsync(string id)
        {
            await _mongoDBService.tasksCollection.DeleteOneAsync(task => task.Id == id);
        }
    }
}
