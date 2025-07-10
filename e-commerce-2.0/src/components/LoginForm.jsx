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
    <div className="card shadow-lg border-0" style={{ backgroundColor: 'var(--color-background-light)', borderColor: 'var(--color-border)' }}>
      <div className="card-body p-4">
        <h2 className="card-title text-center mb-4" style={{ color: 'var(--color-text-primary)' }}>{title}</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: 'var(--color-text-muted)' }}>{usernameLabel}</label>
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
              style={{ 
                        backgroundColor: 'var(--color-background-dark)', 
                        color: 'var(--color-text-primary)', 
                        borderColor: 'var(--color-border)' 
                    }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label" style={{ color: 'var(--color-text-muted)' }}>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Ingrese su contraseña"
              required
              style={{ 
                        backgroundColor: 'var(--color-background-dark)', 
                        color: 'var(--color-text-primary)', 
                        borderColor: 'var(--color-border)' 
                    }}
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
