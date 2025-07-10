// src/components/Card.jsx
import React from "react";
import { StyledLinkButton } from "./Button";
import styled from 'styled-components';

// Componente estilizado para la tarjeta (sin cambios)
const StyledCard = styled.div`
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
`;

// --- INICIO DE LA MEJORA ---

// 1. Creamos un contenedor para la imagen
const ImageContainer = styled.div`
  width: 100%;
  height: 220px; /* Podemos darle un poco más de altura */
  display: flex; /* Para centrar la imagen dentro */
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa; /* Un fondo gris muy sutil */
  overflow: hidden; /* Asegura que nada se salga */
  padding: 1rem; /* Añade un espacio de aire alrededor de la imagen */
`;

// 2. Modificamos el componente de la imagen
const CardImage = styled.img`
  max-width: 100%; /* La imagen no puede ser más ancha que el contenedor */
  max-height: 100%; /* La imagen no puede ser más alta que el contenedor */
  object-fit: contain; /* ¡La propiedad clave! Asegura que toda la imagen se vea */
`;
// --- FIN DE LA MEJORA ---


function Card({ producto }) {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(producto.price);

  return (
    <StyledCard className="card h-100 border-0 shadow-sm">
      {/* 3. Usamos la nueva estructura de imagen */}
      <ImageContainer>
        <CardImage src={producto.image} alt={producto.name} />
      </ImageContainer>
      <div className="card-body d-flex flex-column p-3">
        {/* Usamos text-truncate para cortar títulos muy largos con '...' */}
        <h5 className="card-title text-truncate">{producto.name}</h5>
        <p className="card-text text-muted mb-3">{formattedPrice}</p>
        
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
