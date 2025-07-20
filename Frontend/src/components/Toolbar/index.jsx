import React, { useContext, useState, useRef, useEffect } from "react";
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
import { RxDropdownMenu } from "react-icons/rx";
import { TOOL_ITEMS, ROOM_ACCESS_MODE } from "../../utils/constants";
import boardContext from "../../store/board-context";
import roomContext from "../../store/room-context";
const ToolBar = () => {
  const {
    activeToolItem,
    changeToolHandler,
    undo,
    redo,
    clear,
    boardImageUploadHandler,
    setBackgroundColor,
  } = useContext(boardContext);
  const [showBgDropdown, setShowBgDropdown] = useState(false);
  const [customColor, setCustomColor] = useState("#054865");
  const dropdownRef = useRef();
  const { userMode } = useContext(roomContext);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowBgDropdown(false);
      }
    }
    if (showBgDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBgDropdown]);

  // Hide toolbar for client
  if (userMode === ROOM_ACCESS_MODE.CLIENT_MODE) return;
  return (
    <>
      <div
        className={cx(classes.button, classes.dropdown)}
        title="Change Screen Color"
      >
        <button
          onClick={() => setShowBgDropdown((v) => !v)}
          style={{ width: "100%" }}
        >
          Screen Color
        </button>
        {showBgDropdown && (
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              left: 0,
              top: "100%",
              background: "#fff",
              border: "1px solid #ccc",
              zIndex: 10,
              padding: 8,
              borderRadius: 4,
              minWidth: 120,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 5,
                marginBottom: 8,
              }}
            >
              <button
                style={{
                  background: "#ffffff",
                  width: 24,
                  height: 24,
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  setBackgroundColor("#ffffff");
                }}
                title="White"
              />
              <button
                style={{
                  background: "#f8fafc",
                  width: 24,
                  height: 24,
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  setBackgroundColor("#f8fafc");
                }}
                title="Gray"
              />
              <button
                style={{
                  background: "#fef08a",
                  width: 24,
                  height: 24,
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  setBackgroundColor("#fef08a");
                }}
                title="Yellow"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setBackgroundColor(e.target.value);
                }}
                style={{
                  width: 40,
                  height: 24,
                  border: "none",
                  background: "none",
                }}
              />
              <span style={{ fontSize: 12 }}>Custom</span>
            </div>
          </div>
        )}
      </div>
      <div className={classes.container}>
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
        <div className={classes.button} onClick={undo} title="Undo">
          <FaUndo />
        </div>
        <div className={classes.button} onClick={redo} title="Redo">
          <FaRedo />
        </div>
      </div>
      <div className={classes.bottomRightContainer}>
        <div
          className={classes.button}
          onClick={handleClear}
          title="Clear Whiteboard"
        >
          <MdDelete />
        </div>
        <div
          className={classes.button}
          onClick={handleDownloadClick}
          title="Download Page"
        >
          <FaDownload />
        </div>
      </div>
    </>
  );
};

export default ToolBar;
