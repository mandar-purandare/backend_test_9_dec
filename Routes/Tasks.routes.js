import { Router } from "express";
import { CreateTask, GetTaskInfo } from "../Controllers/Task.controllers.js";

const taskRoutes = Router();

taskRoutes.post('/create-task', CreateTask);
// taskRoutes.patch('/update-task', UpdateTask);
taskRoutes.get('/get-task-info', GetTaskInfo);

export default taskRoutes;