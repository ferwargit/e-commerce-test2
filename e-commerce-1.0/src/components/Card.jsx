import "../styles/Productos.css";
import { Link } from "react-router-dom";

function Card({ producto }) {
  return (
    <div key={producto.id} className="producto-card">
      <h3 style={{ color: "black" }}>{producto.name}</h3>
      <img
        className="producto-image"
        src={producto.image}
        alt={producto.name}
      />
      <p style={{ color: "black" }}>Precio: ${producto.price}</p>
      <Link to={"/productos/" + producto.id}>
        <button style={{ color: "black" }} className="producto-button">
          Ver detalle del producto
        </button>
      </Link>
    </div>
  );
}

export default Card;
