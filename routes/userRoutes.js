import express from "express";
import { createUser, loginUser } from "../controller/user.js";

const userRouter = express.Router()

userRouter.post('/new' ,  createUser)
userRouter.post('/login' ,  loginUser)

export default userRouter