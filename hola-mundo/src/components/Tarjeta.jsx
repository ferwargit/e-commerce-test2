import Boton from "./BotonPrueba";

function Tarjeta({ titulo, descripcion, botonTexto }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h1>{titulo}</h1>
      <p>{descripcion}</p>
      <Boton texto={botonTexto} color={"black"} />
    </div>
  );
}

export default Tarjeta;
