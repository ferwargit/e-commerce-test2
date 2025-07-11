// src/components/AdminProductos.jsx
import { useEffect, useState, useCallback } from "react";
import { useProductosContext } from "../context/ProductosContext";
import { StyledLinkButton, StyledButton } from "./Button";
import SEO from "./SEO";
import { toast } from "react-toastify";

function AdminProductos() {
  const { productos, obtenerProductos, terminoBusqueda, eliminarProducto } =
    useProductosContext();
  const [cargando, setCargando] = useState(true);

  const cargarProductos = useCallback(async () => {
    setCargando(true);
    await obtenerProductos();
    setCargando(false);
  }, [obtenerProductos]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const handleEliminar = (id) => {
    eliminarProducto(id)
      .then(() => {
        toast.success("Producto eliminado con éxito");
        cargarProductos(); // Recarga la lista de productos
      })
      .catch((err) => toast.error("Error al eliminar el producto"));
  };

  const productosFiltrados = productos.filter((p) =>
    p.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  if (cargando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Gestión de Productos" />
      <div className="container mt-4">
        <h1 className="mb-4">Gestión de Productos</h1>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto) => (
                <tr key={producto.id}>
                  <td>
                    <img
                      src={producto.image}
                      alt={producto.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                      className="rounded"
                    />
                  </td>
                  <td>{producto.name}</td>
                  <td>
                    {new Intl.NumberFormat("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    }).format(producto.price)}
                  </td>
                  <td className="text-end">
                    <div className="btn-group">
                      <StyledLinkButton
                        to={`/admin/editarProducto/${producto.id}`}
                        $variant="primary"
                        style={{ padding: "5px 10px", fontSize: "14px" }}
                      >
                        Editar
                      </StyledLinkButton>
                      <StyledButton
                        onClick={() => handleEliminar(producto.id)}
                        $variant="danger"
                        style={{ padding: "5px 10px", fontSize: "14px" }}
                      >
                        Eliminar
                      </StyledButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {productosFiltrados.length === 0 && (
          <p className="text-center text-muted mt-3">
            No se encontraron productos con ese término de búsqueda.
          </p>
        )}
      </div>
    </>
  );
}

export default AdminProductos;
