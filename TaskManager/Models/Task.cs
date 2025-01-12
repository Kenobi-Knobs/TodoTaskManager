namespace TaskManager.Server.Models
{
    public class Task
    {
        public int Id { get; set; }
        public required string Date { get; set; }
        public required string Description { get; set; }
    }
}
