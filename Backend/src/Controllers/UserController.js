import { User } from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registration = async (req, res) => {
    let registrationForm = req.body;

    try {
        const hashPassword = await bcrypt.hash(registrationForm.password, 5);
        registrationForm = {...registrationForm, password: hashPassword, role: "USER"};
        await User.create(registrationForm);
        return res.status(201).json({success: true, message: "Register Successfully"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    const loginForm = req.body;

    try {
        const user = await User.findOne({username: loginForm.username});

        if (user) {
            const checkPassword = await bcrypt.compare(loginForm.password, user.password);
            if (checkPassword) {
                const payload = {
                    userId: user.id,
                    username: user.username,
                    role: user.role
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: process.env.EXPIRE_TIME,
                    algorithm: "HS256"
                });

                return res.status(200).json({success: true, jwtToken: token, message: "Login Successfully"});
            }
            return res.status(400).json({success: false, message: "Wrong Password!"});
        }
        return res.status(404).json({success: false, message: "Not Found!"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({role: "USER"});

        if (users.length <= 0) {
            return res.status(200).json({success: true, message: "There Is No User", users: null});
        }

        return res.status(200).json({success: true, users: users});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    const {userId} = req.params;

    try {
        const selectedUser = await User.findByIdAndDelete(userId);

        if (selectedUser) {
            return res.status(200).json({success: true, message: "Deleted User Successfully"});
        }

        return res.status(404).json({success: false, message: "User Not Found"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}