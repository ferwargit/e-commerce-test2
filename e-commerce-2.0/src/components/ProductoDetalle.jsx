import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";

function ProductoDetalle({ funcionCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://6869ee8c2af1d945cea2cfff.mockapi.io/productos")
      .then((res) => res.json())
      .then((datos) => {
        const productoEncontrado = datos.find((p) => p.id === id);
        if (productoEncontrado) {
          setProducto(productoEncontrado);
        } else {
          setError(new Error("Producto no encontrado"));
        }
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setError(error);
        setCargando(false);
      });
  }, [id]);

  function agregarAlCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico(
      "Producto agregado",
      "El producto se ha agregado al carrito con exito",
      "success",
      "Cerrar"
    );
    funcionCarrito({ ...producto, cantidad });
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar el producto: {error.message}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="detalle-container">
      <img className="detalle-imagen" src={producto.image} alt="" />
      <div className="detalle-info">
        <h2>{producto.name}</h2>
        <p>{producto.description}</p>
        <p>Precio: ${producto.price}</p>
        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>
        <button onClick={agregarAlCarrito}>Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductoDetalle;
