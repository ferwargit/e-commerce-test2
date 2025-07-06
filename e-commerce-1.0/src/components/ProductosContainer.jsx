import { useState } from "react";
import Card from "./Card";
import "../styles/Productos.css";
import "../styles/Carrito.css";

function ProductosContainer({ productos }) {
  const [productosCarrito, setProductosCarito] = useState([]);

  function funcionCarrito(producto) {
    console.log(`Paso 2 - Agregando producto al carrito: ${producto.nombre}`);
    console.log(productosCarrito);
    `Productos en el carrito antes de agregar: ${productosCarrito.length}`;
    var nuevoCarrito = productosCarrito;
    nuevoCarrito.push(producto);
    setProductosCarito(nuevoCarrito);
    console.log(`Paso 3 - Producto agregado al carrito: ${producto.nombre}`);
    console.log(productosCarrito);
  }

  return (
    <>
      <div>
        <div className="productos-container">
          {productos.map((producto) => (
            <Card producto={producto} funcionCarrito={funcionCarrito} />
          ))}
        </div>
        {/* <div>
          <h2 style={{ color: "white" }}>Carrito de Compras</h2>
          <div className="carrito-container">
            {console.log(productosCarrito.length)}
            {productosCarrito.length > 0 ? (
              productosCarrito.map((producto) => (
                <Card key={producto.id} producto={producto} />
              ))
            ) : (
              <p style={{ color: "white" }}>Carrito vacio</p>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ProductosContainer;
