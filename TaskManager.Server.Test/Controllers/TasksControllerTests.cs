using Moq;
using TaskManager.Controllers;
using TodoTask = TaskManager.Server.Models.Task;
using TaskManager.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace TaskManager.Server.Test.Controllers
{
    public class TasksControllerTests
    {
        private readonly Mock<ITasksService> _mockTasksService;
        private readonly TasksController _controller;

        public TasksControllerTests()
        {
            _mockTasksService = new Mock<ITasksService>();
            _controller = new TasksController(_mockTasksService.Object);
        }

        [Fact]
        public async Task GetTasks_ReturnsTasks()
        {
            // Arrange
            var mockTasks = new List<TodoTask>
            {
                new TodoTask { Id = "1", Date = DateTime.Now, Description = "Task 1" },
                new TodoTask { Id = "2", Date = DateTime.Now, Description = "Task 2" }
            };
            _mockTasksService.Setup(service => service.GetTasksAsync())
                .ReturnsAsync(mockTasks);
            // Act
            var result = await _controller.GetTasks();
            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var tasks = Assert.IsType<List<TodoTask>>(okResult.Value);
            Assert.Equal(2, tasks.Count);
        }

        [Fact]
        public async Task GetTasks_ReturnsNotFound_WhenNoTasksExist()
        {
            // Arrange
            _mockTasksService.Setup(service => service.GetTasksAsync())
                .ReturnsAsync(new List<TodoTask>());
            // Act
            var result = await _controller.GetTasks();
            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateTask_ReturnsCreatedAtAction()
        {
            // Arrange
            var newTask = new TodoTask { Description = "New Task" };
            _mockTasksService.Setup(service => service.CreateTaskAsync(newTask))
                .Returns(Task.CompletedTask);
            // Act
            var result = await _controller.CreateTask(newTask);
            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var task = Assert.IsType<TodoTask>(createdResult.Value);
            Assert.Equal("New Task", task.Description);
        }

        [Fact]
        public async Task DeleteTask_ReturnsOk()
        {
            // Arrange
            var taskId = "1";
            _mockTasksService.Setup(service => service.DeleteTaskAsync(taskId))
                            .Returns(Task.CompletedTask);
            // Act
            var result = await _controller.DeleteTask(taskId);
            // Assert
            Assert.IsType<OkResult>(result);
        }
    }
}
