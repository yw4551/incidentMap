import { Router } from "express";
import { login, register, getMe } from "../ctrls/auth.ctrl.js";
import {
    registerSchema,
    loginSchema,
} from "../validations/services/auth.validation.js";
import { validateBody } from "../utils/validate.js";
import authenticate from "../utils/authMiddleware.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = Router();

router.post("/register", validateBody(registerSchema), asyncWrapper(register));
router.post("/login", validateBody(loginSchema), asyncWrapper(login));
router.get("/me", authenticate, getMe);

export default router;
