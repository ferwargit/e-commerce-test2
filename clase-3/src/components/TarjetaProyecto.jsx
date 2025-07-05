import Boton from "./BotonPrueba";
import "../styles/tarjetaProyecto.css";

function TarjetaProyecto({ titulo, descripcion, botonTexto }) {
  return (
    <div className="project-container">
      <h2 className="project-title">{titulo}</h2>
      <p>{descripcion}</p>
      <Boton titulo={titulo} texto={botonTexto} color="blue" />
    </div>
  );
}

export default TarjetaProyecto;
