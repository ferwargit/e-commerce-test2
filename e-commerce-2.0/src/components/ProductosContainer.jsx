import { useEffect, useState } from "react";
import "../styles/Productos.css";
import Card from "./Card";
import { useProductosContext } from "../context/ProductosContext";

function ProductosContainer() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  {
    useEffect(() => {
      obtenerProductos()
        .then((productos) => {
          setCargando(false);
        })
        .catch((error) => {
          setError("Hubo un problema al cargar los productos.");
          setCargando(false);
        });
    }, []);
  }

  if (cargando) {
    return <p>Cargando productos...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return (
      <div className="productos-container">
        {productos.map((producto) => (
          <Card key={producto.id} producto={producto} />
        ))}
      </div>
    );
  }
}

export default ProductosContainer;
