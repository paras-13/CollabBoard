import Board from "./components/Board";
import ToolBar from "./components/Toolbar";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";
import Room from "./components/Room";
function App() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <Board />
        <Room />
        <ToolBar />
        <Toolbox />
      </ToolboxProvider>
    </BoardProvider>
  );
}
export default App;
