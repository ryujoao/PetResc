import Footer from "../../components/footer";
import Nav from "../../components/navbar";
import styles from "./doar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // 1. Importar o useAuth

// --- COMPONENTE PARA VISÃO DO USUÁRIO ('PUBLICO') ---
// (Este é o código que você já tinha, sem alterações)
const DoarUsuarioView = () => {
  return (
    <>
      <div className={styles.pagDoar}>
        <h1 className={styles.tituloDoar}>
          Veja a Diferença Que Você Pode Fazer
        </h1>
        <h2 className={styles.subtitle}>
          No PetResc, você pode apoiar diretamente as ONGs cadastradas. Cada
          contribuição ajuda a oferecer alimentação, cuidados médicos e abrigo
          para animais em situação de vulnerabilidade. Escolha a ONG que mais
          toca seu coração e faça parte dessa rede de solidariedade.
        </h2>
        {/* cards de estatísticas */}
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img
              src="../../../public/doar/campanhas.png"
              alt="Campanhas realizadas"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>85</p>
            <p className={styles.cardSubtext}>Campanhas Realizadas</p>
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/doarImg.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/doadores.png"
              alt="Doadores ativos"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>157</p>
            <p className={styles.cardSubtext}>Doadores Ativos</p>
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/doarImg2.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/valor.png"
              alt="Valor arrecadado"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>R$ 78.446,96</p>
            <p className={styles.cardSubtext}>Valor Arrecadado</p>
          </div>
        </div>
      </div>

      <div className={styles.pagInstituicoes}>
        <h1 className={styles.tituloInstituicoes}>Mais Populares</h1>
        <div className={styles.cardInstituicoes}>
          {/* ... (Seu código .map() para 'Mais Populares' continua o mesmo) ... */}
          {[
            {
              id: "caramelo",
              nome: "Instituto Caramelo",
              endereco:
                "Rua José Felix de Oliveira, 1234 – Granja Viana, Cotia – SP",
              imagem: "../../../public/institutos/institutoCaramelo.png",
              arrecadado: 8104.64,
              meta: 16000,
            },
            {
              id: "suipa",
              nome: "SUIPA",
              endereco:
                "Av. Dom Hélder Câmara, 1801 – Benfica, Rio de Janeiro – RJ",
              imagem: "../../../public/institutos/suipa.png",
              arrecadado: 12000,
              meta: 20000,
            },
          ].map((inst, index) => (
            <Link
              key={index}
              to={`/instituto/${inst.id}`}
              className={styles.instituicoes}
            >
              <img
                src={inst.imagem}
                alt={inst.nome}
                className={styles.imgInstituicoes}
              />
              <h2 className={styles.nomeInstituicoes}>{inst.nome}</h2>
              <p className={styles.enderecoInstituicoes}>
                <div className={styles.iconLocal}>{/* ícone */}</div>
                {inst.endereco}
              </p>
              <progress value={inst.arrecadado} max={inst.meta}></progress>
              <p className={styles.valorInstituicoes}>
                R$ {inst.arrecadado.toLocaleString("pt-BR")} / R$
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </Link>
          ))}
        </div>

        <h1 className={styles.tituloInstituicoes}>Novas Campanhas</h1>
        <div className={styles.cardInstituicoes}>
          {/* ... (Seu código .map() para 'Novas Campanhas' continua o mesmo) ... */}
          {[
            {
              id: "ampara",
              nome: "Instituto Ampara Animal",
              endereco:
                "Rua José Felix de Oliveira, 1234 – Granja Viana, Cotia – SP",
              imagem: "/ampara.png",
              arrecadado: 4500,
              meta: 10000,
            },
            {
              id: "patasdadas",
              nome: "Patas Dadas",
              endereco:
                "Av. Dom Hélder Câmara, 1801 – Benfica, Rio de Janeiro – RJ",
              imagem: "/patasdadas.png",
              arrecadado: 8104.64,
              meta: 16000,
            },
          ].map((inst, index) => (
            <Link
              key={index}
              to={`/instituto/${inst.id}`}
              className={styles.instituicoes}
            >
              <img
                src={inst.imagem}
                alt={inst.nome}
                className={styles.imgInstituicoes}
              />
              <h2 className={styles.nomeInstituicoes}>{inst.nome}</h2>
              <p className={styles.enderecoInstituicoes}>
                <div className={styles.iconLocal}>{/* ícone */}</div>
                {inst.endereco}
              </p>
              <progress value={inst.arrecadado} max={inst.meta}></progress>
              <p className={styles.valorInstituicoes}>
                R$ {inst.arrecadado.toLocaleString("pt-BR")} / R$
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

// --- COMPONENTE PARA VISÃO DA ONG ('ONG' / 'ADMIN') ---
// (Este é o novo componente, baseado na Imagem 2)
const DoarOngView = () => {
  return (
    <>
      <div className={styles.pagDoar}>
        <h1 className={styles.tituloDoar}>
          Veja a Diferença Que Você Pode Fazer
        </h1>
        <h2 className={styles.subtitle}>
          No PetResc, você pode apoiar diretamente as ONGs cadastradas. Cada
          contribuição ajuda a oferecer alimentação, cuidados médicos e abrigo
          para animais em situação de vulnerabilidade. Escolha a ONG que mais
          toca seu coração e faça parte dessa rede de solidariedade.
        </h2>
        {/* cards de estatísticas */}
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img
              src="../../../public/doar/campanhas.png"
              alt="Campanhas realizadas"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>85</p>
            <p className={styles.cardSubtext}>Campanhas Realizadas</p>
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/doarImg.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/doadores.png"
              alt="Doadores ativos"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>157</p>
            <p className={styles.cardSubtext}>Doadores Ativos</p>
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/doarImg2.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/valor.png"
              alt="Valor arrecadado"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>R$ 78.446,96</p>
            <p className={styles.cardSubtext}>Valor Arrecadado</p>
          </div>
        </div>
      </div>

      <section className={styles.bannerNovaCampanha}>
          <p className={styles.textoEsquerda}>
            Sua doação é muito mais do que um simples gesto de solidariedade —
            ela é o que nos permite alimentar, tratar e proteger cada um dos
            nossos animais resgatados, garantindo que tenham acesso a cuidados
            veterinários, alimentação de qualidade e um ambiente seguro onde
            possam se recuperar física e emocionalmente.
          </p>
          <p className={styles.textoDireita}>
            Crie novas campanhas para arrecadar doações e ajude a transformar a
            vida de mais animais. Aqui você também encontra todas as suas
            campanhas anteriores, com relatórios e histórico de contribuições.
            
          </p>
          
      </section>
    </>
  );
};

// --- COMPONENTE PRINCIPAL 'DOAR' ---
export default function Doar() {
  // 2. Usar o hook para pegar o usuário
  const { isAuthenticated, user } = useAuth();

  // 3. Decidir se é uma ONG ou Admin
  const isOng =
    isAuthenticated && (user?.role === "ONG" || user?.role === "ADMIN");

  return (
    <>
      <Nav />
      {/* 4. Renderizar o componente correto baseado no 'role' */}
      {isOng ? <DoarOngView /> : <DoarUsuarioView />}
      <Footer />
    </>
  );
}
