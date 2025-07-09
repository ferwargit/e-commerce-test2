import { createContext, useState, useContext, useCallback } from "react";

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  const obtenerProductos = useCallback(() => {
    return new Promise((res, rej) => {
      fetch("https://6869ee8c2af1d945cea2cfff.mockapi.io/productos")
        .then((respuesta) => {
          if (!respuesta.ok) throw new Error("Error en la petición");
          return respuesta.json();
        })
        .then((datos) => {
          setProductos(datos);
          res(datos);
        })
        .catch((error) => {
          console.log("Error", error);
          rej(error);
        });
    });
  }, []);

  const agregarProducto = useCallback((producto) => {
    return new Promise(async (res, rej) => {
      try {
        const respuesta = await fetch(
          "https://6869ee8c2af1d945cea2cfff.mockapi.io/productos",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
          }
        );
        if (!respuesta.ok) {
          throw new Error("Error al agregar el producto.");
        }
        const data = await respuesta.json();
        res(data);
      } catch (error) {
        console.error(error.message);
        rej(error.message);
      }
    });
  }, []);

  const obtenerProducto = useCallback((id) => {
    return new Promise((res, rej) => {
      fetch(`https://6869ee8c2af1d945cea2cfff.mockapi.io/productos/${id}`)
        .then((respuesta) => {
          if (!respuesta.ok) {
            if (respuesta.status === 404)
              throw new Error("Producto no encontrado");
            throw new Error("Error en la petición");
          }
          return respuesta.json();
        })
        .then((producto) => {
          setProductoEncontrado(producto);
          res(producto);
        })
        .catch((err) => {
          console.log("Error:", err);
          rej(err.message);
        });
    });
  }, []);

  const editarProducto = useCallback((producto) => {
    return new Promise(async (res, rej) => {
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
        res(data);
      } catch (error) {
        console.error(error.message);
        rej(error);
      }
    });
  }, []);

  const eliminarProducto = useCallback((id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar?");
    if (confirmar) {
      return new Promise(async (res, rej) => {
        try {
          const respuesta = await fetch(
            `https://6869ee8c2af1d945cea2cfff.mockapi.io/productos/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!respuesta.ok) throw new Error("Error al eliminar");
          alert("Producto eliminado correctamente.");
          res();
        } catch (error) {
          console.error(error.message);
          alert("Hubo un problema al eliminar el producto.");
          rej(error);
        }
      });
    }
  }, []);

  return (
    <ProductosContext.Provider
      value={{
        obtenerProductos,
        productos,
        agregarProducto,
        obtenerProducto,
        productoEncontrado,
        editarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductosContext = () => useContext(ProductosContext);
