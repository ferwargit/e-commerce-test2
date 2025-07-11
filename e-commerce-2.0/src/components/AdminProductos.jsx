// src/components/AdminProductos.jsx
import { useEffect, useState, useCallback } from "react";
import { useProductosContext } from "../context/ProductosContext";
import { StyledLinkButton, StyledButton } from "./Button";
import SEO from "./SEO";
import { toast } from "react-toastify";
import styles from "../styles/AdminTable.module.css";
import ThemedSwal from "../assets/ThemedSwal";

function AdminProductos() {
  const { productos, obtenerProductos, terminoBusqueda, eliminarProducto } =
    useProductosContext();
  const [cargando, setCargando] = useState(true);

  const cargarProductos = useCallback(async () => {
    try {
      await obtenerProductos();
    } catch (err) {
      toast.error("Hubo un problema al cargar los productos.");
    } finally {
      setCargando(false);
    }
  }, [obtenerProductos]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const handleEliminar = (id, nombreProducto) => {
    ThemedSwal.fire({
      title: "¿Estás seguro?",
      text: `No podrás revertir la eliminación de "${nombreProducto}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, ¡eliminar!",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "var(--color-danger)",
      cancelButtonColor: "#4b5563",
    }).then((result) => {
      if (result.isConfirmed) {
        const promise = eliminarProducto(id).then(() => {
          cargarProductos();
        });
        toast.promise(promise, {
          pending: "Eliminando producto...",
          success: "Producto eliminado con éxito 👌",
          error: "Error al eliminar el producto 🤯",
        });
      }
    });
  };

  const productosFiltrados = productos.filter((p) =>
    p.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  if (cargando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">
            Cargando gestión de productos...
          </span>
        </div>
        <p className="mt-2 text-light">Cargando gestión de productos...</p>
      </div>
    );
  }

  const formatPrice = (value) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(value);

  return (
    <>
      <SEO title="Gestión de Productos" />
      <div className="container mt-4">
        <h1
          className="mb-4 text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          Gestión de Productos
        </h1>
        <div className="table-responsive">
          <table
            className={`table table-dark table-striped table-hover align-middle ${styles.customTable}`}
          >
            <thead className={styles.tableHeader}>
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
                  <td data-label="Imagen" className={styles.imageCell}>
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
                  <td data-label="Nombre">{producto.name}</td>
                  <td data-label="Precio">{formatPrice(producto.price)}</td>
                  <td
                    data-label="Acciones"
                    className={`${styles.actionsCell} text-end`}
                  >
                    <div className="btn-group gap-2 justify-content-center justify-content-md-end">
                      <StyledLinkButton
                        to={`/admin/editarProducto/${producto.id}`}
                        $variant="primary"
                        style={{ padding: "5px 10px", fontSize: "14px" }}
                      >
                        Editar
                      </StyledLinkButton>
                      <StyledButton
                        onClick={() =>
                          handleEliminar(producto.id, producto.name)
                        }
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
          <p className="text-center mt-3 text-muted">
            No se encontraron productos con ese término de búsqueda.
          </p>
        )}
      </div>
    </>
  );
}

export default AdminProductos;
