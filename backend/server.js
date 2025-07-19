import app from "./app.js";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
const PORT = process.env.PORT || 8000;

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket connection established");
});

server.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
