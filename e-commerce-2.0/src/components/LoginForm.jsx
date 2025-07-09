// src/components/LoginForm.jsx

import React from "react";
import { StyledButton } from "./Button"; // Usaremos nuestro botón estilizado para consistencia

function LoginForm({
  title,
  onSubmit,
  buttonText,
  usernameLabel = "Email:", // Default a 'Email'
  usuario,
  setUsuario,
  password,
  setPassword,
}) {
  return (
    <div className="card shadow-lg border-0">
      <div className="card-body p-4">
        <h2 className="card-title text-center mb-4">{title}</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">{usernameLabel}</label>
            <input
              type={usernameLabel === "Email:" ? "email" : "text"}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="form-control"
              placeholder={
                usernameLabel === "Email:"
                  ? "Ingrese su email"
                  : "Ingrese su usuario"
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <div className="d-grid">
            <StyledButton type="submit" $variant="primary">
              {buttonText}
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
