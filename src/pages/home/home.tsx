import styles from "./home.module.css";
import Layout from "../../components/layout";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

// Componentes principais da home
import Estatisticas from "../estatisticas";
import NossaMissao from "./nossaMissao";
import SaibaMais from "./saibaMais";

// Componentes específicos
import MeusAnimais from "./meusAnimais";
import OngsProximas from "./ongsProximas";
import AnimaisCadastrados from "./animaisCadastrados";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  // ------------------- Banner Principal (Topo) -------------------
  const renderBanner = () => {
    if (!isAuthenticated) {
      return (
        <section className={styles.bannerTres}>
          <div className={styles.homeTitulo}>
            <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
          </div>
        </section>
      );
    }

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

    if (user?.role === "ONG" || user?.role === "ADMIN") {
      return (
        <section className={styles.bannerUm}>
          <div className={styles.homeTitulo}>
            <h1 className={styles.titulo}>Apresente um novo amigo ao mundo!</h1>
            <Link to="/registrar-animal" style={{ textDecoration: "none" }}>
              <button className={styles.subtitulo}>Cadastrar Animal</button>
            </Link>
          </div>
        </section>
      );
    }

    return <div className={styles.bannerEspera}></div>;
  };

  // ------------------- Conteúdo (Abaixo do Banner) -------------------
  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <>
          <NossaMissao />
          <SaibaMais />
          <Estatisticas />
        </>
      );
    }

    if (user?.role === "PUBLICO") {
      return (
        <>
          <MeusAnimais />
          <section className={styles.bannerDois}>
            <div className={styles.paginaDoar}>
              <h2 className={styles.tituloDoar}>
                Sua contribuição salva vidas!
              </h2>
              <p>
                Com sua ajuda, conseguimos garantir alimento, cuidados médicos e
                abrigo seguro para animais em situação de abandono.
              </p>
              <div className={styles.divBotaoDoar}>
                <button className={styles.botaoDoar}>
                  <Link to="/doar">Doe agora!</Link>
                </button>
              </div>
            </div>
          </section>
          <OngsProximas />
        </>
      );
    }

    if (user?.role === "ONG" || user?.role === "ADMIN") {
      return (
        <>
          <AnimaisCadastrados />
          {/* BANNER DOIS (ONDE O GATINHO DEVE FICAR) */}
          <section className={styles.bannerDois}>
            
            {/* IMAGEM DO GATINHO (Movi para cá) */}
            <img 
              src="/banners/banner2.png" 
              alt="Gatinho Curioso" 
              className={styles.catImage} 
            />

            <div className={styles.paginaDoar}>
              <h2 className={styles.tituloDoar}>Minhas Campanhas</h2>
              <p>
                Crie novas campanhas para arrecadar doações e ajude a
                transformar a vida de mais animais. Aqui você também encontra
                todas as suas campanhas anteriores.
              </p>
              <div className={styles.botaoWrapper}>
                <button className={styles.botaoDoar}>
                  <Link to="/nova-campanha">Nova Campanha</Link>
                </button>
                <button className={styles.botaoDoar}>
                  <Link to="/campanhas-anteriores">Campanhas Anteriores</Link>
                </button>
              </div>
            </div>
          </section>
        </>
      );
    }

    return <div>Carregando...</div>;
  };

  return (
    <Layout>
      {renderBanner()}
      {renderContent()}
    </Layout>
  );
}