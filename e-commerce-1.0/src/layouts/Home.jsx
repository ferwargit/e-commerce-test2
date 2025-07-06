import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Nav from "../components/Nav";
import ProductosContainer from "../components/ProductosContainer";
import imagen from "../assets/imagen.jpg";
import imagen2 from "../../public/imagenes/imagen2.jpg";

function Home() {
  const productos = [
    {
      id: 1,
      nombre: "Producto 1",
      descripcion: "Descripción del Producto 1",
      precio: 100,
      imagen:
        "https://cdn.pixabay.com/photo/2021/01/06/07/46/lipstick-5893456_1280.jpg",
    },
    {
      id: 2,
      nombre: "Producto 2",
      descripcion: "Descripción del Producto 2",
      precio: 200,
      imagen:
        "https://cdn.pixabay.com/photo/2021/08/03/06/47/perfume-6518634_1280.jpg",
    },
    {
      id: 3,
      nombre: "Producto 3",
      descripcion: "Descripción del Producto 3",
      precio: 300,
      imagen:
        "https://cdn.pixabay.com/photo/2017/03/02/02/46/glasses-2110274_1280.jpg",
    },
    {
      id: 4,
      nombre: "Producto 4",
      descripcion: "Descripción del Producto 4",
      precio: 400,
      imagen:
        "https://cdn.pixabay.com/photo/2017/07/01/20/51/mug-2462665_1280.png",
    },
    {
      id: 5,
      nombre: "Producto 5",
      descripcion: "Descripción del Producto 5",
      precio: 500,
      imagen: imagen,
    },
    {
      id: 6,
      nombre: "Producto 6",
      descripcion: "Descripción del Producto 6",
      precio: 600,
      imagen: imagen2,
    },
  ];
  return (
    <div>
      <div>
        <Nav />
        <Header />
        <Main />
        <Footer />
      </div>
      <div>
        <Nav />
        <ProductosContainer productos={productos} />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
