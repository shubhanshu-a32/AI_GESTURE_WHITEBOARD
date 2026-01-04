import { Server, Socket } from "socket.io";
import { DrawEvent } from "./types";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);

    // Receive data from Python AI OR React client
    socket.on("draw", (data: DrawEvent) => {
      // Broadcast to everyone except sender
      socket.broadcast.emit("draw", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};