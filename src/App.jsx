import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./screens/Home";
import Game from "./screens/Game";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[#2b2a2a]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/game/" element={<Game />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
