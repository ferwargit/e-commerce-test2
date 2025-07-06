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
  const [total, setTotal] = useState(0);

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
    const existe = productosCarrito.find((p) => p.id === producto.id);
    console.log(existe);
    if (existe) {
      const carritoActualizado = productosCarrito.map((p) => {
        if (p.id === producto.id) {
          const productoActualizado = {
            ...p,
            cantidad: p.cantidad + producto.cantidad,
          };
          return productoActualizado;
        } else {
          return p;
        }
      });
      setProductosCarito(carritoActualizado);
    } else {
      const nuevoCarrito = [...productosCarrito, producto];
      setProductosCarito(nuevoCarrito);
    }
    setTotal(0);
    // Calcular el total del carrito
    productosCarrito.map((p) => {
      setTotal(total + p.price * p.cantidad);
    });
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
            <Carrito productosCarrito={productosCarrito} total={total} />
          </div>
        }
      </div>
    );
  }
}

export default ProductosContainer;
