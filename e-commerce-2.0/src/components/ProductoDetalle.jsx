import SEO from "./SEO";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
import ThemedSwal from "../assets/ThemedSwal";
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

  function funcionCarrito() {
    if (cantidad < 1) return;

    agregarAlCarrito({ ...productoEncontrado, cantidad });

    // Swal.fire({
    //   title: "¡Producto Agregado!",
    //   text: `Se ha añadido "${productoEncontrado.name}" a tu carrito.`,
    //   icon: "success",
    //   showCancelButton: true,
    //   confirmButtonColor: "#28a745", // Verde (éxito)
    //   cancelButtonColor: "#6c757d", // Gris (secundario)
    //   confirmButtonText: "Ir al Carrito",
    //   cancelButtonText: "Seguir Comprando",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     navegar("/carrito");
    //   } else if (result.isDismissed) {
    //     navegar("/productos");
    //   }
    // });

    // 2. Usamos nuestra nueva alerta
    ThemedSwal.fire({
      title: "¡Producto Agregado!",
      text: `Se ha añadido "${productoEncontrado.name}" a tu carrito.`,
      icon: "success",
      showCancelButton: true,
      // Los colores ahora se controlan desde el CSS, podemos quitar esto
      // confirmButtonColor: '#28a745',
      // cancelButtonColor: '#6c757d',
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

  if (cargando) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-light" role="status">
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
    <>
      <SEO
        title={productoEncontrado.name}
        description={productoEncontrado.description}
      />
      <div className="container my-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <img
              src={productoEncontrado.image}
              alt={productoEncontrado.name}
              className="img-fluid rounded shadow-lg"
            />
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
              // Vista para el cliente
              <div className="d-flex align-items-center gap-3">
                <div className="input-group" style={{ maxWidth: "150px" }}>
                  {/* Usamos btn-outline-light para el tema oscuro */}
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
    </>
  );
}

export default ProductoDetalle;
