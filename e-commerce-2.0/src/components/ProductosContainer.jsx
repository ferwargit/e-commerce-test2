import SEO from "./SEO";
import { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import { useProductosContext } from "../context/ProductosContext";

function ProductosContainer() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Usamos useCallback para la función de carga
  const cargarProductos = useCallback(async () => {
    try {
      await obtenerProductos();
    } catch (err) {
      setError("Hubo un problema al cargar los productos.");
    } finally {
      setCargando(false);
    }
  }, [obtenerProductos]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // Mensaje de carga mejorado
  if (cargando) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return <p className="container text-center mt-5 text-danger">{error}</p>;
  }

  // --- INICIO DEL CAMBIO ---

  // 1. Creamos una copia del array de productos para no mutar el estado original
  const productosOrdenados = [...productos].sort((a, b) => {
    // 2. Usamos localeCompare para un ordenamiento alfabético robusto
    // que maneja bien acentos y caracteres especiales.
    return a.name.localeCompare(b.name);
  });

  // --- FIN DEL CAMBIO ---

  return (
    <>
      <SEO title="Nuestros Productos" />
      <div className="container mt-4">
        <div className="row g-4">
          {/* 3. Mapeamos sobre el nuevo array ordenado */}
          {productosOrdenados.map((producto) => (
            <div
              key={producto.id}
              className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
            >
              <Card producto={producto} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductosContainer;
