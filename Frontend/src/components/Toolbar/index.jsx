import React from "react";
import { useContext } from "react";
import classes from "./index.module.css";
import cx from "classnames";
import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
  FaEraser,
  FaFont,
  FaUndo,
  FaRedo,
  FaDownload,
  FaImages,
} from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { PiCursorFill } from "react-icons/pi";
import { TOOL_ITEMS } from "../../utils/constants";
import boardContext from "../../store/board-context";
const ToolBar = () => {
  const {
    activeToolItem,
    changeToolHandler,
    undo,
    redo,
    clear,
    boardImageUploadHandler,
  } = useContext(boardContext);
  const handleClear = () => {
    changeToolHandler(TOOL_ITEMS.CLEAR);
    clear();
  };

  const handleDownloadClick = () => {
    const canvas = document.getElementById("canvas");
    const data = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = data;
    anchor.download = "board.png";
    anchor.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const src = URL.createObjectURL(file);
    boardImageUploadHandler(src);
  };

  const handleImageUploadClick = () => {
    document.getElementById("upload").click();
    changeToolHandler(TOOL_ITEMS.IMAGE);
  };
  return (
    <>
      <div className={classes.container}>
        {/* <div className={classes.toolItem}>
          <PiCursorFill />
        </div> */}
        <div
          className={cx(classes.toolItem, {
            [classes.active]: activeToolItem === TOOL_ITEMS.BRUSH,
          })}
          onClick={() => changeToolHandler(TOOL_ITEMS.BRUSH)}
        >
          <FaPaintBrush />
        </div>
        <div
          className={cx(classes.toolItem, {
            [classes.active]: activeToolItem === TOOL_ITEMS.LINE,
          })}
          onClick={() => changeToolHandler(TOOL_ITEMS.LINE)}
        >
          <FaSlash />
        </div>
        <div
          className={cx(classes.toolItem, {
            [classes.active]: activeToolItem === TOOL_ITEMS.RECTANGLE,
          })}
          onClick={() => changeToolHandler(TOOL_ITEMS.RECTANGLE)}
        >
          <LuRectangleHorizontal />
        </div>
        <div
          className={cx(classes.toolItem, {
            [classes.active]: activeToolItem === TOOL_ITEMS.CIRCLE,
          })}
          onClick={() => changeToolHandler(TOOL_ITEMS.CIRCLE)}
        >
          <FaRegCircle />
        </div>
        <div
          className={cx(classes.toolItem, {
            [classes.active]: activeToolItem === TOOL_ITEMS.ARROW,
          })}
          onClick={() => changeToolHandler(TOOL_ITEMS.ARROW)}
        >
          <FaArrowRight />
        </div>
        <div
          className={cx(classes.toolItem, {
            [classes.active]: activeToolItem === TOOL_ITEMS.ERASER,
          })}
          onClick={() => changeToolHandler(TOOL_ITEMS.ERASER)}
        >
          <FaEraser />
        </div>
        <div
          className={cx(classes.toolItem, {
            [classes.active]: activeToolItem === TOOL_ITEMS.TEXT,
          })}
          onClick={() => changeToolHandler(TOOL_ITEMS.TEXT)}
        >
          <FaFont />
        </div>
        <div className={classes.toolItem} onClick={handleImageUploadClick}>
          <input
            id="upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <FaImages />
        </div>
      </div>
      <div className={classes.bottomLeftContainer}>
        <div className={classes.toolItem} onClick={undo}>
          <FaUndo />
        </div>
        <div className={classes.toolItem} onClick={redo}>
          <FaRedo />
        </div>
      </div>
      <div className={classes.bottomRightContainer}>
        <div className={classes.toolItem} onClick={handleClear}>
          <MdDelete />
        </div>
        <div className={classes.toolItem} onClick={handleDownloadClick}>
          <FaDownload />
        </div>
      </div>
    </>
  );
};

export default ToolBar;
