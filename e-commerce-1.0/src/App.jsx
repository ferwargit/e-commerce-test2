import "./App.css";
import Home from "./layouts/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<p>Productos</p>} />
          <Route path="/carrito" element={<p>Carrito</p>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
