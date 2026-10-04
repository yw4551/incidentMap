import { useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "../stores/auth.store";

interface AuthInitializerProps {
    children: ReactNode;
}

function AuthInitializer({ children }: AuthInitializerProps) {
    const [loading, setLoading] = useState(true);
    const loadUser = useAuthStore((state) => state.loadUser);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await loadUser();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, [loadUser]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return children;
}

export default AuthInitializer;
