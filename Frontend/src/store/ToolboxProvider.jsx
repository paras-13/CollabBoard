import React, { useReducer } from "react";
import toolboxContext from "./toolbox-context";
import { COLORS, TOOL_ITEMS, TOOLBOX_ACTIONS } from "../utils/constants";

const toolboxReducer = (state, action) => {
  switch (action.type) {
    case TOOLBOX_ACTIONS.CHANGE_STROKE: {
      const { tool, stroke } = action.payload;
      const newState = { ...state };
      newState[tool].stroke = stroke;
      return newState;
    }
    case TOOLBOX_ACTIONS.CHANGE_FILL: {
      const { tool, fill } = action.payload;
      const newState = { ...state };
      newState[tool].fill = fill;
      return newState;
    }
    case TOOLBOX_ACTIONS.CHANGE_SIZE: {
      const { tool, size } = action.payload;
      const newState = { ...state };
      newState[tool].size = size;
      return newState;
    }
    default:
      return state;
  }
};
const initialToolboxState = {
  [TOOL_ITEMS.LINE]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.RECTANGLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.CIRCLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.ARROW]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.BRUSH]: {
    stroke: COLORS.BLACK,
    size: 2,
  },
  [TOOL_ITEMS.TEXT]: {
    stroke: COLORS.BLACK,
    size: 16,
  },
};
const ToolboxProvider = ({ children }) => {
  const [toolboxState, dispatchToolboxAction] = useReducer(
    toolboxReducer,
    initialToolboxState
  );
  const changeStrokeHandler = (tool, stroke) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_STROKE,
      payload: {
        tool,
        stroke,
      },
    });
  };
  const changeFillHandler = (tool, fill) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_FILL,
      payload: { tool, fill },
    });
  };
  const changeSizeHandler = (tool, size) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_SIZE,
      payload: { tool, size },
    });
  };
  const toolboxContextValue = {
    toolboxState,
    changeStrokeHandler,
    changeFillHandler,
    changeSizeHandler,
  };
  return (
    <toolboxContext.Provider value={toolboxContextValue}>
      {children}
    </toolboxContext.Provider>
  );
};
export default ToolboxProvider;
