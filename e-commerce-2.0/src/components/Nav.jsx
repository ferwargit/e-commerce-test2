// src/components/Nav.jsx

import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { useProductosContext } from "../context/ProductosContext";
import { StyledInput } from "./StyledFormElements";

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
  const { terminoBusqueda, setTerminoBusqueda } = useProductosContext();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = productosCarrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // Estilo para el NavLink que está activo
  const activeLinkStyle = {
    color: "var(--color-primary)",
  };

  const handleBusquedaChange = (e) => {
    const nuevoTermino = e.target.value;
    setTerminoBusqueda(nuevoTermino);
    if (location.pathname !== "/productos" && nuevoTermino) {
      navigate("/productos");
    }
  };

  // --- SEPARANDO LA LÓGICA DE RENDERIZADO PARA MAYOR CLARIDAD ---

  const renderAdminNav = () => (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/"
          >
            <BsFillHouseDoorFill className="me-2" />
            Inicio
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/productos"
          >
            <BsBoxSeamFill className="me-2" />
            Productos
          </NavLink>
        </li>
      </ul>
      <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-3 mt-lg-0">
        <form
          className="d-flex"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <StyledInput
            type="search"
            placeholder="Buscar productos..."
            value={terminoBusqueda}
            onChange={handleBusquedaChange}
          />
        </form>
        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle text-white"
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
                <RiAdminFill className="me-1" />
                Panel
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/admin/agregarProductos">
                <RiAddBoxFill className="me-1" />
                Agregar Producto
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="/" onClick={logout}>
                <RiLoginBoxLine className="me-1" />
                Cerrar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );

  const renderClientNav = () => (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/"
          >
            <BsFillHouseDoorFill className="me-2" />
            Inicio
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/productos"
          >
            <BsBoxSeamFill className="me-2" />
            Productos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/nosotros"
          >
            <BsFillInfoCircleFill className="me-2" />
            Nosotros
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            to="/contacto"
          >
            <BsFillTelephoneFill className="me-2" />
            Contacto
          </NavLink>
        </li>
      </ul>
      <hr
        className="d-lg-none"
        style={{ borderColor: "var(--color-border)" }}
      />
      <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-3 mt-lg-0">
        <form
          className="d-flex w-100 w-lg-auto"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <StyledInput
            type="search"
            placeholder="Buscar productos..."
            value={terminoBusqueda}
            onChange={handleBusquedaChange}
          />
        </form>
        <ul className="navbar-nav d-flex flex-row justify-content-between w-100 w-lg-auto pt-3 pt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="/carrito">
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="badge bg-primary ms-1">{totalItems}</span>
              )}
            </NavLink>
          </li>
          {user ? (
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
                    <RiLoginBoxLine className="me-1" />
                    Cerrar Sesión
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                <RiLoginBoxLine className="me-1" />
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );

  const getNavContent = () => {
    if (admin) return renderAdminNav();
    if (location.pathname.startsWith("/admin")) return null;
    return renderClientNav();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TechStore
        </Link>
        {!location.pathname.startsWith("/admin/login") && (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navContent"
            aria-controls="navContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}
        <div className="collapse navbar-collapse" id="navContent">
          {getNavContent()}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
