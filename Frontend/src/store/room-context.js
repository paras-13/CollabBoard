import { createContext } from "react";
const roomContext = createContext({
  roomId: null,
  userMode: null,
  userName: null,
  userId: null,
  setRoomId: () => {},
  setMode: () => {},
  setUserInfo: () => {},
});
export default roomContext;
