import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import api from "./api";
import Whiteboard from "./components/Whiteboard";

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
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/whiteboard" replace />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="/share-whiteboard/:mode/:room" element={<Whiteboard />} />
      </Routes>
    </Router>
  );
}
export default App;
