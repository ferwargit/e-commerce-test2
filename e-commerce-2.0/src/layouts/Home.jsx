import SEO from "../components/SEO";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";

function Home() {
  return (
    <>
      <SEO />
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default Home;
