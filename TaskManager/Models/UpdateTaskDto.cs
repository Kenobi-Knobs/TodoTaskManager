namespace TaskManager.Server.Models
{
    public class UpdateTaskDto
    {
        public string Description { get; set; }
        public bool IsPinned { get; set; }
    }
}
