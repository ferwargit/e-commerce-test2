// src/components/Carrito.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";
import CarritoCard from "./CarritoCard";
import { StyledButton, StyledLinkButton } from "./Button";

export default function Carrito() {
  const { user } = useAuthContext();
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } =
    useContext(CarritoContext);

  const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + producto.price * producto.cantidad,
    0
  );

  // Formateador de moneda
  const formatPrice = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Vista para Carrito Vacío
  if (productosCarrito.length === 0) {
    return (
      <div className="container text-center my-5">
        <div className="card p-5 shadow-sm">
          <h1 className="card-title">Tu carrito está vacío</h1>
          <p className="card-text text-muted">
            Parece que todavía no has agregado productos.
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
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Carrito de Compras</h1>
        <StyledButton onClick={vaciarCarrito} $variant="danger">
          Vaciar Carrito
        </StyledButton>
      </div>

      <div className="row g-5">
        {/* Columna de Items del Carrito */}
        <div className="col-lg-8">
          {productosCarrito.map((producto) => (
            <CarritoCard
              key={producto.id}
              producto={producto}
              funcionDisparadora={borrarProductoCarrito}
            />
          ))}
        </div>

        {/* Columna del Resumen del Pedido */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Resumen del Pedido</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Envío</span>
                  <span>A calcular</span>
                </li>
                <li className="list-group-item d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </li>
              </ul>
              <div className="d-grid mt-4">
                <StyledButton
                  onClick={() => alert("Procediendo al pago...")}
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
  );
}
