# Task Manager

Task Manager is a web application for task management, allowing users to add, view, and delete tasks. The application consists of a frontend built with Angular and a backend using ASP.NET Core with MongoDB for data storage.

### Main Features:

1. **Add Tasks**:
   - Users can add new tasks via a form.
   - Once added, the task appears in the list.

2. **View Tasks**:
   - All tasks are displayed in a list with their description.

3. **Delete Tasks**:
   - Users can delete tasks using a checkbox.

4. **Pin/Unpin Tasks**
   - Users can pin tasks.

## Technologies

- **Frontend**:
  - Angular

- **Backend**:
  - ASP.NET Core
  - MongoDB

- **Testing**:
  - Jasmine
  - Karma
  - xUnit

## MongoDB Setup

1. Create a MongoDB database and save the connection string.
2. Add these details to `appsettings.json` in the backend:

```json
{
  "MongoDBSettings": {
    "ConnectionURI": "your_connection_uri",
    "DatabaseName": "task_db",
    "CollectionName": "tasks"
  }
}