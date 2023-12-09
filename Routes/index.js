import { Router } from "express";
import userRoutes from "./User.routes.js";
import taskRoutes from "./Tasks.routes.js";

const router = Router();

router.use('/user', userRoutes);
router.use('/task', taskRoutes);

export default router