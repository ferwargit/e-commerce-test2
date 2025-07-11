// src/components/AdminProductos.jsx
import { useEffect, useState, useCallback } from "react";
import { useProductosContext } from "../context/ProductosContext";
import { StyledLinkButton, StyledButton } from "./Button";
import SEO from "./SEO";
import { toast } from "react-toastify";
import styles from "../styles/AdminTable.module.css";
import ThemedSwal from "../assets/ThemedSwal"; // 1. Importa nuestra alerta tematizada

function AdminProductos() {
  const { productos, obtenerProductos, terminoBusqueda, eliminarProducto } =
    useProductosContext();
  const [cargando, setCargando] = useState(true);

  const cargarProductos = useCallback(async () => {
    // No es necesario setCargando(true) aquí, ya que el estado inicial es true
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





  // --- INICIO DE LA REFACTORIZACIÓN ---
  const handleEliminar = (id, nombreProducto) => {
    // 2. Usamos ThemedSwal para la confirmación
    ThemedSwal.fire({
      title: '¿Estás seguro?',
      text: `No podrás revertir la eliminación de "${nombreProducto}"`,
      icon: 'warning', // Un ícono de advertencia es más apropiado aquí
      showCancelButton: true,
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar',
      // Usaremos nuestras variables de color para los botones
      confirmButtonColor: 'var(--color-danger)',
      cancelButtonColor: '#4b5563'
    }).then((result) => {
      // 3. Si el usuario confirma...
      if (result.isConfirmed) {
        // Mostramos una notificación "toast" de carga mientras se procesa
        const promise = eliminarProducto(id).then(() => {
          // No necesitamos el toast de éxito aquí, 'toast.promise' lo maneja
          cargarProductos(); // Recarga la lista después de una eliminación exitosa
        });

        // 4. Usamos toast.promise para manejar los resultados
        toast.promise(
          promise,
          {
            pending: 'Eliminando producto...',
            success: 'Producto eliminado con éxito 👌',
            error: 'Error al eliminar el producto 🤯'
          }
        );
      }
    });
  };
  // --- FIN DE LA REFACTORIZACIÓN ---






  const productosFiltrados = productos.filter((p) =>
    p.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  if (cargando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Cargando gestión de productos...</span>
        </div>
        <p className="mt-2 text-light">Cargando gestión de productos...</p>
      </div>
    );
  }

  // Formateador de moneda para usar en el mapeo
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
          {/* Combinamos las clases de Bootstrap con nuestro módulo */}
          <table
            className={`table table-dark table-striped table-hover align-middle ${styles.customTable}`}
          >
            <thead>
              {/* Aplicamos nuestra clase de cabecera */}
              <tr className={styles.tableHeader}>
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
                  <td>{formatPrice(producto.price)}</td>
                  <td className="text-end">
                    <div className="btn-group gap-2">
                      <StyledLinkButton
                        to={`/admin/editarProducto/${producto.id}`}
                        $variant="primary"
                        style={{ padding: "5px 10px", fontSize: "14px" }}
                      >
                        Editar
                      </StyledLinkButton>
                      <StyledButton
                        onClick={() => handleEliminar(producto.id, producto.name)}
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
