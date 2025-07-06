import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Nav from "../components/Nav";
import ProductosContainer from "../components/ProductosContainer";

function Home() {
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
        <ProductosContainer />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
