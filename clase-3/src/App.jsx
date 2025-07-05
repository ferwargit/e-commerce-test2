import "./App.css";
import EquipoTalentoLab from "./components/EquipoTalentoLab";
import TarjetaProyecto from "./components/TarjetaProyecto";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Main from "./components/Main";
import Nav from "./components/Nav";
import GaleriaIntereses from "./components/GaleriaIntereses";
import Contador from "./components/Contador";
import Boton2 from "./components/Boton2";

const equipo = [
  {
    nombre: "Silvia",
    rol: "Product Owner",
    imagen:
      "https://passport-photo.online/_optimized/prepare3.42b48b3d-opt-1920.WEBP",
  },
  {
    nombre: "Luis",
    rol: "Diseñador UX/UI",
    imagen:
      "https://passport-photo.online/_optimized/prepare3.42b48b3d-opt-1920.WEBP",
  },
  {
    nombre: "Matías",
    rol: "Desarrollador",
    imagen:
      "https://passport-photo.online/_optimized/prepare3.42b48b3d-opt-1920.WEBP",
  },
  {
    nombre: "Sabrina",
    rol: "Desarrolladora",
    imagen:
      "https://passport-photo.online/_optimized/prepare3.42b48b3d-opt-1920.WEBP",
  },
];

const intereses = ["React", "JavaScript", "APIs", "Diseño UX", "Node.js"];

function App() {
  return (
    <>
      {/* <Nav /> */}
      {/* <Header /> */}
      {/* <Main /> */}
      {/* <Gallery /> */}
      {/* <Footer /> */}
      <EquipoTalentoLab equipo={equipo} />
      <TarjetaProyecto
        titulo="Plataforma de Gestión"
        descripcion="Una herramienta para optimizar la gestión de equipos."
        botonTexto="Explorar proyecto"
      />
      <GaleriaIntereses intereses={intereses} />
      <Contador />
      <Boton2 />
    </>
  );
}

export default App;
