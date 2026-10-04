import { Server } from "socket.io";

let io;

export const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_ORIGIN,
        },
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
};

export const emitIncidentCreated = (incident) => {
    io.emit("incident:created", incident);
};

export const emitIncidentUpdated = (incident) => {
    io.emit("incident:updated", incident);
};

export const emitIncidentDeleted = (incident) => {
    io.emit("incident:deleted", incident);
};
