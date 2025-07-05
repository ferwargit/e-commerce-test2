import "./App.css";
import EquipoTalentoLab from "./components/EquipoTalentoLab";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Main from "./components/Main";
import Nav from "./components/Nav";

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

function App() {
  return (
    <>
      {/* <Nav /> */}
      {/* <Header /> */}
      {/* <Main /> */}
      {/* <Gallery /> */}
      {/* <Footer /> */}
      <EquipoTalentoLab equipo={equipo} />
    </>
  );
}

export default App;
