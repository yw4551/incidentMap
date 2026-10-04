import type { AuthResponse, MeResponse } from "../types/api";
import { apiRequest } from "./api";

export const register = async (email: string, password: string) => {
    const result = await apiRequest<AuthResponse>("/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    return result;
};

export const login = async (email: string, password: string) => {
    const result = await apiRequest<AuthResponse>("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    return result;
};

export const getMe = async (token: string) => {
    const result = await apiRequest<MeResponse>("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return result;
};
