// src/components/Features.jsx
import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

const Feature = ({ icon, title, text }) => (
  <div className="col-md-4 text-center px-4">
    <div className="fs-1 mb-3" style={{ color: "var(--color-primary)" }}>
      {icon}
    </div>
    <h3 className="h4">{title}</h3>
    <p style={{ color: "var(--color-text-muted)" }}>{text}</p>
  </div>
);

function Features() {
  return (
    <div
      style={{
        backgroundColor: "var(--color-background-light)",
        padding: "5rem 0",
      }}
    >
      <div className="container">
        <div className="row">
          <Feature
            icon={<FaShippingFast />}
            title="Envíos Rápidos y Seguros"
            text="Recibe tus productos en tiempo récord y con la máxima protección en todo el país."
          />
          <Feature
            icon={<FaShieldAlt />}
            title="Garantía de Calidad"
            text="Todos nuestros productos son 100% originales y cuentan con garantía oficial."
          />
          <Feature
            icon={<FaHeadset />}
            title="Soporte 24/7"
            text="Nuestro equipo de expertos está disponible para ayudarte con cualquier consulta."
          />
        </div>
      </div>
    </div>
  );
}

export default Features;
