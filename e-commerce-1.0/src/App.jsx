import "./App.css";
import Nav from "./components/Nav";
import Home from "./layouts/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductosContainer from "./components/ProductosContainer";
import Carrito from "./components/Carrito";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosContainer />} />
          <Route path="/carrito" element={<Carrito productosCarrito={[]} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
