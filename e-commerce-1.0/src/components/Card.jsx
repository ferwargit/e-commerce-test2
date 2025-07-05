import "../styles/Productos.css";

function Card({ producto }) {
  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <img
        className="producto-image"
        src={producto.imagen}
        alt={producto.nombre}
      />
    </div>
  );
}

export default Card;
