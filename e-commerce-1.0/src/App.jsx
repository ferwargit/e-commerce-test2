import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductosContainer from "./components/ProductosContainer";
import Home from "./layouts/Home";
import Nav from "./components/Nav";
import Carrito from "./components/Carrito";
import About from "./components/About";
import Contacto from "./components/Contacto";
import "./App.css";

function App() {
  const [productosCarrito, setProductosCarrito] = useState([]);

  function funcionCarrito(producto) {
    const existe = productosCarrito.find((p) => p.id === producto.id);
    console.log(existe);
    if (existe) {
      const carritoActualizado = productosCarrito.map((p) => {
        if (p.id === producto.id) {
          const productoActualizado = {
            ...p,
            cantidad: p.cantidad + producto.cantidad,
          };
          return productoActualizado;
        } else {
          return p;
        }
      });
      setProductosCarrito(carritoActualizado);
    } else {
      const nuevoCarrito = [...productosCarrito, producto];
      setProductosCarrito(nuevoCarrito);
    }
  }

  function borrarProductoCarrito(id) {
    console.log("Borrando producto con id:", id);
    const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
    setProductosCarrito(nuevoCarrito);
    console.log("Carrito actualizado:", nuevoCarrito);
  }

  return (
    <Router>
      <div>
        <Nav productosCarrito={productosCarrito} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/productos"
            element={<ProductosContainer functionCarrito={funcionCarrito} />}
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                productosCarrito={productosCarrito}
                funcionBorrar={borrarProductoCarrito}
              />
            }
          />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
