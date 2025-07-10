// src/components/Footer.jsx
import "../styles/Footer.css"; // Importa el nuevo archivo CSS

function Footer() {
  const currentYear = new Date().getFullYear(); // Para que el año sea dinámico

  return (
    <footer className="main-footer">
      <p>© {currentYear} - TechStore</p> {/* Cambié el nombre para que coincida */}
    </footer>
  );
}

export default Footer;