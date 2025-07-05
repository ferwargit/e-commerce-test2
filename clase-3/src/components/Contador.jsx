import React, { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  function sumarContador() {
    setContador(contador + 1);
  }

  return (
    <div>
      <p>Valor del contador: {contador}</p>
      {/* <button onClick={() => setContador(contador + 1)}>Incrementar</button> */}
      <button onClick={sumarContador}>Incrementar</button>
    </div>
  );
}
export default Contador;
