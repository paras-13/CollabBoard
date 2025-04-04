import { useEffect, useRef, useContext, useLayoutEffect } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../utils/constants";
import toolboxContext from "../../store/toolbox-context";
import cx from "classnames";
import classes from "./index.module.css";
function Board() {
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const { toolboxState } = useContext(toolboxContext);
  const {
    elements,
    activeToolItem,
    toolActionType,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    undo,
    redo,
  } = useContext(boardContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  // Key shortcut
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key === "z") undo();
      else if (e.ctrlKey && e.key === "y") redo();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);
  useLayoutEffect(() => {
    // console.log("Redrawing Canvas");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.ARROW:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.LINE:
          roughCanvas.draw(element.roughElement);
          break;
        case TOOL_ITEMS.BRUSH:
          context.fillStyle = element.stroke;
          context.fill(element.path);
          context.restore();
          break;
        case TOOL_ITEMS.TEXT:
          context.textBaseLine = "top";
          context.font = `${element.size}px Merienda`;
          context.fillStyle = element.stroke;
          context.fillText(element.text, element.x1, element.y1);
          context.restore();
          break;
        case TOOL_ITEMS.CLEAR:
          context.clearRect(0, 0, canvas.width, canvas.height);
          break;
        default:
          throw new Error("Type not recognized");
      }
    });
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (toolActionType === TOOL_ACTION_TYPES.WRITING) {
      setTimeout(() => {
        textArea.focus();
      }, 0);
    }
  }, [toolActionType]);

  const handleMouseDown = (e) => {
    boardMouseDownHandler(e, toolboxState);
  };
  const handleMouseMove = (e) => {
    boardMouseMoveHandler(e);
  };
  const handleMouseUp = () => {
    boardMouseUpHandler();
  };
  return (
    <>
      {toolActionType === TOOL_ACTION_TYPES.WRITING && (
        <textarea
          type="text"
          ref={textAreaRef}
          className={classes.textElementBox}
          placeholder="Enter text:"
          style={{
            top: elements[elements.length - 1].y1,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1]?.size}px`,
            color: elements[elements.length - 1]?.stroke,
          }}
          onBlur={(e) => textAreaBlurHandler(e.target.value)}
        />
      )}
      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={cx({
          [classes.brushIcon]: activeToolItem === TOOL_ITEMS.BRUSH,
          [classes.shapeIcon]:
            activeToolItem === TOOL_ITEMS.CIRCLE ||
            activeToolItem === TOOL_ITEMS.RECTANGLE ||
            activeToolItem === TOOL_ITEMS.ARROW,
          [classes.eraseIcon]: activeToolItem === TOOL_ITEMS.ERASER,
        })}
      ></canvas>
    </>
  );
}
export default Board;
