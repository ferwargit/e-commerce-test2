// import { useState } from "react";
import CarritoCard from "./CarritoCard";
import "../styles/Carrito.css";

export default function Carrito({ productosCarrito }) {
  return (
    <div>
      <h2 style={{ color: "white" }}>Carrito de Compras</h2>
      <div className="carrito-container">
        {/* {console.log(productosCarrito.length)} */}
        {productosCarrito.length > 0 ? (
          productosCarrito.map((producto) => (
            <CarritoCard key={producto.id} producto={producto} />
          ))
        ) : (
          <p style={{ color: "white" }}>Carrito vacio</p>
        )}
      </div>
    </div>
  );
}
