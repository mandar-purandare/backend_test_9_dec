import { Router } from "express";
import { AssignTaskToUser, UpdateTask,CompleteTask, CreateTask, MarkTaskAsComplete, ReadOwnTasks, SortSearch } from "../Controllers/Task.controllers.js";

const taskRoutes = Router();

taskRoutes.post('/create-task', CreateTask);
taskRoutes.patch('/update-task', UpdateTask);
taskRoutes.get('/sort-search', SortSearch);
taskRoutes.get('/read-own-tasks', ReadOwnTasks);
// taskRoutes.patch('/mark-task-as-complete', MarkTaskAsComplete);
taskRoutes.patch('/assign-task-to-user', AssignTaskToUser);
taskRoutes.patch('/complete-task', CompleteTask);


export default taskRoutes;