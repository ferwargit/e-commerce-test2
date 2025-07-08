import CarritoCard from "./CarritoCard";
import "../styles/Carrito.css";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";

export default function Carrito() {
  const { user } = useAuthContext();
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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h2 style={{ color: "white" }}>Carrito de Compras</h2>

      <div className="carrito-container">
        <button className="btn-vaciar" onClick={funcionDisparadora2}>
          Vaciar Carrito
        </button>
        <div className="carrito-titulos">
          <h2 className="carrito-titulo-producto"> Producto </h2>
          <h2 className="carrito-titulo-descripcion">Descripción</h2>
          <h2> </h2>
          <h2> Cantidad </h2>
          <h2> Precio unitario </h2>
          <h2> Sub total </h2>
          <h2> </h2>
        </div>
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
