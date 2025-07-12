// src/components/Footer.jsx
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className={styles.footerMain}>
        <div className="container">
          <div className="row g-5">
            {/* Columna de la Marca */}
            <div className="col-lg-4 col-md-12">
              <h5 className={styles.footerTitle}>TechStore</h5>
              <p>
                Tu tienda de confianza para los mejores productos de tecnología.
                Innovación y calidad al alcance de tu mano.
              </p>
            </div>

            {/* Columna de Navegación */}
            <div className="col-lg-2 col-md-4 col-6">
              <h5 className={styles.footerTitle}>Tienda</h5>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/productos" className={styles.footerLink}>
                    Productos
                  </Link>
                </li>
                <li>
                  <Link to="/carrito" className={styles.footerLink}>
                    Carrito
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna de Empresa */}
            <div className="col-lg-2 col-md-4 col-6">
              <h5 className={styles.footerTitle}>Empresa</h5>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/nosotros" className={styles.footerLink}>
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link to="/contacto" className={styles.footerLink}>
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna de Redes Sociales */}
            <div className="col-lg-4 col-md-4">
              <h5 className={styles.footerTitle}>Síguenos</h5>

              <div
                className={`${styles.socialIcons} justify-content-center`}
              >
                <a href="#" className={styles.socialIcon} aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className={styles.socialIcon}
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a href="#" className={styles.socialIcon} aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className={styles.footerCopyright}>
        <p className={styles.copyrightText}>
          © {currentYear} - TechStore. Todos los derechos reservados.
        </p>
      </div>
    </>
  );
}

export default Footer;
