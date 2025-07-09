import { StyledLinkButton } from "./Button"; // Importamos nuestro botón-enlace
import styled from "styled-components";

// Creamos un componente estilizado para la tarjeta para añadirle una transición
const StyledCard = styled.div`
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 100%; // Asegura que la tarjeta ocupe toda la columna

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

// Componente para la imagen, para controlar su tamaño y ajuste
const CardImage = styled.img`
  width: 100%;
  height: 200px; /* Altura fija para todas las imágenes */
  object-fit: cover; /* Asegura que la imagen cubra el área sin deformarse */
`;

function Card({ producto }) {
  // Formateador de moneda para un look más profesional
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(producto.price);

  return (
    <StyledCard className="card h-100 border-0 shadow-sm">
      <CardImage
        src={producto.image}
        className="card-img-top"
        alt={producto.name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.name}</h5>
        <p className="card-text text-muted mb-3">{formattedPrice}</p>

        {/* Usamos mt-auto para empujar el botón al final de la tarjeta */}
        <div className="mt-auto text-center">
          <StyledLinkButton to={"/productos/" + producto.id} $variant="primary">
            Ver Detalle
          </StyledLinkButton>
        </div>
      </div>
    </StyledCard>
  );
}

export default Card;
