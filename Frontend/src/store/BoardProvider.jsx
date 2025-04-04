import React from "react";
import { useReducer } from "react";
import boardContext from "./board-context";
import getStroke from "perfect-freehand";
import {
  BOARD_ACTIONS,
  TOOL_ACTION_TYPES,
  TOOL_ITEMS,
} from "../utils/constants";
import { createElement, getSvgPathFromStroke } from "../utils/elements";
import { isPointNearElement } from "../utils/maths";
const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_ACTIONS.CHANGE_TOOL: {
      return { ...state, activeToolItem: action.payload.tool };
    }
    case BOARD_ACTIONS.DRAW_DOWN: {
      const { clientX, clientY, stroke, fill, size } = action.payload;
      const newElement = createElement(
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
        toolActionType:
          state.activeToolItem === TOOL_ITEMS.TEXT
            ? TOOL_ACTION_TYPES.WRITING
            : TOOL_ACTION_TYPES.DRAWING,
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
          const newElement = createElement(index, x1, y1, clientX, clientY, {
            type: state.activeToolItem,
            stroke,
            fill,
            size,
          });
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
      let oldRange = newElements.length;

      newElements = newElements.filter(
        (ele) => !isPointNearElement(ele, clientX, clientY)
      );
      if (newElements.length !== oldRange) {
        const newHistory = [
          ...state.history.slice(0, state.index + 1),
          newElements,
        ];
        return {
          ...state,
          elements: newElements,
          history: newHistory,
          index: newHistory.length - 1,
        };
      }

      return state;
    }

    case BOARD_ACTIONS.CHANGE_ACTION_TYPE: {
      return { ...state, toolActionType: action.payload.actionType };
    }
    case BOARD_ACTIONS.CHANGE_TEXT: {
      const index = state.elements.length - 1;
      const newElement = [...state.elements];
      newElement[index].text = action.payload.text;
      const newHistory = state.history.slice(0, state.index + 1);
      newHistory.push(newElement);
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.NONE,
        elements: newElement,
        history: newHistory,
        index: state.index + 1,
      };
    }
    case BOARD_ACTIONS.DRAW_UP: {
      const elementsCopy = [...state.elements];
      const newHistory = state.history.slice(0, state.index + 1);
      newHistory.push(elementsCopy);
      return {
        ...state,
        history: newHistory,
        index: state.index + 1,
      };
    }

    case BOARD_ACTIONS.UNDO: {
      if (state.index <= 0) return state;
      return {
        ...state,
        elements: state.history[state.index - 1],
        index: state.index - 1,
      };
    }

    case BOARD_ACTIONS.REDO: {
      if (state.index >= state.history.length - 1) return state;
      return {
        ...state,
        elements: state.history[state.index + 1],
        index: state.index + 1,
      };
    }

    case BOARD_ACTIONS.CLEAR: {
      const newElement = [...state.elements];
      newElement.push({ type: state.activeToolItem });
      const newHistory = [
        ...state.history.slice(0, state.index + 1),
        newElement,
      ];
      return {
        ...state,
        elements: newElement,
        history: newHistory,
        index: state.index + 1,
      };
    }
    default:
      return state;
  }
};

const initialBoardState = {
  activeToolItem: TOOL_ITEMS.BRUSH,
  toolActionType: TOOL_ACTION_TYPES.NONE,
  elements: [],
  history: [[]],
  index: 0,
};
const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );
  // const [activeToolItem, setActiveToolItem] = useState(TOOL_ITEMS.LINE);
  const changeToolHandler = (toolItem) => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_TOOL,
      payload: { tool: toolItem },
    });
  };
  const boardMouseDownHandler = (e, toolboxState) => {
    if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
    if (boardState.activeToolItem === TOOL_ITEMS.CLEAR) return;
    if (boardState.activeToolItem === TOOL_ITEMS.ERASER) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
        payload: {
          actionType: TOOL_ACTION_TYPES.ERASING,
        },
      });
      return;
    }
    const { clientX, clientY } = e;

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
    if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
    if (boardState.activeToolItem === TOOL_ITEMS.CLEAR) return;
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
    if (boardState.toolActionType === TOOL_ACTION_TYPES.WRITING) return;
    if (boardState.activeToolItem === TOOL_ITEMS.CLEAR) return;
    if (boardState.toolActionType === TOOL_ACTION_TYPES.DRAWING) {
      dispatchBoardAction({
        type: BOARD_ACTIONS.DRAW_UP,
      });
    }
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_ACTION_TYPE,
      payload: {
        actionType: TOOL_ACTION_TYPES.NONE,
      },
    });
  };
  const textAreaBlurHandler = (text) => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CHANGE_TEXT,
      payload: {
        text,
      },
    });
  };

  const boardUndoHandler = () => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.UNDO,
    });
  };

  const boardRedoHandler = () => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.REDO,
    });
  };
  const boardClearHandler = () => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.CLEAR,
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
    textAreaBlurHandler,
    undo: boardUndoHandler,
    redo: boardRedoHandler,
    clear: boardClearHandler,
  };
  return (
    <boardContext.Provider value={boardContextValue}>
      {children}
    </boardContext.Provider>
  );
};
export default BoardProvider;
