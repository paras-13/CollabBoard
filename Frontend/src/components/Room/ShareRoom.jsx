import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FaLink } from "react-icons/fa6";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { toast } from "react-toastify";
import roomContext from "../../store/room-context";
import classes from "./index.module.css";
import style from "../../style.module.css";
import socket from "../../socket";
import { ROOM_ACCESS_MODE } from "../../utils/constants";
const ShareRoom = ({ setOpenShareRoomScreen }) => {
  const [openExportLinkModal, setOpenExportLinkModal] = useState(false);
  const [showGeneratedLink, setShowGeneratedLink] = useState(false);
  const { roomId, setRoomId, setMode, setUserInfo } = useContext(roomContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleGenerateSharableLinkClick = () => {
    const code = uuidv4();
    setRoomId(code);
    setShowGeneratedLink(true);
    toast.success("Room Code generated successfully");
  };

  const handleCopyRoomCodeClick = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast.success("Room Code copied successfully");
    }
  };
  const handleCopySharableLinkClick = () => {
    if (roomId) {
      navigator.clipboard.writeText(
        `${import.meta.env.VITE_FRONTEND_URL}/share-whiteboard/${
          ROOM_ACCESS_MODE.CLIENT_MODE
        }/${roomId}`
      );
      toast.success("Sharable URL copied successfully");
    }
  };

  const handleCreateRoomClick = () => {
    if (name && email) {
      if (roomId) {
        setMode(ROOM_ACCESS_MODE.HOST_MODE);
        setOpenShareRoomScreen(false);
        setUserInfo(name, email);
        socket.emit("create-room", { roomId, email });
        navigate(`/share-whiteboard/${ROOM_ACCESS_MODE.HOST_MODE}/${roomId}`);
        toast.success("Created Room");
      }
    } else toast.warning("Name and email are manadatory to fill");
  };

  return (
    <>
      <div className={classes.modalBox}>
        <div className={classes.shareRoomScreen}>
          <button
            className={classes.closeButton}
            onClick={() => setOpenShareRoomScreen(false)}
          >
            x
          </button>
          <p className={classes.head1}>Share Whiteboard</p>
          <div className={classes.innerShareScreen}>
            <div>
              <h3 className={classes.head2}>Live Collaboration</h3>
              <p className={classes.desc}>
                Invite other comrades to collaborate with you in real time
              </p>
              <button
                className={classes.button}
                style={{ display: "flex", gap: 5 }}
              >
                <IoMdArrowDropdownCircle />
                Start Session
              </button>
            </div>

            <div className={classes.lineDivision}>
              <hr className={classes.line} />
              <span style={{ margin: "0 4px" }}>Or</span>
              <hr className={classes.line} />
            </div>

            <div>
              <h3 className={classes.head2}>Sharable Link</h3>
              <p className={classes.desc}>
                Share your whiteboard with other comrades as a read-only link
              </p>
              <button
                className={classes.button}
                style={{ display: "flex", gap: 5 }}
                onClick={() => setOpenExportLinkModal(true)}
              >
                <FaLink />
                Export to Link
              </button>
            </div>
          </div>
        </div>

        {openExportLinkModal && (
          <div className={style.formContainer}>
            <p
              className={style.head}
              style={{ marginTop: "15px", marginRight: "5px" }}
            >
              Share Room with others
            </p>

            <div style={{ display: "flex" }}>
              <input
                value={roomId == null ? "" : roomId}
                readOnly
                className={style.formInputBox}
                placeholder="Generate room code"
              />
              <button
                className={style.smallButton}
                onClick={handleGenerateSharableLinkClick}
              >
                Generate
              </button>
            </div>

            {showGeneratedLink && (
              <form>
                {/* <div className={classes.linkForm}> */}
                <button
                  type="button"
                  className={style.smallButton}
                  onClick={handleCopyRoomCodeClick}
                >
                  Copy
                </button>
                <button
                  type="button"
                  className={style.smallButton}
                  onClick={handleCopySharableLinkClick}
                >
                  Copy Sharable URL
                </button>
                {/* </div> */}

                <div>
                  <label className={style.inputLabel}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={style.formInputBox}
                    required
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
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleCreateRoomClick}
                  className={style.largeButton}
                >
                  Create Room
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ShareRoom;
