import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/Productos.css";
import "../styles/Carrito.css";

function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  {
    useEffect(() => {
      fetch("https://6869ee8c2af1d945cea2cfff.mockapi.io/productos")
        .then((respuesta) => {
          return respuesta.json();
        })
        .then((datos) => {
          console.log("Datos obtenidos:", datos);
          setProductos(datos);
          setCargando(false);
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
          setError("Hubo un problema al cargar los productos");
          setCargando(false);
        });
    }, []);
  }

  if (cargando) {
    return <p>Cargando productos...</p>;
  } else if (error) {
    return <p>Error: {error}</p>;
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
