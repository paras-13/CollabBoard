import { createContext } from "react";
const boardContext = createContext({
  activeToolItem: null,
  elements: [],
  history: [[]],
  index: 0,
  toolActionType: "",
  backgroundColor: "#ffffff", // default white
  setBackgroundColor: () => {},
  changeToolHandler: () => {},
  boardMouseDownHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
  textAreaBlurHandler: () => {},
  boardImageUploadHandler: () => {},
  undo: () => {},
  redo: () => {},
  clear: () => {},
});
export default boardContext;
