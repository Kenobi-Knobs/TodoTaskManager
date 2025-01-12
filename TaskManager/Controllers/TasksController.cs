using Microsoft.AspNetCore.Mvc;
using Task = TaskManager.Server.Models.Task;


namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            Task[] tasks = new Task[]
            {
                new Task { Id = 1, Date = "2021-01-01", Description = "Task 1" },
                new Task { Id = 2, Date = "2021-01-02", Description = "Task 2" },
                new Task { Id = 3, Date = "2021-01-03", Description = "Task 3" }
            };

            return Ok(tasks);
        }
    }
}
