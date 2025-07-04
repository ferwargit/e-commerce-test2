import "./App.css";
import ListaProductos from "./components/ListaProductos";
import Tarjeta from "./components/Tarjeta";

function App() {
  return (
    <>
      <ListaProductos
        productos={["Agua", "Yerba", "Coca-Cola", "Fernet", "Galletitas"]}
      />
      <Tarjeta
        titulo="Bienvenido a la Tienda"
        descripcion="Aquí encontrarás los mejores productos."
        botonTexto="Comprar Ahora"
      />
    </>
  );
}

export default App;
