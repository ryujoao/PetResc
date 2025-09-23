import Nav from "../components/navindex";
import styles from "../style/home.module.css";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      <Nav />

      {/* Banner com imagem de fundo e texto sobreposto */}
      <section className={styles.bannerUm}>
        <div className={styles.homeTitulo}>
          <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
          <Link to="/adotar" style={{ textDecoration: "none" }}>
          </Link>
        </div>
      </section>

     

      <Footer />
    </>
  );
}

export default Index;
