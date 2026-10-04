import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_ORIGIN,
        },
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("Authentication required"));
        }

        try {
            socket.user = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch {
            next(new Error("Invalid or expired token"));
        }
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
