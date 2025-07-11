import "./App.css";
import Home from "./layouts/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import ProductosContainer from "./components/ProductosContainer";
import Carrito from "./components/Carrito";
import About from "./components/About";
import Contacto from "./components/Contacto";
import ProductoDetalle from "./components/ProductoDetalle";
import LoginAdmin from "./components/LoginAdmin";
import LoginBoost from "./components/LoginBoost";
import FormularioProducto from "./components/FormularioProducto";
import FormularioEdicion from "./components/FormularioEdicion";
import { useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";
import AdminProductos from "./components/AdminProductos"; // Importa el nuevo componente
import Footer from "./components/Footer"; // Suponiendo que tienes o quieres un footer
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { verificacionLog } = useAuthContext();

  useEffect(() => {
    // Verifica el estado de autenticación del usuario al cargar la aplicación
    verificacionLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="app-container">
        <ToastContainer
          position="top-right"
          autoClose={3000} // El toast se cierra solo después de 3 segundos
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" // ¡Importante para que coincida con nuestro diseño!
        />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginBoost />} />
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/productos" element={<ProductosContainer />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
            <Route path="/admin" element={<AdminProductos />} />
            <Route
              path="/admin/agregarProductos"
              element={<FormularioProducto />}
            />
            <Route
              path="/admin/editarProducto/:id"
              element={<FormularioEdicion />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
