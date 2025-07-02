import React from "react";
import classes from "./index.module.css";
const Room = () => {
  return (
    <>
      <div className={classes.container}>
        <button className={classes.shareButton}>Share</button>
        <button className={classes.joinButton}>Join</button>
      </div>
    </>
  );
};

export default Room;
