import "../styles/Productos.css";

function Card({ producto, funcionCarrito }) {
  function agregarAlCarrito() {
    console.log(
      `Paso 1 - Llama a la función agregar al carrito: ${producto.nombre}`
    );
    funcionCarrito(producto);
  }

  return (
    <div className="producto-card">
      <h3 style={{ color: "black" }}>{producto.nombre}</h3>
      <p style={{ color: "black" }}>{producto.descripcion}</p>
      <img
        className="producto-image"
        src={producto.imagen}
        alt={producto.nombre}
      />
      <p style={{ color: "black" }}>Precio: ${producto.precio}</p>
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
