import "./App.css";
import BotonPrueba from "./components/BotonPrueba";
import ListaDeUsuarios from "./components/ListaDeUsuarios";

function App() {
  return (
    <>
      <ListaDeUsuarios />
      <BotonPrueba texto="Texto del botón" color="blue" />
    </>
  );
}

export default App;
