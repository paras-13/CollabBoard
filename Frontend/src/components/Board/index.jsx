import { useEffect, useRef, useContext, useLayoutEffect } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../utils/constants";
import toolboxContext from "../../store/toolbox-context";
import cx from "classnames";
import classes from "./index.module.css";
function Board() {
  const canvasRef = useRef();
  const { toolboxState } = useContext(toolboxContext);
  const {
    elements,
    activeToolItem,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  } = useContext(boardContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);
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
        default:
          throw new Error("Type not recognized");
      }
    });
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);
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
