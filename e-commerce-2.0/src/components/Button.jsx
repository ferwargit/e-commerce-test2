// src/components/Button.jsx

import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const variants = {
  primary: {
    background: "#007bff",
    hover: "#0056b3",
  },
  success: {
    background: "#28a745",
    hover: "#218838",
  },
  danger: {
    background: "#dc3545",
    hover: "#c82333",
  },
};

const buttonStyles = css`
  /* ... (estilos base sin cambios) ... */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 8px 5px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: background-color 0.2s ease-in-out;

  /* --- INICIO DEL CAMBIO --- */
  /* Cambiamos props.variant a props.$variant */
  background-color: ${(props) =>
    variants[props.$variant || "primary"].background};

  &:hover {
    background-color: ${(props) => variants[props.$variant || "primary"].hover};
  }
  /* --- FIN DEL CAMBIO --- */
`;

// No se necesitan cambios aquí, los estilos se aplican igual
export const StyledButton = styled.button`
  ${buttonStyles}
`;

export const StyledLinkButton = styled(Link)`
  ${buttonStyles}
`;
