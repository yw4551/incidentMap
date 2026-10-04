import { create } from "zustand";
import type { UserTypes } from "../types/user";
import { persist } from "zustand/middleware";
import { getMe, login, register } from "../services/auth.api";

interface AuthStore {
    user: UserTypes | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loadUser: () => Promise<void>;
}

type PersistedAuthState = Pick<AuthStore, "user" | "token">;

export const useAuthStore = create<AuthStore>()(
    persist<AuthStore, [], [], PersistedAuthState>(
        (set, get) => ({
            token: null,
            user: null,
            login: async (email: string, password: string) => {
                const result = await login(email, password);
                set({
                    token: result.data.token,
                    user: result.data.user,
                });
            },
            register: async (email: string, password: string) => {
                const result = await register(email, password);
                set({
                    token: result.data.token,
                    user: result.data.user,
                });
            },
            logout: () => {
                set({
                    token: null,
                    user: null,
                });
            },
            loadUser: async () => {
                try {
                    const token = get().token;

                    if (!token) {
                        return;
                    }

                    const result = await getMe(token);
                    set({
                        user: result.data.user,
                    });
                } catch (err) {
                    set({
                        user: null,
                        token: null,
                    });
                    throw err;
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                token: state.token,
            }),
        },
    ),
);
