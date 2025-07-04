import "./App.css";
import Boton from "./components/BotonPrueba";
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
      <div>
        <Boton texto="Agregar al Carrito" color="green" />
        <Boton texto="Ver Detalles" color="blue" />
        <Boton texto="Eliminar" color="red" />
      </div>
    </>
  );
}

export default App;
