// src/components/Card.jsx
import React from "react";
import { StyledLinkButton } from "./Button";
import styled from "styled-components";

// Usamos los nuevos colores de fondo y borde
const StyledCard = styled.div`
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  transition: transform 0.2s ease-in-out, border-color 0.2s ease-in-out;
  width: 100%;
  border-radius: 12px; // Bordes más redondeados y modernos

  &:hover {
    transform: translateY(-5px);
    border-color: var(--color-primary);
  }
`;

// --- INICIO DE LA MEJORA ---

// 1. Creamos un contenedor para la imagen
const ImageContainer = styled.div`
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white; // Un fondo blanco para que resalten los productos
  overflow: hidden;
  padding: 1rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

// 2. Modificamos el componente de la imagen
const CardImage = styled.img`
  max-width: 100%; /* La imagen no puede ser más ancha que el contenedor */
  max-height: 100%; /* La imagen no puede ser más alta que el contenedor */
  object-fit: contain; /* ¡La propiedad clave! Asegura que toda la imagen se vea */
`;
// --- FIN DE LA MEJORA ---

function Card({ producto }) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(producto.price);

  return (
    <StyledCard className="h-100 border-0 shadow-sm">
      {/* 3. Usamos la nueva estructura de imagen */}
      <ImageContainer>
        <CardImage src={producto.image} alt={producto.name} />
      </ImageContainer>
      <div className="card-body d-flex flex-column p-4">
        {/* Usamos text-truncate para cortar títulos muy largos con '...' */}
        <h5
          className="card-title text-truncate"
          style={{ color: "var(--color-text-primary)" }}
        >
          {producto.name}
        </h5>
        <p
          className="card-text mb-3"
          style={{ color: "var(--color-text-muted)" }}
        >
          {formattedPrice}
        </p>

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
