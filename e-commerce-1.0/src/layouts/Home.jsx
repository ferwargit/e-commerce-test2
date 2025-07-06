import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import ProductosContainer from "../components/ProductosContainer";

function Home() {
  return (
    <div>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
      <div>
        <ProductosContainer />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
