// src/components/Nav.jsx

import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";

// Importa todos los iconos que necesitarás
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
  const location = useLocation();

  // Variable para saber si estamos en una sección de admin (logueado o no)
  const isCargandoPaginaAdmin = location.pathname.startsWith("/admin");

  // Calcula el número total de ítems en el carrito (sumando cantidades)
  const totalItems = productosCarrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  // Estilo para el NavLink que está activo
  const activeLinkStyle = {
    color: "#0d6efd", // Un color azul de Bootstrap para destacar
    textDecoration: "underline",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Mi Tienda
        </Link>

        {/* Botón de hamburguesa para móviles */}
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

        {/* Contenedor de los enlaces que se colapsará en móviles */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Enlaces principales alineados a la izquierda */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                to="/nosotros"
              >
                <BsFillInfoCircleFill /> Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                to="/contacto"
              >
                <BsFillTelephoneFill /> Contacto
              </NavLink>
            </li>
          </ul>

          {/* Enlaces de acción alineados a la derecha */}
          <ul className="navbar-nav">
            {/* 1. Muestra el Carrito solo si NO es admin Y NO estamos en una página de admin */}
            {!admin && !isCargandoPaginaAdmin && (
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
            )}

            {/* 2. Muestra los enlaces de Admin solo si el admin ESTÁ logueado */}
            {admin && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                    to="/admin"
                  >
                    <RiAdminFill /> Admin Panel
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
                    <RiAddBoxFill /> Agregar Productos
                  </NavLink>
                </li>
              </>
            )}

            {/* 3. Lógica para el botón de Login/Logout */}

            {/* Muestra el botón de "Login" solo si NO estamos en una página de admin y NADIE está logueado */}
            {!isCargandoPaginaAdmin && !user && !admin && (
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

            {/* Muestra el botón de "Logout" si CUALQUIERA (user o admin) está logueado */}
            {(user || admin) && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={logout}>
                  <RiLoginBoxLine /> Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
