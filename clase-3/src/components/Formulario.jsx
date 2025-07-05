import { useState } from "react";
// Componente Formulario que maneja el estado del input y envía el formulario
// Importante: Asegúrate de que el archivo se llame Form.jsx y no Form.js
// para que React lo reconozca como un componente de clase.

export default function Formulario() {
  // Estado para almacenar el nombre ingresado en el input
  const [nombre, setNombre] = useState("");

  // Función que maneja el envío del formulario y muestra una alerta con el nombre ingresado
  function manejarEnvio(evento) {
    evento.preventDefault();
    alert(`Formulario enviado por: ${nombre}`);
    setNombre(""); // Limpia el input después de enviar
  }

  // Renderiza un formulario con un input y un botón de envío
  // El input actualiza el estado 'nombre' al cambiar su valor
  // El botón envía el formulario al hacer clic
  // El formulario previene el comportamiento por defecto del envío para manejarlo con JavaScript
  return (
    <form onSubmit={manejarEnvio}>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Ingresa tu nombre"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
