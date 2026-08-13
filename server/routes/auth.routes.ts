import express, { type Express} from 'express'


import { login, register, logout } from '../controllers/auth.controller.js';

const authRouter: Express = express();

authRouter.post("/auth/signup", register)
authRouter.post("/auth/login",login)
authRouter.get("/auth/logout",logout)

export { authRouter}