import mongoose from "mongoose";
import { user } from "./model/userModel.js";

const uri = "mongodb://127.0.0.1:27017"

user.create({name: 'rohit', email: 'farxi@mail.com', password: '256778'}).then(()=>{
    console.log('user created')
})

export const db = async () => {
    try {
       await mongoose.connect(uri , {dbName: 'chatbox_database'} )
       console.log('connected to database')
    } catch (error) {
        console.log(error)
    }
} 

