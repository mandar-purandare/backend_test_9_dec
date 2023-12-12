import { Router } from "express";
import { CreateUser, DeleteUser, ReadUsers, ReadOwnData } from "../Controllers/User.controllers.js";
import isAdmin from "../Middlewares/User.middleware.js";

const userRoutes = Router();

userRoutes.post('/create-user', CreateUser);
userRoutes.delete('/delete-user', DeleteUser);
userRoutes.get('/read-users', ReadUsers);
userRoutes.get('/read-own-data', ReadOwnData);

export default userRoutes;