import styles from "./home.module.css";
import Layout from "../../components/layout";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

import Estatisticas from "../estatisticas";
import NossaMissao from "./nossaMissao";
import SaibaMais from "./saibaMais";

// --- COMPONENTES DAS HOMES LOGADAS ---
import MeusAnimais from "./meusAnimais"; // Para o 'PUBLICO'
import OngsProximas from "./ongsProximas"; // Para o 'PUBLICO'
import AnimaisCadastrados from "./animaisCadastrados"; // <-- 1. IMPORTE O COMPONENTE DA ONG


function Home() {
  // 1. Pegue 'isAuthenticated' E o 'user' completo do contexto
  const { isAuthenticated, user } = useAuth();

  // 2. Lógica de renderização do Banner
  const renderBanner = () => {
    // NÃO LOGADO
    if (!isAuthenticated) {
      return (
        <section className={styles.bannerTres}>
          <div className={styles.homeTitulo}>
            <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
          </div>
        </section>
      );
    }

    // LOGADO COMO USUÁRIO (HomeUsu)
    if (user && user.role === "PUBLICO") {
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

    // LOGADO COMO ONG ou ADMIN (HomeOng)
    if (user && (user.role === "ONG" || user.role === "ADMIN")) {
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

    // Fallback (enquanto carrega, etc)
    return <div className={styles.bannerEspera}></div>; // Um banner neutro
  };

  // 3. Lógica de renderização do Conteúdo da Página
  const renderContent = () => {
    // CONTEÚDO NÃO LOGADO
    if (!isAuthenticated) {
      return (
        <>
          <NossaMissao />
          <SaibaMais />
          <Estatisticas />
        </>
      );
    }

    // CONTEÚDO DO USUÁRIO (HomeUsu)
    if (user && user.role === "PUBLICO") {
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
                abrigo seguro para animais em situação de abandono. Cada
                contribuição é essencial para que eles tenham uma nova chance de
                vida cheia de carinho e dignidade.
              </p>
              <div className={styles.buttonWrapper}>
                <button>
                  <a href="/doar">Doe agora!</a>
                </button>
              </div>
            </div>
          </section>
          <OngsProximas />
        </>
      );
    }

    // CONTEÚDO DA ONG (HomeOng)
    if (user && (user.role === "ONG" || user.role === "ADMIN")) {
      return (
        <>
          <AnimaisCadastrados />
          <section className={styles.bannerDois}>
            <div className={styles.paginaDoar}>
              <h2 className={styles.tituloDoar}>Minhas Campanhas</h2>
              <p>
                Crie novas campanhas para arrecadar doações e ajude a
                transformar a vida de mais animais. Aqui você também encontra
                todas as suas campanhas anteriores, com relatórios e histórico
                de contribuições.
              </p>
              <div className={styles.buttonWrapper}>
                <button>
                  <a href="/nova-campanha">Nova Campanha</a>
                </button>
                <button>
                  <a href="/campanhas-anteriores">Campanhas Anteriores</a>
                </button>
              </div>
            </div>
          </section>
        </>
      );
    }

    // Fallback
    return <div>Carregando...</div>;
  };

  return (
    <>
      <Layout>
      {renderBanner()}
      {renderContent()}
      </Layout>
    </>
  );
}

export default Home;
