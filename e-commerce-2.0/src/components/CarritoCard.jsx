import "../styles/Carrito.css";

function CarritoCard({ producto, funcionDisparadora }) {
  function borrarDelCarrito() {
    console.log("Paso 1");
    funcionDisparadora(producto.id);
  }

  return (
    <div className="carrito-card">
      <h3 className="carrito-titulo" style={{ color: "black" }}>
        {producto.name}
      </h3>
      {
        <p className="descripcion-carrito" style={{ color: "black" }}>
          {producto.description}
        </p>
      }
      <img className="carrito-image" src={producto.image}></img>
      <p className="precio-carrito" style={{ color: "black" }}>
        Cantidad: {producto.cantidad}
      </p>
      <div>
        <p style={{ color: "black" }}>Precio unitario</p>
        <p style={{ color: "black" }}>$ {producto.price}</p>
      </div>
      <div>
        <p style={{ color: "black" }}>Precio Total</p>
        <p style={{ color: "black" }}>$ {producto.price * producto.cantidad}</p>
      </div>
      <button
        className="boton-carrito"
        onClick={borrarDelCarrito}
        style={{ backgroundColor: "red", color: "black" }}
      >
        X
      </button>
    </div>
  );
}

export default CarritoCard;
