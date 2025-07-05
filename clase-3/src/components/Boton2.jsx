export default function Boton2() {
  function manejarClick() {
    alert("Botón clickeado!");
  }
  return <button onClick={manejarClick}>Hacer clic</button>;
}
// Este componente Boton2 muestra un botón que, al hacer clic, muestra una alerta.
// Puedes usarlo en tu aplicación importándolo y colocándolo donde desees que aparezca el
