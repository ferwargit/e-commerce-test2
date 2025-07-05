import "../styles/galeriaIntereses.css";

function GaleriaIntereses({ intereses }) {
  var color = "black";
  function cambiarColor() {
    console.log("Cambiando color del botón");
    if (color === "black") {
      color = "blue";
    } else {
      color = "black";
    }
  }

  return (
    <div className="intereses-container">
      {intereses.map((interes, index) => (
        <div key={index}>
          <button onClick={cambiarColor} className="boton-interes">
            {interes}
          </button>
        </div>
      ))}
    </div>
  );
}

export default GaleriaIntereses;
