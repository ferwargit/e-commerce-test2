// import { useState } from "react";
import Card from "./Card";
import "../styles/Carrito.css";

export default function Carrito({ productos }) {
  // const [productosCarrito, setProductosCarrito] = useState(productos || []);

  return (
    <div>
      <h2 style={{ color: "white" }}>Carrito de Compras</h2>
      <div className="carrito-container">
        {console.log(productos.length)}
        {/* Verifica si la lista de productos está vacía o no existe */}
        {/* Si está vacía, muestra un mensaje indicando que no hay productos disponibles */}
        {productos.length > 0 ? (
          productos.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))
        ) : (
          <p style={{ color: "white" }}>Carrito vacio</p>
        )}
      </div>
    </div>
  );
}
