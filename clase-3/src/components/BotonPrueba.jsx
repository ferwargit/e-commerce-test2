function BotonPrueba({ texto, color, titulo }) {
  function mensaje() {
    alert("Explorando: " + titulo);
  }

  const estilo = {
    backgroundColor: color,
    color: "white",
    padding: "10px",
    border: "none",
  };
  return (
    <button onClick={mensaje} style={estilo}>
      {texto}
    </button>
  );
}

export default BotonPrueba;
