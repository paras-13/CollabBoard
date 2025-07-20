import { useContext } from "react";
import classes from "./index.module.css";
import cx from "classnames";
import {
  COLORS,
  FILL_TOOL_TYPES,
  SIZE_TOOL_ITEMS,
  STROKE_TOOL_TYPES,
  TOOL_ITEMS,
  ROOM_ACCESS_MODE,
} from "../../utils/constants";
import toolboxContext from "../../store/toolbox-context";
import boardContext from "../../store/board-context";
import roomContext from "../../store/room-context";
const Toolbox = () => {
  const { activeToolItem } = useContext(boardContext);
  const {
    toolboxState,
    changeStrokeHandler,
    changeFillHandler,
    changeSizeHandler,
  } = useContext(toolboxContext);
  const { userMode } = useContext(roomContext);
  if (userMode === ROOM_ACCESS_MODE.CLIENT_MODE) return;

  const strokeColor = toolboxState[activeToolItem]?.stroke;
  const fillColor = toolboxState[activeToolItem]?.fill;
  const size = toolboxState[activeToolItem]?.size;
  return (
    <div className={classes.container}>
      {STROKE_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Stroke Color</div>
          <div className={classes.colorsContainer}>
            <div>
              <input
                type="color"
                className={classes.colorPicker}
                value={strokeColor}
                onChange={(e) =>
                  changeStrokeHandler(activeToolItem, e.target.value)
                }
              />
            </div>
            {Object.keys(COLORS).map((key) => {
              // console.log(COLORS[key]);
              return (
                <div
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: strokeColor === COLORS[key],
                  })}
                  style={{ backgroundColor: COLORS[key] }}
                  key={key}
                  onClick={() =>
                    changeStrokeHandler(activeToolItem, COLORS[key])
                  }
                ></div>
              );
            })}
          </div>
        </div>
      )}
      {FILL_TOOL_TYPES.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Fill Color</div>
          <div className={classes.colorsContainer}>
            {fillColor === null ? (
              <div
                className={cx(classes.colorPicker, classes.noFillColorBox)}
                onClick={() => changeFillHandler(activeToolItem, COLORS.BLACK)}
              ></div>
            ) : (
              <div>
                <input
                  type="color"
                  className={classes.colorPicker}
                  value={fillColor}
                  onChange={(e) =>
                    changeFillHandler(activeToolItem, e.target.value)
                  }
                />
              </div>
            )}
            <div
              className={cx(classes.colorBox, classes.noFillColorBox, {
                [classes.activeColorBox]: fillColor === null,
              })}
              onClick={() => {
                changeFillHandler(activeToolItem, null);
              }}
            ></div>
            {Object.keys(COLORS).map((key) => {
              // console.log(COLORS[key]);
              return (
                <div
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: fillColor === COLORS[key],
                  })}
                  style={{ backgroundColor: COLORS[key] }}
                  key={key}
                  onClick={() => changeFillHandler(activeToolItem, COLORS[key])}
                ></div>
              );
            })}
          </div>
        </div>
      )}
      {SIZE_TOOL_ITEMS.includes(activeToolItem) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Stroke Size -- {size}</div>
          <input
            type="range"
            min={activeToolItem === TOOL_ITEMS.TEXT ? 12 : 1}
            max={activeToolItem === TOOL_ITEMS.TEXT ? 64 : 20}
            step={1}
            value={size}
            onChange={(e) => changeSizeHandler(activeToolItem, e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Toolbox;
