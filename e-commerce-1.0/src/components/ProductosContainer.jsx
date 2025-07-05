import "../styles/Productos.css";
import Card from "./Card";

function ProductosContainer({ productos }) {
  return (
    <>
      <div className="productos-container">
        {productos.map((producto) => (
          <Card producto={producto} />
        ))}
      </div>
    </>
  );
}

export default ProductosContainer;
