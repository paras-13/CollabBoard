import { ROOM_ACCESS_MODE } from "../../utils/constants";
import api from "../../api";
export const isValidAccessMode = (mode) => {
  if (
    mode === ROOM_ACCESS_MODE.HOST_MODE ||
    mode === ROOM_ACCESS_MODE.CLIENT_MODE
  )
    return true;
  return false;
};
export const isValidRoomCode = async (roomId) => {
  try {
    const response = await api.post("/check-status/room-code", { roomId });
    console.log("Response Received", response.data);
    return response.data.status;
  } catch (err) {
    console.log(err);
    return false;
  }
};
