import Boton from "./BotonPrueba";
import "../styles/tarjetaProyecto.css";

function TarjetaProyecto({ titulo, descripcion, botonTexto }) {
  return (
    <div className="project-container">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
      <Boton texto={botonTexto} color="blue" />
    </div>
  );
}

export default TarjetaProyecto;
