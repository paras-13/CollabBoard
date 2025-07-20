import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import Error from "../../Error";
import Board from "../Board";
import ToolBar from "../Toolbar";
import Toolbox from "../Toolbox";
import Room from "../Room";
import roomContext from "../../store/room-context";
import RoomProvider from "../../store/RoomProvider";
import BoardProvider from "../../store/BoardProvider";
import ToolboxProvider from "../../store/ToolboxProvider";
import "react-toastify/dist/ReactToastify.css";
import { ROOM_ACCESS_MODE } from "../../utils/constants";
import { isValidAccessMode, isValidRoomCode } from "./check";
import socket from "../../socket";
const WhiteboardInner = ({ room, mode }) => {
  const { roomId, userMode, userName, userId, setRoomId, setMode } =
    useContext(roomContext);
  // console.log(mode, room);
  // if (userMode === ROOM_ACCESS_MODE.HOST_MODE) {
  //   // console.log("Hello");
  //   socket.emit("join-room", { roomId, userMode, userName, userId, key: 1 });
  // }

  useEffect(() => {
    if (
      userMode !== ROOM_ACCESS_MODE.CLIENT_MODE &&
      mode === ROOM_ACCESS_MODE.CLIENT_MODE
    ) {
      setMode(mode);
      setRoomId(room);
    }
  }, []);

  useEffect(() => {
    if (roomId && userMode && userName && userId) {
      const k = userMode === ROOM_ACCESS_MODE.HOST_MODE ? 1 : 0;
      socket.emit("join-room", { roomId, userMode, userName, userId, key: k });
      console.log("Hello");
    }
  }, [roomId, userMode, userId, userName]);
  return (
    <BoardProvider>
      <ToolboxProvider>
        <ToastContainer />
        <Board />
        <Room />
        <ToolBar />
        <Toolbox />
      </ToolboxProvider>
    </BoardProvider>
  );
};

const Whiteboard = () => {
  const { room, mode } = useParams();
  const [isValid, setIsValid] = useState(null);
  useEffect(() => {
    if (mode && room) {
      const validate = async () => {
        const valid = await isValidRoomCode(room);
        setIsValid(valid);
      };
      if (isValidAccessMode(mode)) {
        validate();
      } else setIsValid(false);
    } else setIsValid(true);
  }, [room, mode]);
  if (isValid === null) return <div>Loading ...</div>;
  if (!isValid) return <Error />;
  return (
    <RoomProvider>
      <WhiteboardInner room={room} mode={mode} />
    </RoomProvider>
  );
};

export default Whiteboard;
