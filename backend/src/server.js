import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import connectDb from "./db/db.js";
import authRouter from "./routes/auth.routes.js";
import errorhandler from "./utils/errorHandler.js";
import incidentRouter from "./routes/incident.routes.js";
import { createServer } from "node:http";
import { initializeSocket } from "./socket.js";

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
    }),
);

app.use(helmet());

app.get("/health", (req, res) => {
    res.json({
        success: true,
        data: {
            message: "Server is healthy",
        },
    });
});

app.use("/auth", authRouter);
app.use("/incidents", incidentRouter);

app.use(errorhandler);

const startServer = async () => {
    try {
        await connectDb();
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
};

startServer();
