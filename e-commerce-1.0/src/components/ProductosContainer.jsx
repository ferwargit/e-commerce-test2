import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/Productos.css";
import "../styles/Carrito.css";
import Carrito from "./Carrito";

function ProductosContainer({ productos }) {
  const [productosCarrito, setProductosCarito] = useState([]);

  useEffect(() => {
    // fetch("https://680f75cd67c5abddd195693e.mockapi.io/products")
    fetch("https://6869ee8c2af1d945cea2cfff.mockapi.io/productos")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        console.log("Datos obtenidos:", datos);
        // Aquí podrías actualizar el estado con los datos obtenidos
        // setProductos(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente  

  function funcionCarrito(producto) {
    console.log(`Paso 1 - Agregando producto al carrito: ${producto.nombre}`);
    console.log(`Productos en el carrito antes de agregar: ${productosCarrito.length}`);
    const nuevoCarrito = [...productosCarrito, producto];
    setProductosCarito(nuevoCarrito);
    console.log(`Paso 2 - Producto agregado al carrito: ${producto.nombre}`);
    console.log(`Productos en el carrito después de agregar: ${nuevoCarrito.length}`);
  }

  return (
    <>
      <div>
        <div className="productos-container">
          {productos.map((producto) => (
            <Card key={producto.id} producto={producto} funcionCarrito={funcionCarrito} />
          ))}
        </div>
        <div>
          <Carrito productosCarrito={productosCarrito} />
        </div>
      </div>
    </>
  );
}

export default ProductosContainer;

