import { io, type Socket } from "socket.io-client";
import type { IncidentTypes } from "../types/incident";

const SOCKET_URL = import.meta.env.VITE_API_URL;

let socket: Socket | null = null;

export const connectSocket = () => {
    if (socket?.connected) {
        return socket;
    }

    socket = io(SOCKET_URL);

    return socket;
};

export const disconnectSocket = () => {
    if (!socket) {
        return;
    }

    socket.disconnect();
    socket = null;
};

export const subscribeToIncidentEvents = ({
    onCreated,
    onUpdated,
    onDeleted,
}: {
    onCreated: (incident: IncidentTypes) => void;
    onUpdated: (incident: IncidentTypes) => void;
    onDeleted: (data: { id: string }) => void;
}) => {
    const currentSocket = connectSocket();

    currentSocket.on("incident:created", onCreated);
    currentSocket.on("incident:updated", onUpdated);
    currentSocket.on("incident:deleted", onDeleted);

    return () => {
        currentSocket.off("incident:created", onCreated);
        currentSocket.off("incident:updated", onUpdated);
        currentSocket.off("incident:deleted", onDeleted);
    };
};
