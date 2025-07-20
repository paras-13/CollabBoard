import React, { useContext, useState } from "react";
import classes from "./index.module.css";
import style from "../../style.module.css";
import roomContext from "../../store/room-context";
import { toast } from "react-toastify";
import socket from "../../socket";
const JoinRoomForm = ({ setviewJoinFormModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { userMode, roomId, setUserInfo } = useContext(roomContext);
  const handleJoinRoomButtonClick = () => {
    setUserInfo(name, email);

    // socket
    socket.emit("join-room", {
      roomId,
      userMode,
      userName: name,
      userId: email,
      key: 0,
    });
    setviewJoinFormModal(false);
    toast.success("Joined Room");
  };
  return (
    <div className={classes.backdrop}>
      <form className={style.formContainer}>
        <h2 className={style.head}>Join Room</h2>

        <div>
          <label className={style.inputLabel}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={style.formInputBox}
          />
        </div>

        <div>
          <label className={style.inputLabel}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={style.formInputBox}
          />
        </div>

        <button
          type="button"
          onClick={handleJoinRoomButtonClick}
          className={style.largeButton}
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default JoinRoomForm;
