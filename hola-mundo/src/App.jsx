import "./App.css";
import ListaProductos from "./components/ListaProductos";

function App() {
  return (
    <>
      <ListaProductos
        productos={["Agua", "Yerba", "Coca-Cola", "Fernet", "Galletitas"]}
      />
    </>
  );
}

export default App;
