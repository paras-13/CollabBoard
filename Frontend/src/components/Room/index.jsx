import React, { useContext, useState } from "react";
import classes from "./index.module.css";
import ShareRoom from "./ShareRoom";
import roomContext from "../../store/room-context";
import { ROOM_ACCESS_MODE } from "../../utils/constants";

const Room = () => {
  const { userMode } = useContext(roomContext);
  const [openShareRoomScreen, setOpenShareRoomScreen] = useState(false);
  return (
    <>
      {/* Your main content */}
      <div className={classes.container}>
        {userMode !== ROOM_ACCESS_MODE.CLIENT_MODE && (
          <button
            className={classes.button}
            onClick={() => setOpenShareRoomScreen(true)}
          >
            Share Room
          </button>
        )}

        <button className={classes.button}>Join Room</button>
      </div>

      {/* Modal */}
      {openShareRoomScreen && (
        <ShareRoom setOpenShareRoomScreen={setOpenShareRoomScreen} />
      )}
    </>
  );
};

export default Room;
