import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { useProductosContext } from "../context/ProductosContext";
import { StyledButton, StyledLinkButton } from "./Button";

function ProductoDetalle() {
  const navegar = useNavigate();

  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } =
    useProductosContext();

  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  console.log(id);

  useEffect(() => {
    // Pequeña optimización: no es necesario repetir el 'setError'
    obtenerProducto(id)
      .then(() => {
        setCargando(false);
      })
      .catch((error) => {
        setError("Hubo un error al obtener el producto.");
        setCargando(false);
      });
  }, [id, obtenerProducto]); // Añadido obtenerProducto a las dependencias

  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico(
      "Producto agregado",
      "El producto se ha agregado al carrito con exito",
      "success",
      "Aceptar"
    );
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  function dispararEliminar() {
    eliminarProducto(id)
      .then(() => {
        navegar("/productos");
      })
      .catch((error) => {
        dispararSweetBasico(
          "Hubo un problema al agregar el producto",
          error,
          "error",
          "Cerrar"
        );
      });
  }

  function sumarContador() {
    setCantidad((c) => c + 1);
  }

  function restarContador() {
    if (cantidad > 1) {
      setCantidad((c) => c - 1);
    }
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar el producto: {error.message}</p>;
  if (!productoEncontrado) return <p>Producto no encontrado</p>;

  return (
    <div className="detalle-container">
      <img
        className="detalle-imagen"
        src={productoEncontrado.image}
        alt={productoEncontrado.name}
      />
      <div className="detalle-info">
        <h2>{productoEncontrado.name}</h2>
        <p>{productoEncontrado.description}</p>
        <p>Precio: ${productoEncontrado.price}</p>

        {!admin ? (
          <div className="detalle-contador">
            <button onClick={restarContador}>-</button>
            <span>{cantidad}</span>
            <button onClick={sumarContador}>+</button>
          </div>
        ) : null}

        {admin ? (
          <StyledLinkButton
            to={"/admin/editarProducto/" + id}
            $variant="primary"
          >
            Editar Producto
          </StyledLinkButton>
        ) : (
          <StyledButton onClick={funcionCarrito} $variant="success">
            Agregar al Carrito
          </StyledButton>
        )}

        {admin ? (
          <StyledButton onClick={dispararEliminar} $variant="danger">
            Eliminar Producto
          </StyledButton>
        ) : null}
      </div>
    </div>
  );
}

export default ProductoDetalle;
