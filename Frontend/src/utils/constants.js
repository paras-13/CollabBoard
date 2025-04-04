export const TOOL_ITEMS = {
  LINE: "LINE",
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
  ARROW: "ARROW",
  BRUSH: "BRUSH",
  ERASER: "ERASER",
  TEXT: "TEXT",
  UNDO: "UNDO",
  REDO: "REDO",
  CLEAR: "CLEAR",
};

export const BOARD_ACTIONS = {
  CHANGE_TOOL: "CHANGE_TOOL",
  DRAW_DOWN: "DRAW_DOWN",
  DRAW_MOVE: "DRAW_MOVE",
  DRAW_UP: "DRAW_UP",
  ERASE: "ERASE",
  CHANGE_ACTION_TYPE: "CHANGE_ACTION_TYPE",
  CHANGE_TEXT: "CHANGE_TEXT",
  UNDO: "UNDO",
  REDO: "REDO",
  CLEAR: "CLEAR",
};

export const TOOLBOX_ACTIONS = {
  CHANGE_STROKE: "CHANGE_STROKE",
  CHANGE_FILL: "CHANGE_FILL",
  CHANGE_SIZE: "CHANGE_SIZE",
};

export const FILL_TOOL_TYPES = [TOOL_ITEMS.RECTANGLE, TOOL_ITEMS.CIRCLE];
export const STROKE_TOOL_TYPES = [
  TOOL_ITEMS.LINE,
  TOOL_ITEMS.RECTANGLE,
  TOOL_ITEMS.CIRCLE,
  TOOL_ITEMS.ARROW,
  TOOL_ITEMS.BRUSH,
  TOOL_ITEMS.TEXT,
];
export const SIZE_TOOL_ITEMS = [
  TOOL_ITEMS.LINE,
  TOOL_ITEMS.ARROW,
  TOOL_ITEMS.RECTANGLE,
  TOOL_ITEMS.CIRCLE,
  TOOL_ITEMS.BRUSH,
  TOOL_ITEMS.TEXT,
];
export const TOOL_ACTION_TYPES = {
  NONE: "NONE",
  DRAWING: "DRAWING",
  ERASING: "ERASING",
  WRITING: "WRITING",
};

export const COLORS = {
  BLACK: "#000000",
  BURGUNDY: "#8D021F",
  SEA: "#2E8B57",
  YALE: "#0E4C92",
  GOLD: "#F9A602",
  PURPLE: "#800080",
};
export const ARROW_LENGTH = 10;
export const ELEMENT_ERASE_THRESHOLD = 0.1;
