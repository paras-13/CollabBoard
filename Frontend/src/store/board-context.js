import { createContext } from "react";
const boardContext = createContext({
  activeToolItem: null,
  elements: [],
  toolActionType: "",
  changeToolHandler: () => {},
  boardMouseDownHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
});
export default boardContext;
