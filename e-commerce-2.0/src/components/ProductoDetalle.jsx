import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "../styles/ProductoDetalle.css"; // Ya no necesitaremos este archivo
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { useProductosContext } from "../context/ProductosContext";
import { StyledButton, StyledLinkButton } from "./Button";

function ProductoDetalle() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } =
    useProductosContext();
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((err) => {
        setError(err.message || "Hubo un error al obtener el producto.");
        setCargando(false);
      });
  }, [id, obtenerProducto]);

  // Las funciones de lógica no cambian
  const funcionCarrito = () => {
    if (cantidad < 1) return;
    dispararSweetBasico(
      "Producto agregado",
      "El producto se ha agregado al carrito con éxito",
      "success",
      "Aceptar"
    );
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  };

  const dispararEliminar = () => {
    eliminarProducto(id)
      .then(() => navegar("/productos"))
      .catch((err) => {
        dispararSweetBasico(
          "Hubo un problema",
          err.toString(),
          "error",
          "Cerrar"
        );
      });
  };

  const sumarContador = () => setCantidad((c) => c + 1);
  const restarContador = () => setCantidad((c) => (c > 1 ? c - 1 : 1));

  // 1. Estados de carga y error mejorados
  if (cargando) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error || !productoEncontrado) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">
          <h2>Error</h2>
          <p>{error || "Producto no encontrado."}</p>
          <StyledLinkButton to="/productos" $variant="primary">
            Volver a Productos
          </StyledLinkButton>
        </div>
      </div>
    );
  }

  // Formateador de moneda para consistencia
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(productoEncontrado.price);

  // 2. Nuevo layout con Bootstrap
  return (
    <div className="container my-5">
      <div className="row g-5 align-items-center">
        {/* Columna de la Imagen */}
        <div className="col-lg-6">
          <img
            src={productoEncontrado.image}
            alt={productoEncontrado.name}
            className="img-fluid rounded shadow-lg"
          />
        </div>

        {/* Columna de la Información */}
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold">{productoEncontrado.name}</h1>
          <p className="fs-3 my-3 text-primary">{formattedPrice}</p>
          <p className="lead text-muted mb-4">
            {productoEncontrado.description}
          </p>

          <hr className="my-4" />

          {/* Selector de cantidad y botones de acción */}
          {!admin ? (
            // Vista para el cliente
            <div className="d-flex align-items-center gap-3">
              <div className="input-group" style={{ maxWidth: "150px" }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={restarContador}
                >
                  -
                </button>
                <span className="form-control text-center fs-5">
                  {cantidad}
                </span>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={sumarContador}
                >
                  +
                </button>
              </div>
              <StyledButton
                onClick={funcionCarrito}
                $variant="success"
                className="flex-grow-1"
              >
                Agregar al Carrito
              </StyledButton>
            </div>
          ) : (
            // Vista para el administrador
            <div className="d-grid gap-2 d-md-flex">
              <StyledLinkButton
                to={`/admin/editarProducto/${id}`}
                $variant="primary"
              >
                Editar Producto
              </StyledLinkButton>
              <StyledButton onClick={dispararEliminar} $variant="danger">
                Eliminar Producto
              </StyledButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
