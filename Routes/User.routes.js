import { Router } from "express";
import { CreateUser, DeleteUser, GetUserInfo } from "../Controllers/User.controllers.js";
import isAdmin from "../Middlewares/User.middleware.js";

const userRoutes = Router();

userRoutes.post('/create-user', isAdmin ,CreateUser);
userRoutes.delete('/delete-user', DeleteUser);
userRoutes.get('/get-user-info', GetUserInfo);

export default userRoutes;