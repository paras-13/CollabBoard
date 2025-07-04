// import React from "react";
// import classes from "./index.module.css";
// import { useState } from "react";
// import ShareRoom from "./shareRoom";
// const Room = () => {
//   const [openShareRoomScreen, setOpenShareRoomScreen] = useState(false);
//   const handleShareRoomClick = () => {
//     console.log("share room button clicked");
//     setOpenShareRoomScreen(true);
//   };
//   return (
//     <>
//       <div className={classes.container}>
//         <button className={classes.button} onClick={handleShareRoomClick}>
//           Share Room
//         </button>
//         <button className={classes.button}>Join Room</button>
//       </div>
//       {openShareRoomScreen && (
//         <div className={classes.shareRoomScreen}>
//           <ShareRoom />
//         </div>
//       )}
//     </>
//   );
// };
// export default Room;

import React, { useState } from "react";
import classes from "./index.module.css";
import ShareRoom from "./shareRoom";

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
