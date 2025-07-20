import { useReducer, useEffect } from "react";
import roomContext from "./room-context";
import { ROOM_ACTIONS, ROOM_ACCESS_MODE } from "../utils/constants";

const roomReducer = (state, action) => {
  switch (action.type) {
    case ROOM_ACTIONS.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload.roomCode,
      };
    case ROOM_ACTIONS.SET_USER_MODE:
      return {
        ...state,
        userMode: action.payload.mode,
      };
    case ROOM_ACTIONS.SET_USER_INFO:
      return {
        ...state,
        userName: action.payload.uName,
        userId: action.payload.uId,
      };
    default:
      return state;
  }
};

const initialRoomState = {
  roomId: null,
  userMode: ROOM_ACCESS_MODE.USER_MODE,
  userName: null,
  userId: null,
};

const RoomProvider = ({ children }) => {
  const [roomState, dispatchRoomAction] = useReducer(
    roomReducer,
    initialRoomState
  );

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    const storedRoomId = sessionStorage.getItem("roomId");
    const storedMode = sessionStorage.getItem("userMode");
    const storedName = sessionStorage.getItem("userName");
    const storedId = sessionStorage.getItem("userId");

    if (storedRoomId) {
      setRoomId(storedRoomId);
    }
    if (storedMode) {
      setMode(storedMode);
    }
    if (storedName && storedId) {
      setUserInfo(storedName, storedId);
    }
  }, []);

  const setRoomId = (roomId) => {
    sessionStorage.setItem("roomId", roomId); // persist
    dispatchRoomAction({
      type: ROOM_ACTIONS.SET_ROOM_ID,
      payload: { roomCode: roomId },
    });
  };

  const setMode = (userMode) => {
    sessionStorage.setItem("userMode", userMode); // persist
    dispatchRoomAction({
      type: ROOM_ACTIONS.SET_USER_MODE,
      payload: { mode: userMode },
    });
  };

  const setUserInfo = (name, id) => {
    sessionStorage.setItem("userName", name);
    sessionStorage.setItem("userId", id);
    dispatchRoomAction({
      type: ROOM_ACTIONS.SET_USER_INFO,
      payload: { uName: name, uId: id },
    });
  };

  const roomContextValue = {
    roomId: roomState.roomId,
    userMode: roomState.userMode,
    userName: roomState.userName,
    userId: roomState.userId,
    setRoomId,
    setMode,
    setUserInfo,
  };

  return (
    <roomContext.Provider value={roomContextValue}>
      {children}
    </roomContext.Provider>
  );
};

export default RoomProvider;
