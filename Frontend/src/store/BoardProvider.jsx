import React from "react";
import { useReducer } from "react";
import boardContext from "./board-context";
import getStroke from "perfect-freehand";
import {
  BOARD_ACTIONS,
  TOOL_ACTION_TYPES,
  TOOL_ITEMS,
} from "../utils/constants";
import { createRoughElement, getSvgPathFromStroke } from "../utils/elements";
import { isPointNearElement } from "../utils/maths";
const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_ACTIONS.CHANGE_TOOL: {
      return { ...state, activeToolItem: action.payload.tool };
    }
    case BOARD_ACTIONS.DRAW_DOWN: {
      const { clientX, clientY, stroke, fill, size } = action.payload;
      const newElement = createRoughElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeToolItem, stroke, fill, size }
      );
      const prevElements = state.elements;
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.DRAWING,
        elements: [...prevElements, newElement],
      };
    }
    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX, clientY } = action.payload;
      const updateElement = [...state.elements];
      const index = state.elements.length - 1;
      const { type } = updateElement[index];
      switch (type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW: {
          const { x1, y1, stroke, fill, size } = updateElement[index];
          const newElement = createRoughElement(
            index,
            x1,
            y1,
            clientX,
            clientY,
            {
              type: state.activeToolItem,
              stroke,
              fill,
              size,
            }
          );
          updateElement[index] = newElement;
          return { ...state, elements: updateElement };
        }
        case TOOL_ITEMS.BRUSH:
          updateElement[index].points = [
            ...updateElement[index].points,
            { x: clientX, y: clientY },
          ];
          updateElement[index].path = new Path2D(
            getSvgPathFromStroke(
              getStroke(updateElement[index].points, {
                size: updateElement[index].size,
                thinning: 0,
              })
            )
          );
          return {
            ...state,
            elements: updateElement,
          };
        default:
          throw new Error("Type not recognized");
      }
    }

    case BOARD_ACTIONS.ERASE: {
      const { clientX, clientY } = action.payload;
      let newElements = [...state.elements];
      newElements = newElements.filter((ele) => {
        return !isPointNearElement(ele, clientX, clientY);
      });
      return { ...state, elements: newElements };
    }

    case BOARD_ACTIONS.CHANGE_ACTION_TYPE: {
      return { ...state, toolActionType: action.payload.actionType };
    }
    default:
      return state;
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.BRUSH,
  elements: [],
  toolActionType: TOOL_ACTION_TYPES.NONE,
};
const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );
  // const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);
  const changeToolHandler = (toolItem) => {
    dispatchBoardAction({ type: "CHANGE_TOOL", payload: { tool: toolItem } });
  };
  const boardMouseDownHandler = (e, toolboxState) => {
    const { clientX, clientY } = e;
    if (boardState.activeToolItem === TOOL_ITEMS.ERASER) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
        payload: {
          actionType: TOOL_ACTION_TYPES.ERASING,
        },
      });
      return;
    }

    dispatchBoardAction({
      type: "DRAW_DOWN",
      payload: {
        clientX,
        clientY,
        stroke: toolboxState[boardState.activeToolItem]?.stroke,
        fill: toolboxState[boardState.activeToolItem]?.fill,
        size: toolboxState[boardState.activeToolItem]?.size,
      },
    });
  };
  const boardMouseMoveHandler = (e) => {
    const { clientX, clientY } = e;
    if (boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING)
      dispatchBoardAction({ type: "DRAW_MOVE", payload: { clientX, clientY } });
    else if (boardState.toolActionType === TOOL_ACTION_TYPES.ERASING) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.ERASE,
        payload: {
          clientX,
          clientY,
        },
      });
    }
  };
  const boardMouseUpHandler = () => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
      payload: {
        actionType: TOOL_ACTION_TYPES.NONE,
      },
    });
  };
  const boardContextValue = {
    activeToolItem: boardState.activeToolItem,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  };
  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};
export default BoardProvider;
