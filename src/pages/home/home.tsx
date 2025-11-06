import Nav from "../../components/navbar";
import styles from "./home.module.css";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; 
import Estatisticas from "../estatisticas";
import NossaMissao from "./nossaMissao";
import SaibaMais from "./saibaMais";
import MeusAnimais from "./meusAnimais"; 
import AnimaisCadastrados from "./animaisCadastrados";

function Home() {
  const { isAuthenticated, user } = useAuth();

  // Lógica de renderização do Banner
  const renderBanner = () => {
    console.log('Current user:', user); // Debug log
    
    // CASO 1: NÃO LOGADO (Público)
    if (!isAuthenticated) {
      return (
        <section className={styles.bannerTres}>
          <div className={styles.homeTitulo}>
            <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
          </div>
        </section>
      );
    }

    // CASO 2: LOGADO COMO USUÁRIO
    if (user?.role === "PUBLICO") {
      return (
        <section className={styles.bannerUm}>
          <div className={styles.homeTitulo}>
            <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
            <Link to="/adotar" style={{ textDecoration: "none" }}>
              <button className={styles.subtitulo}>Adote-me</button>
            </Link>
          </div>
        </section>
      );
    }

    // CASO 3: LOGADO COMO ONG ou ADMIN
    if (user?.role === "ONG" || user?.role === "ADMIN") {
      return (
        <section className={styles.bannerUm}>
          <div className={styles.homeTitulo}>
            <h1 className={styles.titulo}>Apresente um novo amigo ao mundo!</h1>
            <Link to="/registrarAnimal" style={{ textDecoration: "none" }}>
              <button className={styles.subtitulo}>Cadastrar Animal</button>
            </Link>
          </div>
        </section>
      );
    }

    // Fallback
    return <div className={styles.bannerEspera}></div>;
  };

  // Lógica de renderização do Conteúdo
  const renderContent = () => {
    console.log('Rendering content for role:', user?.role); // Debug log

    // Conteúdo Público
    if (!isAuthenticated) {
      return (
        <>
          <NossaMissao />
          <SaibaMais />
          <Estatisticas />
        </>
      );
    }

    // Conteúdo do Usuário
    if (user?.role === "PUBLICO") {
      return <MeusAnimais />;
    }

    // Conteúdo da ONG/Admin
    if (user?.role === "ONG" || user?.role === "ADMIN") {
      return <AnimaisCadastrados />;
    }

    // Fallback
    return <div>Carregando...</div>;
  };

  return (
    <>
      <Nav />
      {renderBanner()}
      {renderContent()}
      <Footer />
    </>
  );
}

export default Home;