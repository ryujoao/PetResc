// src/pages/home/Home.tsx
import Nav from "../../components/navbar";
import styles from "./home.module.css";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // Importe seu hook!

// --- COMPONENTES DA HOME PÚBLICA ---
import Estatisticas from "../estatisticas";
import NossaMissao from "./nossaMissao";
import SaibaMais from "./saibaMais";

// --- COMPONENTES DA HOME DO USUÁRIO (HomeUsu) ---
import MeusAnimais from "./meusAnimais";
import OngsProximas from "./ongsProximas";
// (O banner de doação já está no código abaixo)

// --- COMPONENTES DA HOME DA ONG (HomeOng) ---
// (Você precisará criar estes componentes baseados na sua imagem 'image_babd5d.png')
// (Estes são nomes de exemplo, crie os arquivos e importe-os)
// import PedidosDeAdocao from "./pedidosDeAdocao";
// import AnimaisEmLaresTemporarios from "./animaisEmLaresTemporarios";
// import MinhasCampanhas from "./minhasCampanhas";

function Home() {
  // 1. Pegue 'isAuthenticated' E o 'user' completo do contexto
  // 'user' será null se não estiver logado, ou { id, name, email, role } se estiver.
  const { isAuthenticated, user } = useAuth();

  // 2. Lógica de renderização do Banner
  const renderBanner = () => {
    // --- CASO 1: NÃO LOGADO (Público) ---
    if (!isAuthenticated) {
      return (
        <section className={styles.bannerTres}>
          <div className={styles.homeTitulo}>
            <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
            {/* Nenhum botão */}
          </div>
        </section>
      );
    }

    // --- CASO 2: LOGADO COMO USUÁRIO (HomeUsu) ---
    // (Assumindo que o papel NÃO é 'ADMIN')
    if (user && user.role !== "ADMIN") {
      // <--- CHECAGEM AQUI
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

    // --- CASO 3: LOGADO COMO ONG (HomeOng) ---
    // (Assumindo que o papel é 'ADMIN')
    if (user && user.role === "ADMIN") {
      // <--- CHECAGEM AQUI
      return (
        // Você precisará criar este estilo .bannerOng no seu CSS
        <section className={styles.bannerOng}>
          <div className={styles.homeTitulo}>
            <h1 className={styles.titulo}>Apresente um novo amigo ao mundo!</h1>
            <Link to="/cadastrar-animal" style={{ textDecoration: "none" }}>
              <button className={styles.subtitulo}>Cadastrar animal</button>
            </Link>
          </div>
        </section>
      );
    }

    // Fallback (enquanto carrega, etc)
    return <div className={styles.bannerEspera}></div>;
  };

  // 3. Lógica de renderização do Conteúdo da Página
  const renderContent = () => {
    // --- CONTEÚDO PÚBLICO ---
    if (!isAuthenticated) {
      return (
        <>
          <NossaMissao />
          <SaibaMais />
          <Estatisticas />
        </>
      );
    }

    // --- CONTEÚDO DO USUÁRIO (HomeUsu) ---
    if (user && user.role !== "ADMIN") {
      // <--- CHECAGEM AQUI
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
              <button>
                <a href="/doar">Doe agora!</a>
              </button>
            </div>
          </section>
          <OngsProximas />
        </>
      );
    }

    // --- CONTEÚDO DA ONG (HomeOng) ---
    if (user && user.role === "ADMIN") {
      // <--- CHECAGEM AQUI
      return (
        <>
          {/* Aqui entram os novos componentes da imagem 'image_babd5d.png'.
            Você precisará criar os componentes:
            - PedidosDeAdocao
            - AnimaisEmLaresTemporarios
            - AnimaisRegistradosRecentemente
            - AdocoesConcluidas
            - MinhasCampanhas
          */}

          {/* Exemplo de como ficaria (descomente quando criar os componentes) */}
          {/*
          <div className={styles.gridContainerOng}> 
            <PedidosDeAdocao />
            <AnimaisEmLaresTemporarios />
            <AnimaisRegistradosRecentemente />
            <AdocoesConcluidas />
          </div>
          <MinhasCampanhas />
          */}

          {/* Placeholder temporário */}
          <div
            style={{ padding: "50px", textAlign: "center", fontSize: "2rem" }}
          >
            Página da ONG (Em construção)
          </div>
        </>
      );
    }

    // Fallback (nunca deve acontecer se os papéis forem só 'USER' e 'ADMIN')
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
