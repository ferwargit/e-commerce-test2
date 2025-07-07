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
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [adminLogeado, setAdminLogeado] = useState(false);

  function manejarAdmin() {
    setAdminLogeado(!adminLogeado);
  }

  function manejarUser() {
    setUsuarioLogeado(!usuarioLogeado);
  }

  return (
    <Router>
      <div>
        <Nav />
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
            element={<Carrito usuarioLogeado={usuarioLogeado} />}
          />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
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
