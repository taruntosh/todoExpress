# todoExpress

This application is a simple CRUD (Create, Read, Update, Delete) RESTful API built with Node.js and Express for managing tasks. Below are the routes available in this application along with their descriptions:

## Routes

1. **GET `/`**

   - Description: Returns a welcome message.
   - Example Response:
     ```json
     {
       "message": "Hello Crud Node Express"
     }
     ```

2. **POST `/tasks`**

   - Description: Creates a new task.
   - Request Body: JSON object with task details (`title`, `description`, `createdBy`, `createdOn`, `dueDate`, `priority`, `completedOn`, `isCompleted`).
   - Example Request Body:
     ```json
     {
       "title": "Task Title",
       "description": "Task Description",
       "createdBy": "John Doe",
       "createdOn": "2024-06-04T12:00:00.000Z",
       "dueDate": "2024-06-10T12:00:00.000Z",
       "priority": "High",
       "completedOn": null,
       "isCompleted": false
     }
     ```
   - Example Response:
     ```json
     {
       "message": "Task created successfully",
       "task": { "task details" }
     }
     ```

3. **GET `/tasks/:id`**

   - Description: Retrieves a task by its ID.
   - Example Response:
     ```json
     {
       "task": { "task details" }
     }
     ```

4. **PUT `/tasks/:id`**

   - Description: Updates a task by its ID.
   - Request Body: JSON object with updated task details.
   - Example Request Body:
     ```json
     {
       "title": "Updated Task Title",
       "description": "Updated Task Description",
       "dueDate": "2024-06-15T12:00:00.000Z",
       "priority": "Medium"
     }
     ```
   - Example Response:
     ```json
     {
       "message": "Task updated successfully",
       "task": { "updated task details" }
     }
     ```

5. **DELETE `/tasks/:id`**

   - Description: Deletes a task by its ID.
   - Example Response:
     ```json
     {
       "message": "Task deleted successfully",
       "task": { "deleted task details" }
     }
     ```

6. **GET `/tasks`**
   - Description: Retrieves all tasks.
   - Example Response:
     ```json
     {
       "tasks": [ { "task details" }, { "task details" }, ... ]
     }
     ```
