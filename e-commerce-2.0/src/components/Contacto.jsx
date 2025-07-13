// src/components/Contacto.jsx
import { useState } from 'react'; // Importa useState
import SEO from './SEO';
import { StyledInput, StyledTextarea } from './StyledFormElements';
import { StyledButton } from './Button';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';

const InfoItem = ({ icon, title, children }) => (
  <div className="text-center mb-4">
    <div className="fs-1 mb-2" style={{ color: 'var(--color-primary)' }}>
      {icon}
    </div>
    <h4 style={{ color: 'var(--color-text-primary)' }}>{title}</h4>
    <p className="mb-0" style={{ color: 'var(--color-text-muted)' }}>{children}</p>
  </div>
);

function Contacto() {
  // 1. Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Nueva función de envío para Netlify
  const handleSubmit = (e) => {
    e.preventDefault();

    const formUrlEncoded = new URLSearchParams(formData).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formUrlEncoded
    })
    .then(() => {
      toast.success('¡Gracias por tu mensaje! Te contactaremos pronto.');
      setFormData({ name: '', email: '', message: '' }); // Limpia el estado y los campos
    })
    .catch((error) => {
      toast.error('Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.');
      console.error(error);
    });
  };

  return (
    <>
      <SEO 
        title="Contacto" 
        description="Ponte en contacto con el equipo de TechStore. Estamos aquí para ayudarte con cualquier consulta sobre nuestros productos y servicios."
      />
      <div className="container my-5 py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold" style={{ color: "var(--color-text-primary)" }}>Contáctanos</h1>
          <p className="lead" style={{ color: "var(--color-text-muted)" }}>
            ¿Tienes alguna pregunta? No dudes en escribirnos.
          </p>
        </div>

        <div className="row g-5 justify-content-center align-items-stretch">
          <div className="col-lg-7">
            <div
              className="card h-100"
              style={{
                backgroundColor: "var(--color-background-light)",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
              }}
            >
              <div className="card-body p-4 d-flex flex-column">
                <h3 className="h4 mb-4 text-center" style={{ color: "var(--color-text-primary)" }}>Formulario de Contacto</h3>
                
                {/* 3. Atributos de Netlify añadidos al formulario */}
                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="d-flex flex-column flex-grow-1"
                >
                  <p className="d-none">
                    <label>
                      No llenes esto si eres humano: <input name="bot-field" />
                    </label>
                  </p>
                  
                  {/* 4. Inputs y Textarea ahora son componentes controlados */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tu Nombre</label>
                    <StyledInput type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Tu Email</label>
                    <StyledInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john.doe@example.com" />
                  </div>
                  <div className="mb-3 flex-grow-1 d-flex flex-column">
                    <label htmlFor="message" className="form-label">Tu Mensaje</label>
                    <StyledTextarea id="message" name="message" value={formData.message} onChange={handleChange} rows="6" required placeholder="Escribe tu consulta aquí..." className="flex-grow-1"></StyledTextarea>
                  </div>
                  <div className="d-grid">
                    <StyledButton type="submit" $variant="primary">Enviar Mensaje</StyledButton>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card h-100" style={{ backgroundColor: 'var(--color-background-light)', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <div className="card-body p-4 d-flex flex-column justify-content-center">
                <h3 className="h4 mb-4 text-center" style={{ color: "var(--color-text-primary)" }}>Información Directa</h3>
                <InfoItem icon={<FaMapMarkerAlt />} title="Dirección">
                  Av. Siempreviva 742, Springfield
                </InfoItem>
                <InfoItem icon={<FaPhone />} title="Teléfono">
                  (+54) 11 1234-5678
                </InfoItem>
                <InfoItem icon={<FaEnvelope />} title="Email">
                  soporte@techstore.com
                </InfoItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacto;