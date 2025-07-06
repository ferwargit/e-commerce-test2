import CarritoCard from "./CarritoCard";
import "../styles/Carrito.css";

export default function Carrito({ productosCarrito }) {
  console.log("Carrito renderizado con productos:", productosCarrito);

  const total = productosCarrito.reduce((subTotal, producto) => {
    return subTotal + producto.price * producto.cantidad;
  }, 0);

  console.log("Total del carrito:", total);
  return (
    <div>
      <h2 style={{ color: "white" }}>Carrito de Compras</h2>

      <div className="carrito-container">
        {productosCarrito.length > 0 ? (
          productosCarrito.map((producto) => (
            <CarritoCard key={producto.id} producto={producto} />
          ))
        ) : (
          <p style={{ color: "white" }}>Carrito vacio</p>
        )}
        {total > 0 ? <span>Total: {total} $</span> : <></>}
      </div>
    </div>
  );
}
