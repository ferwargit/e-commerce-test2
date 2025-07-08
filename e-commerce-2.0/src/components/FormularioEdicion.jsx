import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";

function FormularioEdicion() {
  const { obtenerProducto, productoEncontrado } = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => {
        //setProducto(productoEncontrado)
        setCargando(false);
      })
      .catch((error) => {
        if (error == "Producto no encontrado") {
          setError("Producto no encontrado");
        }
        if (error == "Hubo un error al obtener el producto.") {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(
        `https://6869ee8c2af1d945cea2cfff.mockapi.io/productos/${producto.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        }
      );
      if (!respuesta.ok) {
        throw new Error("Error al actualizar el producto.");
      }
      const data = await respuesta.json();
      onActualizar(data);
      alert("Producto actualizado correctamente.");
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al actualizar el producto.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={producto.name || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>URL de la Imagen</label>
        <input
          type="text"
          name="image"
          value={producto.image}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={producto.price || ""}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={producto.description || ""}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Actualizar Producto</button>
    </form>
  );
}

export default FormularioEdicion;
