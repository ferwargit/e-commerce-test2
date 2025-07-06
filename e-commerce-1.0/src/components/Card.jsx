import { useState } from "react";
import "../styles/Productos.css";

function Card({ producto, funcionCarrito }) {
  const [cantidad, setCantidad] = useState(1);

  function agregarAlCarrito() {
    if (cantidad < 1) return;
    funcionCarrito({ ...producto, cantidad });
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  return (
    <div key={producto.id} className="producto-card">
      <h3 style={{ color: "black" }}>{producto.name}</h3>
      <p style={{ color: "black" }}>{producto.description}</p>
      <img
        className="producto-image"
        src={producto.image}
        alt={producto.name}
      />
      <p style={{ color: "black" }}>Precio: ${producto.price}</p>
      <div>
        <button
          onClick={restarContador}
          className="producto-button"
          style={{ color: "black" }}
        >
          -
        </button>
        <span style={{ color: "black" }}>{cantidad}</span>
        <button
          onClick={sumarContador}
          className="producto-button"
          style={{ color: "black" }}
        >
          +
        </button>
      </div>
      <button
        onClick={agregarAlCarrito}
        style={{ color: "black" }}
        className="producto-button"
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default Card;
