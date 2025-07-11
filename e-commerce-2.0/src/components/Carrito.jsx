// src/components/Carrito.jsx
import SEO from "./SEO";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import CarritoCard from "./CarritoCard";
import { StyledButton, StyledLinkButton } from "./Button";
import ThemedSwal from "../assets/ThemedSwal";
import { toast } from "react-toastify";

export default function Carrito() {
  const { user, admin } = useAuthContext();
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } =
    useContext(CarritoContext);
  const navigate = useNavigate();

  // 1. CALCULAR SUBTOTAL
  const subtotal = productosCarrito.reduce(
    (total, producto) => total + producto.price * producto.cantidad,
    0
  );

  // 2. LÓGICA DE CÁLCULO DE ENVÍO
  let costoEnvio = 0;
  if (subtotal > 0) {
    // Solo se calcula si hay productos
    if (subtotal < 50000) {
      costoEnvio = 5000;
    } else if (subtotal >= 50000 && subtotal < 200000) {
      costoEnvio = 2500;
    } else {
      // Para compras de $200.000 o más
      costoEnvio = 0;
    }
  }

  // 3. CALCULAR TOTAL FINAL
  const totalFinal = subtotal + costoEnvio;

  // Función para formatear precios
  const formatPrice = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);

  // 4. FUNCIÓN PARA MANEJAR EL PAGO
  const handleProcederAlPago = () => {
    ThemedSwal.fire({
      title: "Confirmar Pedido",
      // Se usa el totalFinal para el mensaje
      html: `Estás a punto de confirmar tu compra por un total de <strong>${formatPrice(
        totalFinal
      )}</strong>.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirmar y Pagar",
      cancelButtonText: "Volver al carrito",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("¡Gracias por tu compra! Tu pedido está en camino.");
        vaciarCarrito();
        setTimeout(() => navigate("/"), 2000);
      }
    });
  };

  // Redirecciones por rol
  if (admin) {
    return <Navigate to="/admin" replace />;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Vista para Carrito Vacío
  if (productosCarrito.length === 0) {
    return (
      <div className="container text-center my-5">
        <div
          className="card p-5 shadow-sm"
          style={{
            backgroundColor: "var(--color-background-light)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h1
            className="card-title"
            style={{ color: "var(--color-text-primary)" }}
          >
            Tu carrito está vacío
          </h1>
          <p className="card-text" style={{ color: "var(--color-text-muted)" }}>
            Parece que todavía no has agregado productos
          </p>
          <div className="mt-4">
            <StyledLinkButton to="/productos" $variant="primary">
              Ir a la tienda
            </StyledLinkButton>
          </div>
        </div>
      </div>
    );
  }

  // Vista del Carrito con productos
  return (
    <>
      <SEO title="Carrito de Compras" />
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ color: "var(--color-text-primary)" }}>
            Carrito de Compras
          </h1>
          <StyledButton onClick={vaciarCarrito} $variant="danger">
            Vaciar Carrito
          </StyledButton>
        </div>

        <div className="row g-5">
          <div className="col-lg-8">
            {productosCarrito.map((producto) => (
              <CarritoCard
                key={producto.id}
                producto={producto}
                funcionDisparadora={borrarProductoCarrito}
              />
            ))}
          </div>

          <div className="col-lg-4">
            <div
              className="card shadow-sm"
              style={{
                backgroundColor: "var(--color-background-light)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div className="card-body">
                <h4
                  className="card-title mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Resumen del Pedido
                </h4>
                <ul className="list-group list-group-flush">
                  <li
                    className="list-group-item d-flex justify-content-between"
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--color-text-primary)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </li>

                  {/* --- JSX ACTUALIZADO --- */}
                  <li
                    className="list-group-item d-flex justify-content-between"
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--color-text-primary)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <span>Envío</span>
                    <span
                      style={{
                        color:
                          costoEnvio === 0 ? "var(--color-primary)" : "inherit",
                      }}
                    >
                      {costoEnvio === 0 ? "¡Gratis!" : formatPrice(costoEnvio)}
                    </span>
                  </li>
                  <li
                    className="list-group-item d-flex justify-content-between fw-bold fs-5"
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--color-text-primary)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <span>Total</span>
                    <span>{formatPrice(totalFinal)}</span>
                  </li>
                  {/* --- FIN DEL JSX ACTUALIZADO --- */}
                </ul>
                <div className="d-grid mt-4">
                  <StyledButton
                    onClick={handleProcederAlPago}
                    $variant="success"
                  >
                    Proceder al Pago
                  </StyledButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
