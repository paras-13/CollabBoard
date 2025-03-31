import Board from "./components/Board";
import ToolBar from "./components/Toolbar";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/toolboxProvider";

function App() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <Board />
        <ToolBar />
        <Toolbox />
      </ToolboxProvider>
    </BoardProvider>
  );
}
export default App;
