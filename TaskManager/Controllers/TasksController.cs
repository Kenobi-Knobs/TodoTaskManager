using Microsoft.AspNetCore.Mvc;
using TaskManager.Server.Services;
using Task = TaskManager.Server.Models.Task;


namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITasksService _taskService;

        public TasksController(ITasksService tasksService)
        {
            _taskService = tasksService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Task>>> GetTasks()
        {
            var tasks = await _taskService.GetTasksAsync();
            if (tasks == null || tasks.Count == 0)
            {
                return NotFound();
            }
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<ActionResult<Task>> CreateTask(Task task)
        {
            await _taskService.CreateTaskAsync(task);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTask(string id)
        {
            await _taskService.DeleteTaskAsync(id);
            return Ok();
        }
    }
}
