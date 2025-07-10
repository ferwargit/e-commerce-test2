function About() {
  return (
    // Envuelve todo en un contenedor de Bootstrap para centrar y dar márgenes
    <div className="container my-5 text-center">
      <h1 style={{ color: 'var(--color-text-primary)' }}>Nosotros</h1>
      <p className="lead" style={{ color: 'var(--color-text-muted)' }}>
        Somos una plataforma de comercio electrónico líder
      </p>
      <p className="lead" style={{ color: 'var(--color-text-muted)' }}>
        Nuestra misión es brindar la mejor experiencia de compra en línea
      </p>
    </div>
  );
}

export default About;
