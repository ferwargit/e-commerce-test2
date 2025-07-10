// src/components/Nav.jsx

import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { useProductosContext } from "../context/ProductosContext";

// Importa los iconos
import { FaShoppingCart } from "react-icons/fa";
import { RiAdminFill, RiLoginBoxLine, RiAddBoxFill } from "react-icons/ri";
import {
  BsBoxSeamFill,
  BsFillHouseDoorFill,
  BsFillInfoCircleFill,
  BsFillTelephoneFill,
} from "react-icons/bs";

function Nav() {
  const { productosCarrito } = useContext(CarritoContext);
  const { user, admin, logout } = useAuthContext();
  const { setTerminoBusqueda, terminoBusqueda } = useProductosContext();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = productosCarrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const activeLinkStyle = {
    color: "#0d6efd",
    textDecoration: "underline",
  };

  const handleBusquedaChange = (e) => {
    const nuevoTermino = e.target.value;
    setTerminoBusqueda(nuevoTermino);
    if (location.pathname !== "/productos" && nuevoTermino) {
      navigate("/productos");
    }
  };

  // --- Lógica de Renderizado Principal ---
  const renderNavContent = () => {
    // CASO 1: Admin está logueado
    if (admin) {
      return (
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Enlaces comunes del sitio */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                to="/"
              >
                <BsFillHouseDoorFill /> Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                to="/productos"
              >
                <BsBoxSeamFill /> Productos
              </NavLink>
            </li>
          </ul>

          {/* --- INICIO DEL CAMBIO --- */}
          {/* Agrupamos la búsqueda y las acciones del admin */}
          <div className="d-flex align-items-center">
            {/* Formulario de Búsqueda para Admin */}
            <form
              className="d-flex"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar en admin..."
                aria-label="Buscar"
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)} // Búsqueda simple, sin redirigir
              />
            </form>

            <ul className="navbar-nav ms-auto">
              {/* Enlaces de herramientas de Admin */}
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                  to="/admin"
                >
                  <RiAdminFill /> Panel
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                  to="/admin/agregarProductos"
                >
                  <RiAddBoxFill /> Agregar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={logout}>
                  <RiLoginBoxLine /> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    // CASO 2: Usuario está en la página de login de admin (pero no logueado)
    if (location.pathname.startsWith("/admin")) {
      return null; // No muestra nada más que el logo
    }

    // CASO 3: Navegación normal del cliente
    return (
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              to="/"
            >
              <BsFillHouseDoorFill /> Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              to="/productos"
            >
              <BsBoxSeamFill /> Productos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              to="/nosotros"
            >
              <BsFillInfoCircleFill /> Nosotros
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
              to="/contacto"
            >
              <BsFillTelephoneFill /> Contacto
            </NavLink>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar"
              value={terminoBusqueda}
              onChange={handleBusquedaChange}
            />
          </form>
          <ul className="navbar-nav d-flex flex-row gap-2">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                to="/carrito"
              >
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="badge bg-primary ms-1">{totalItems}</span>
                )}
              </NavLink>
            </li>
            {user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={logout}>
                  <RiLoginBoxLine /> Logout
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  style={({ isActive }) =>
                    isActive ? activeLinkStyle : undefined
                  }
                  to="/login"
                >
                  <RiLoginBoxLine /> Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mi Tienda
        </Link>
        {/* El botón hamburguesa necesita estar fuera de la lógica condicional para que funcione en admin logueado */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {renderNavContent()}
      </div>
    </nav>
  );
}

export default Nav;
