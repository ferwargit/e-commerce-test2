// src/components/Card.jsx
import React from "react";
import { StyledLinkButton } from "./Button";
import styled from "styled-components";

// --- COMPONENTES ESTILIZADOS MEJORADOS ---

const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
`;

const StyledCard = styled.div`
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--color-primary);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.1);
    ${CardImage} {
      transform: scale(1.05);
    }
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(
    145deg,
    var(--color-background-light) 0%,
    var(--color-background-dark) 100%
  );
  padding: 1rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid var(--color-border);
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* ¡ESTA LÍNEA ES CLAVE! Hace que el cuerpo de la tarjeta ocupe todo el espacio vertical disponible. */
  padding: 1.5rem; /* Aumentamos el padding para más aire */
  text-align: center; /* Centramos todo el texto por defecto */
`;

const CardTitle = styled.h5`
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
  font-weight: 500;
  /* Reservamos espacio para al menos 2 líneas para evitar "saltos" de layout */
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardPrice = styled.p`
  color: var(--color-text-muted);
  margin-bottom: 1.5rem; /* Más espacio antes del botón */
`;

const ButtonWrapper = styled.div`
  margin-top: auto; /* ¡ESTA ES LA OTRA CLAVE! Empuja el botón al final del contenedor flex. */
`;

// --- COMPONENTE PRINCIPAL ---

function Card({ producto }) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(producto.price);

  return (
    <StyledCard>
      <ImageContainer>
        <CardImage src={producto.image} alt={producto.name} />
      </ImageContainer>
      <CardBody>
        <div>
          {" "}
          {/* Div extra para agrupar título y precio */}
          <CardTitle title={producto.name}>{producto.name}</CardTitle>
          <CardPrice>{formattedPrice}</CardPrice>
        </div>

        <ButtonWrapper>
          <StyledLinkButton to={"/productos/" + producto.id} $variant="primary">
            Ver Detalle
          </StyledLinkButton>
        </ButtonWrapper>
      </CardBody>
    </StyledCard>
  );
}

export default Card;
