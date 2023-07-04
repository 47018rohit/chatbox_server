import { model } from "mongoose";
import { userSchema } from "../schema/userSchema.js";

export const user = model("user" , userSchema)