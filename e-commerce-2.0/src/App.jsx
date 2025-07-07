import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProductosContainer from "./components/ProductosContainer";
import Home from "./layouts/Home";
import Nav from "./components/Nav";
import Carrito from "./components/Carrito";
import About from "./components/About";
import Contacto from "./components/Contacto";
import ProductoDetalle from "./components/ProductoDetalle";
import Login from "./components/Login";
import Admin from "./components/Admin";
import "./App.css";

function App() {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [adminLogeado, setAdminLogeado] = useState(false);

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

  function manejarAdmin() {
    setAdminLogeado(!adminLogeado);
  }

  function manejarUser() {
    setUsuarioLogeado(!usuarioLogeado);
  }

  return (
    <Router>
      <div>
        <Nav productosCarrito={productosCarrito} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                user={usuarioLogeado}
                admin={adminLogeado}
                setLogeadoAdmin={manejarAdmin}
                setLogeadoUser={manejarUser}
              />
            }
          />
          <Route path="/productos" element={<ProductosContainer />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                productosCarrito={productosCarrito}
                funcionBorrar={borrarProductoCarrito}
                usuarioLogeado={usuarioLogeado}
              />
            }
          />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/productos/:id"
            element={<ProductoDetalle funcionCarrito={funcionCarrito} />}
          />
          <Route
            path="/admin"
            element={
              adminLogeado ? <Admin /> : <Navigate to={"/login"} replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
