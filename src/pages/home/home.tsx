// src/pages/home/Home.tsx (ou o nome que você preferir)
import Nav from "../../components/navbar"; // Use o novo Nav unificado
import styles from "./home.module.css";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // Importe o hook!

// Importe os componentes para AMBAS as versões da home
import MeusAnimais from "./meusAnimais";
import OngsProximas from "./ongsProximas";
import Estatisticas from "../estatisticas";
import NossaMissao from "./nossaMissao";
import SaibaMais from "./saibaMais";


function Home() {
  const { isAuthenticated } = useAuth(); // Obtenha o estado de autenticação!

  return (
    <>
      <Nav />

      {/* Banner com imagem de fundo e texto sobreposto (pode ser o mesmo para ambos) */}
     <section className={isAuthenticated ? styles.bannerUm : styles.bannerTres}>

        <div className={styles.homeTitulo}>
          <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
          <Link to="/adotar" style={{ textDecoration: "none" }}>
            {/* O botão "Adote-me" só aparece para usuários logados */}
            {isAuthenticated && <button className={styles.subtitulo}>Adote-me</button>}
          </Link>
        </div>
      </section>

      {/* AQUI ESTÁ A MÁGICA: Renderiza seções diferentes da página */}
      {isAuthenticated ? (
        // Se estiver LOGADO, mostra os componentes da home logada
        <>
          <MeusAnimais />
          <section className={styles.bannerDois}>
            <div className={styles.paginaDoar}>
              <h2 className={styles.tituloDoar}>Sua contribuição salva vidas!</h2>
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
      ) : (
        // Se NÃO estiver logado, mostra os componentes da página inicial
        <>

      
          <NossaMissao />
          <SaibaMais />
          <Estatisticas />
        </>
      )}

      <Footer />
    </>
  );
}


export default Home;