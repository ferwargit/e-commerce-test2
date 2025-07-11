// src/components/Nav.jsx

import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { useProductosContext } from "../context/ProductosContext";
import { StyledInput } from "./StyledFormElements"; // 1. Importa el componente de input estilizado

import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
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
  const { setTerminoBusqueda } = useProductosContext();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = productosCarrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const activeLinkStyle = {
    color: "var(--color-primary)",
    textDecoration: "underline",
  };

  const handleBusquedaChange = (e) => {
    const nuevoTermino = e.target.value;
    setTerminoBusqueda(nuevoTermino);
    if (location.pathname !== "/productos" && nuevoTermino) {
      navigate("/productos");
    }
  };

  const renderNavContent = () => {
    if (admin) {
      // --- NAVEGACIÓN DE ADMINISTRADOR (SIN CAMBIOS) ---
      return (
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                to="/"
              >
                {" "}
                <BsFillHouseDoorFill /> Inicio{" "}
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
                {" "}
                <BsBoxSeamFill /> Productos{" "}
              </NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <form
              className="d-flex"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <StyledInput
                className="form-control me-2"
                type="search"
                placeholder="Buscar productos..."
                aria-label="Buscar"
                
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                style={{
                  backgroundColor: "var(--color-background-light)",
                  color: "var(--color-text-primary)",
                  borderColor: "var(--color-border)",
                }}
              />
            </form>
            <ul className="navbar-nav d-flex flex-row gap-2 align-items-center">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle className="me-1" /> Administrador
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  <li>
                    <NavLink className="dropdown-item" to="/admin">
                      <RiAdminFill /> Panel
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/agregarProductos"
                    >
                      <RiAddBoxFill /> Agregar Producto
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/" onClick={logout}>
                      <RiLoginBoxLine /> Cerrar Sesión
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    if (location.pathname.startsWith("/admin")) {
      return null;
    }

    // --- NAVEGACIÓN DE CLIENTE ---
    return (
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* ... Enlaces de cliente sin cambios ... */}
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
            <StyledInput
              className="form-control me-2"
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar"
              
              onChange={handleBusquedaChange}
              style={{
                backgroundColor: "var(--color-background-light)",
                color: "var(--color-text-primary)",
                borderColor: "var(--color-border)",
              }}
            />
          </form>
          <ul className="navbar-nav d-flex flex-row gap-2 align-items-center">
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
              // --- INICIO DE LA CORRECCIÓN ---
              // Restauramos el código del dropdown del cliente
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle className="me-1" /> {user.split("@")[0]}
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Mi Perfil
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/" onClick={logout}>
                      <RiLoginBoxLine /> Cerrar Sesión
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              // --- FIN DE LA CORRECCIÓN ---
              <li className="nav-item">
                <NavLink
                  className="nav-link text-white"
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
          TechStore
        </Link>
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
