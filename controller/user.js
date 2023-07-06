import bcrypt from "bcrypt"
import { user } from "../model/userModel.js"

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const userExist = await user.findOne({ email })
        if (userExist) return res.status(409).json({
            "message": "User Already Exist"
        })

        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await user.create({ name, email, password: hashedPassword })

        if (createUser) res.status(201).json({
            "message": " user created sucesfully",
            "status": "Success"
        })
    } catch (error) {
        console.log(error)
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const userExist = await user.findOne({ email }).select("+password")
        
        if (!userExist) return res.status(401).json({
            "success": false,
            "message": "email or password didn't match"
        })

        const comparePassword = await bcrypt.compare(password , userExist.password)

        if(!comparePassword) return res.status(401).json({
            "success": false,
            "message": "email or password didn't match"
        })

        res.status(200).json({
            "success": true,
            "message": "logged in successfully"
        })
    } catch (error) {
        console.log(error)
    }
}