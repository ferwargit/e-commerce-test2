// src/components/ProductoDetalle.jsx
import SEO from "./SEO";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThemedSwal from "../assets/ThemedSwal";
import { toast } from "react-toastify";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { useProductosContext } from "../context/ProductosContext";
import { StyledButton, StyledLinkButton } from "./Button";
import styled from "styled-components";

// Componente estilizado para el contenedor de la imagen de detalle
const ImageWrapper = styled.div`
  padding: 2rem;
  border-radius: 16px;

  /* --- INICIO DE LA SOLUCIÓN: GRADIENTE LINEAL --- */
  /* Aplicamos el mismo gradiente para una consistencia visual perfecta */
  background: linear-gradient(
    145deg,
    var(--color-background-light) 0%,
    var(--color-background-dark) 100%
  );
  border: 1px solid var(--color-border);
  /* --- FIN DE LA SOLUCIÓN --- */
`;

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

  function funcionCarrito() {
    if (cantidad < 1) return;
    agregarAlCarrito({ ...productoEncontrado, cantidad });
    ThemedSwal.fire({
      title: "¡Producto Agregado!",
      text: `Se ha añadido "${productoEncontrado.name}" a tu carrito.`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Ir al Carrito",
      cancelButtonText: "Seguir Comprando",
    }).then((result) => {
      if (result.isConfirmed) {
        navegar("/carrito");
      } else if (result.isDismissed) {
        navegar("/productos");
      }
    });
  }

  const dispararEliminar = () => {
    const nombreProducto = productoEncontrado?.name || "este producto";
    ThemedSwal.fire({
      title: "¿Estás seguro?",
      text: `No podrás revertir la eliminación de "${nombreProducto}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, ¡eliminar!",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--color-danger)",
      cancelButtonColor: "#4b5563",
    }).then((result) => {
      if (result.isConfirmed) {
        const promise = eliminarProducto(id).then(() => {
          setTimeout(() => navegar("/admin"), 1500);
        });
        toast.promise(promise, {
          pending: "Eliminando producto...",
          success: "Producto eliminado con éxito. Redirigiendo...",
          error: "Error al eliminar el producto.",
        });
      }
    });
  };

  const sumarContador = () => setCantidad((c) => c + 1);
  const restarContador = () => setCantidad((c) => (c > 1 ? c - 1 : 1));

  if (cargando) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-light">Cargando producto...</p>
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

  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(productoEncontrado.price);

  return (
    <>
      <SEO
        title={productoEncontrado.name}
        description={productoEncontrado.description}
      />
      <div className="container my-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <ImageWrapper>
              <img
                src={productoEncontrado.image}
                alt={productoEncontrado.name}
                className="img-fluid rounded"
              />
            </ImageWrapper>
          </div>
          <div className="col-lg-6">
            <h1
              className="display-5 fw-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {productoEncontrado.name}
            </h1>
            <p className="fs-3 my-3" style={{ color: "var(--color-primary)" }}>
              {formattedPrice}
            </p>
            <p
              className="lead mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              {productoEncontrado.description}
            </p>
            <hr
              className="my-4"
              style={{ borderColor: "var(--color-border)" }}
            />
            {!admin ? (
              <div className="d-flex align-items-center gap-3">
                <div className="input-group" style={{ maxWidth: "150px" }}>
                  <button
                    className="btn btn-outline-light"
                    type="button"
                    onClick={restarContador}
                  >
                    -
                  </button>
                  <span
                    className="form-control text-center fs-5"
                    style={{
                      backgroundColor: "var(--color-background-dark)",
                      color: "var(--color-text-primary)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    {cantidad}
                  </span>
                  <button
                    className="btn btn-outline-light"
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
              <div className="d-grid gap-2 d-md-flex justify-content-center">
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
    </>
  );
}

export default ProductoDetalle;
