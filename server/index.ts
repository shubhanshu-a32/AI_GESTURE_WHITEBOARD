import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { setupSocket } from "./socket";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

setupSocket(io);

// Health check
app.get("/", (_req, res) => {
  res.send("AI Gesture Whiteboard Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
