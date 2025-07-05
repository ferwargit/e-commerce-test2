import "../styles/equipo.css";

function EquipoTalentoLab({ equipo }) {
  return (
    <>
      <div className="team-container">
        {equipo.map((persona, index) => (
          <div key={index} className="team-card">
            {/* Aquí puedes agregar estilos CSS para personalizar la presentación */}
            <div>
              <h3>{persona.nombre}</h3>
              <p>{persona.rol}</p>
            </div>
            <div>
              <img
                className="team-image"
                src={persona.imagen}
                alt={persona.nombre}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EquipoTalentoLab;
