import React from "react";
import classes from "./index.module.css";
import { FaLink } from "react-icons/fa6";
import { IoMdArrowDropdownCircle } from "react-icons/io";
const ShareRoom = ({ setOpenShareRoomScreen }) => {
  return (
    <>
      {
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
                  {" "}
                  <IoMdArrowDropdownCircle />
                  Start Session
                </button>
              </div>
              <div className={classes.lineDivision}>
                <hr className={classes.line} />
                <span style={{ margin: "0 4px" }}>Or</span>{" "}
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
                >
                  {" "}
                  <FaLink />
                  Export to Link
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ShareRoom;
