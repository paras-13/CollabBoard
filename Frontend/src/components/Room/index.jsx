import React, { useState } from "react";
import classes from "./index.module.css";
import ShareRoom from "./ShareRoom";

const Room = () => {
  const [openShareRoomScreen, setOpenShareRoomScreen] = useState(false);

  return (
    <>
      {/* Your main content */}
      <div className={classes.container}>
        <button
          className={classes.button}
          onClick={() => setOpenShareRoomScreen(true)}
        >
          Share Room
        </button>
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
