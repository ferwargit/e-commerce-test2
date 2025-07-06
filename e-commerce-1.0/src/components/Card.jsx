import "../styles/Productos.css";

function Card({ producto, funcionCarrito }) {
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
      <button
        onClick={() => funcionCarrito(producto)}
        style={{ color: "black" }}
        className="producto-button"
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default Card;
