import "./App.css";
import Home from "./layouts/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import ProductosContainer from "./components/ProductosContainer";
import Carrito from "./components/Carrito";
import About from "./components/About";
import Contacto from "./components/Contacto";
import ProductoDetalle from "./components/ProductoDetalle";
import Admin from "./components/Admin";
// import Login2 from "./components/Login2";
import LoginBoost from "./components/LoginBoost";
import FormularioProducto from "./components/FormularioProducto";
import FormularioEdicion from "./components/FormularioEdicion";
import { useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";

function App() {

  const { verificacionLog } = useAuthContext();

  useEffect(() => {
    // Verifica el estado de autenticación del usuario al cargar la aplicación
    verificacionLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login2 />} /> */}
          <Route path="/login" element={<LoginBoost />} />
          <Route path="/productos" element={<ProductosContainer />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/agregarProductos"
            element={<FormularioProducto />}
          />
          <Route
            path="/admin/editarProducto/:id"
            element={<FormularioEdicion />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
