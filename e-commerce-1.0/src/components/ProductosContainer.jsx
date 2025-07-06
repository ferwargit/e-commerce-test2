import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/Productos.css";
import "../styles/Carrito.css";
import Carrito from "./Carrito";

function ProductosContainer() {
  const [productos, setProductos] = useState([]);
  const [productosCarrito, setProductosCarito] = useState([]);
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

  // Función para agregar un producto al carrito
  function funcionCarrito(producto) {
    console.log(`Paso 1 - Agregando producto al carrito: ${producto.nombre}`);
    console.log(
      `Productos en el carrito antes de agregar: ${productosCarrito.length}`
    );
    const nuevoCarrito = [...productosCarrito, producto];
    setProductosCarito(nuevoCarrito);
    console.log(`Paso 2 - Producto agregado al carrito: ${producto.nombre}`);
    console.log(
      `Productos en el carrito después de agregar: ${nuevoCarrito.length}`
    );
  }

  if (cargando) {
    return <p>Cargando productos...</p>;
  } else if (error) {
    return <p>Error: {error}</p>;
  } else {
    return (
      <div>
        <div className="productos-container">
          {productos.map((producto) => (
            <Card
              key={producto.id}
              producto={producto}
              funcionCarrito={funcionCarrito}
            />
          ))}
        </div>
        {
          <div>
            <Carrito productosCarrito={productosCarrito} />
          </div>
        }
      </div>
    );
  }
}

export default ProductosContainer;
