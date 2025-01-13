using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TaskManager.Server.Models
{
    public class Task
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public System.DateTime? Date { get; set; }
        public bool? IsPinned { get; set; } = false;
        public required string Description { get; set; }
    }
}
