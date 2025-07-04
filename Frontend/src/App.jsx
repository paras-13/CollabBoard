import Board from "./components/Board";
import ToolBar from "./components/Toolbar";
import Toolbox from "./components/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";
import Room from "./components/Room";
import api from "./api";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/greet/hello");
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
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
