import { useState } from "react";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";
import { StyledButton } from "./Button"; // 1. Importamos nuestro botón estilizado

function FormularioProducto() {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();

  const [producto, setProducto] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  // La lógica de validación y envío no necesita cambios
  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser un número positivo.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.image.trim()) {
      return "La URL de la imagen no debe estar vacía.";
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      agregarProducto(producto)
        .then(() => {
          dispararSweetBasico(
            "¡Éxito!",
            "El producto fue agregado correctamente.",
            "success",
            "Aceptar"
          );
          // Reseteamos el formulario
          setProducto({ name: "", price: "", description: "", image: "" });
        })
        .catch((error) => {
          dispararSweetBasico(
            "Hubo un problema",
            error.toString(),
            "error",
            "Cerrar"
          );
        });
    } else {
      dispararSweetBasico(
        "Error en el formulario",
        validarForm,
        "error",
        "Cerrar"
      );
    }
  };

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  // 2. Aquí está el nuevo JSX con el layout de Bootstrap
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">
                Agregar Nuevo Producto
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre del Producto
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={producto.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ej: Teclado Mecánico RGB"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    URL de la Imagen
                  </label>
                  <input
                    id="image"
                    type="url"
                    name="image"
                    value={producto.image}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Precio
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      id="price"
                      type="number"
                      name="price"
                      value={producto.price}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Ej: 150.99"
                      required
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={producto.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Describe el producto aquí..."
                    required
                  />
                </div>

                <div className="d-grid">
                  <StyledButton type="submit" $variant="success">
                    Agregar Producto
                  </StyledButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioProducto;
