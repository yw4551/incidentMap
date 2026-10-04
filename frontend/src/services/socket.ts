import { io, type Socket } from "socket.io-client";
import type { IncidentTypes } from "../types/incident";
import { useAuthStore } from "../stores/auth.store";

const SOCKET_URL = import.meta.env.VITE_API_URL;

let socket: Socket | null = null;

interface IncidentSocketHandlers {
    onCreated: (incident: IncidentTypes) => void;
    onUpdated: (incident: IncidentTypes) => void;
    onDeleted: (data: { id: string }) => void;
}

const getSocket = (): Socket => {
    if (socket) {
        return socket;
    }

    const token = useAuthStore.getState().token;

    if (!token) {
        throw new Error("Authentication required");
    }

    socket = io(SOCKET_URL, {
        auth: {
            token,
        },
    });

    return socket;
};

export const subscribeToIncidentEvents = (handlers: IncidentSocketHandlers) => {
    const currentSocket = getSocket();

    currentSocket.on("incident:created", handlers.onCreated);

    currentSocket.on("incident:updated", handlers.onUpdated);

    currentSocket.on("incident:deleted", handlers.onDeleted);

    return () => {
        currentSocket.off("incident:created", handlers.onCreated);

        currentSocket.off("incident:updated", handlers.onUpdated);

        currentSocket.off("incident:deleted", handlers.onDeleted);
    };
};

export const disconnectSocket = () => {
    if (!socket) {
        return;
    }

    socket.disconnect();

    socket = null;
};
