import bcrypt from "bcrypt";
import { findUserByEmail, createUser, findUserById } from "../DAL/user.dal.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
    const { email, password } = req.validatedBody;
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email already in use",
        });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    let user;

    try {
        user = await createUser({ email, passwordHash });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already in use",
            });
        }

        throw err;
    }

    const token = generateToken(user);

    res.status(201).json({
        success: true,
        data: {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            token,
        },
    });
};

export const login = async (req, res) => {
    const { email, password } = req.validatedBody;

    const user = await findUserByEmail(email);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    const verifyPassword = await bcrypt.compare(password, user.passwordHash);

    if (!verifyPassword) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });
    }

    const token = generateToken(user);

    res.json({
        success: true,
        data: {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            token,
        },
    });
};

export const getMe = async (req, res) => {
    const user = req.user;
    const id = user.id;

    const foundUser = await findUserById(id);

    if (!foundUser) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    res.json({
        success: true,
        data: {
            user: {
                id: foundUser._id,
                email: foundUser.email,
                role: foundUser.role,
            },
        },
    });
};
