// src/components/Contacto.jsx
import React from "react";
import SEO from "./SEO";
import { StyledInput, StyledTextarea } from "./StyledFormElements";
import { StyledButton } from "./Button";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

function Contacto() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío
    toast.success("¡Gracias por tu mensaje! Te contactaremos pronto.");
    e.target.reset(); // Limpia el formulario
  };

  return (
    <>
      <SEO
        title="Contacto"
        description="Ponte en contacto con el equipo de TechStore. Estamos aquí para ayudarte con cualquier consulta sobre nuestros productos y servicios."
      />
      <div className="container my-5 py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Contáctanos</h1>
          <p className="lead" style={{ color: "var(--color-text-muted)" }}>
            ¿Tienes alguna pregunta? No dudes en escribirnos.
          </p>
        </div>

        <div className="row g-5">
          {/* --- COLUMNA DEL FORMULARIO --- */}
          <div className="col-lg-7">
            <div
              className="card"
              style={{
                backgroundColor: "var(--color-background-light)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
              }}
            >
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Tu Nombre
                    </label>
                    <StyledInput
                      type="text"
                      id="name"
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Tu Email
                    </label>
                    <StyledInput
                      type="email"
                      id="email"
                      required
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Tu Mensaje
                    </label>
                    <StyledTextarea
                      id="message"
                      rows="6"
                      required
                      placeholder="Escribe tu consulta aquí..."
                    ></StyledTextarea>
                  </div>
                  <div className="d-grid">
                    <StyledButton type="submit" $variant="primary">
                      Enviar Mensaje
                    </StyledButton>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* --- COLUMNA DE INFORMACIÓN DE CONTACTO --- */}
          <div className="col-lg-5">
            <h3 className="h4 mb-3">Información de Contacto</h3>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <span
                  className="fs-4 me-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <strong>Dirección:</strong>
                  <p
                    className="mb-0"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Av. Siempreviva 742, Springfield
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start mb-3">
                <span
                  className="fs-4 me-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  <FaPhone />
                </span>
                <div>
                  <strong>Teléfono:</strong>
                  <p
                    className="mb-0"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    (+54) 11 1234-5678
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start">
                <span
                  className="fs-4 me-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  <FaEnvelope />
                </span>
                <div>
                  <strong>Email:</strong>
                  <p
                    className="mb-0"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    soporte@techstore.com
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacto;
