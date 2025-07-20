import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
export default socket;
