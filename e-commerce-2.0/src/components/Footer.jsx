// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Footer.module.css';
import { useAuthContext } from '../context/AuthContext';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  const { admin } = useAuthContext();
  const currentYear = new Date().getFullYear();

  const AdminFooterLinks = () => (
    <>
      <div className="col-lg-2 col-md-4 col-6">
        <h5 className={styles.footerTitle}>Administración</h5>
        <ul className={styles.footerLinks}>
          <li><Link to="/admin" className={styles.footerLink}>Gestión de Productos</Link></li>
          <li><Link to="/admin/agregarProductos" className={styles.footerLink}>Agregar Productos</Link></li>
        </ul>
      </div>
      <div className="col-lg-2 col-md-4 col-6">
        <h5 className={styles.footerTitle}>Tienda</h5>
        <ul className={styles.footerLinks}>
          <li><Link to="/productos" className={styles.footerLink}>Ver Productos</Link></li>
        </ul>
      </div>
    </>
  );

  const ClientFooterLinks = () => (
    <>
      <div className="col-lg-2 col-md-4 col-6">
        <h5 className={styles.footerTitle}>Tienda</h5>
        <ul className={styles.footerLinks}>
          <li><Link to="/productos" className={styles.footerLink}>Productos</Link></li>
          <li><Link to="/carrito" className={styles.footerLink}>Carrito</Link></li>
        </ul>
      </div>
      <div className="col-lg-2 col-md-4 col-6">
        <h5 className={styles.footerTitle}>Empresa</h5>
        <ul className={styles.footerLinks}>
          <li><Link to="/nosotros" className={styles.footerLink}>Nosotros</Link></li>
          <li><Link to="/contacto" className={styles.footerLink}>Contacto</Link></li>
        </ul>
      </div>
    </>
  );

  return (
    <>
      <footer className={styles.footerMain}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4 col-md-12">
              <h5 className={styles.footerTitle}>TechStore</h5>
              <p>
                {admin 
                  ? "Panel de Administración del E-commerce."
                  : "Tu tienda de confianza para los mejores productos de tecnología. Innovación y calidad al alcance de tu mano."
                }
              </p>
            </div>
            
            {admin ? <AdminFooterLinks /> : <ClientFooterLinks />}

            <div className="col-lg-4 col-md-4">
              <h5 className={styles.footerTitle}>Síguenos</h5>
              {/* --- INICIO DE LA CORRECCIÓN --- */}
              {/* Eliminamos la clase 'justify-content-md-start' para que siempre esté centrado */}
              <div className={`${styles.socialIcons} justify-content-center`}>
                <a href="#" className={styles.socialIcon} aria-label="Facebook"><FaFacebook /></a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram"><FaInstagram /></a>
                <a href="#" className={styles.socialIcon} aria-label="Twitter"><FaTwitter /></a>
                <a href="#" className={styles.socialIcon} aria-label="LinkedIn"><FaLinkedin /></a>
              </div>
              {/* --- FIN DE LA CORRECCIÓN --- */}
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
