import CarritoCard from "./CarritoCard";
import "../styles/Carrito.css";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

export default function Carrito({ usuarioLogeado }) {
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } =
    useContext(CarritoContext);
  console.log("Carrito renderizado con productos:", productosCarrito);

  const total = productosCarrito.reduce((subTotal, producto) => {
    return subTotal + producto.price * producto.cantidad;
  }, 0);

  function funcionDisparadora(id) {
    console.log("Disparador de borrar producto con id:", id);
    borrarProductoCarrito(id);
  }

  function funcionDisparadora2() {
    vaciarCarrito();
    console.log("Carrito vaciado");
  }

  console.log("Total del carrito:", total);

  if (!usuarioLogeado) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h2 style={{ color: "white" }}>Carrito de Compras</h2>

      <div className="carrito-container">
        <button className="btn-vaciar" onClick={funcionDisparadora2}>
          Vaciar Carrito
        </button>
        {productosCarrito.length > 0 ? (
          productosCarrito.map((producto) => (
            <CarritoCard
              key={producto.id}
              producto={producto}
              funcionDisparadora={funcionDisparadora}
            />
          ))
        ) : (
          <p style={{ color: "white" }}>Carrito vacio</p>
        )}
        {total > 0 ? <span>Total a pagar: $ {total.toFixed(2)}</span> : <></>}
      </div>
    </div>
  );
}
