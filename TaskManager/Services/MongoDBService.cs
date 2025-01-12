using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TaskManager.Server.Models;
using Task = TaskManager.Server.Models.Task;

namespace TaskManager.Server.Services
{
    public class MongoDBService
    {
        public readonly IMongoCollection<Task> tasksCollection;

        public MongoDBService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionURI);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            tasksCollection = database.GetCollection<Task>(settings.Value.CollectionName);
        }
    }
}
