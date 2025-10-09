import Footer from "../../components/footer";
import Nav from "../../components/navbar";
import styles from "./doar.module.css";
import { Link } from "react-router-dom";

export default function Doar() {
  return (
    <>
      <Nav />

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
          {" "}
          <div className={styles.card}>
            {" "}
            <img
              src="../../../public/doar/campanhas.png"
              alt="Campanhas realizadas"
              className={styles.cardImage}
            />{" "}
            <p className={styles.cardText}>85</p>{" "}
            <p className={styles.cardSubtext}>Campanhas Realizadas</p>{" "}
          </div>{" "}
          <div className={styles.card}>
            {" "}
            <img
              src="../../../public/doar/doarImg.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />{" "}
          </div>{" "}
          <div className={styles.card}>
            {" "}
            <img
              src="../../../public/doar/doadores.png"
              alt="Doadores ativos"
              className={styles.cardImage}
            />{" "}
            <p className={styles.cardText}>157</p>{" "}
            <p className={styles.cardSubtext}>Doadores Ativos</p>{" "}
          </div>{" "}
          <div className={styles.card}>
            {" "}
            <img
              src="../../../public/doar/doarImg2.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />{" "}
          </div>{" "}
          <div className={styles.card}>
            {" "}
            <img
              src="../../../public/doar/valor.png"
              alt="Valor arrecadado"
              className={styles.cardImage}
            />{" "}
            <p className={styles.cardText}>R$ 78.446,96</p>{" "}
            <p className={styles.cardSubtext}>Valor Arrecadado</p>{" "}
          </div>{" "}
        </div>{" "}
      </div>

      <div className={styles.pagInstituicoes}>
        <h1 className={styles.tituloInstituicoes}>Mais Populares</h1>
        <div className={styles.cardInstituicoes}>
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
                R$ {inst.arrecadado.toLocaleString("pt-BR")} / R${" "}
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </Link>
          ))}
        </div>

        <h1 className={styles.tituloInstituicoes}>Novas Campanhas</h1>
        <div className={styles.cardInstituicoes}>
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
                R$ {inst.arrecadado.toLocaleString("pt-BR")} / R${" "}
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
