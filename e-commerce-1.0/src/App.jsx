import "./App.css";
import Nav from "./components/Nav";
import Home from "./layouts/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<p>Productos</p>} />
          <Route path="/carrito" element={<p>Carrito</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
