import Footer from "../../components/footer";
import Nav from "../../components/navbar";
import styles from "./doar.module.css";

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

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img
              src="/campanhas.png"
              alt="Campanhas realizadas"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>85</p>
            <p className={styles.cardSubtext}>Campanhas Realizadas</p>
          </div>

          <div className={styles.card}>
            <img
              src="/doarImg.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>

          <div className={styles.card}>
            <img
              src="/doadores.png"
              alt="Doadores ativos"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>157</p>
            <p className={styles.cardSubtext}>Doadores Ativos</p>
          </div>

          <div className={styles.card}>
            <img
              src="/doarImg2.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>

          <div className={styles.card}>
            <img
              src="/valor.png"
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
          {[
            {
              nome: "Instituto Caramelo",
              endereco:
                "Rua José Felix de Oliveira, 1234 – Granja Viana, Cotia – SP, 06709-400",
              imagem: "/institutoCaramelo.png",
              arrecadado: 8104.64,
              meta: 16000,
            },
            {
              nome: "SUIPA",
              endereco:
                "Av. Dom Hélder Câmara, 1801 – Benfica, Rio de Janeiro – RJ",
              imagem: "/suipa.png",
              arrecadado: 12000,
              meta: 20000,
            },
          ].map((inst, index) => (
            <div key={index} className={styles.instituicoes}>
              <img
                src={inst.imagem}
                alt={inst.nome}
                className={styles.imgInstituicoes}
              />
              <h2 className={styles.nomeInstituicoes}>{inst.nome}</h2>
              <p className={styles.enderecoInstituicoes}>
                <div className={styles.iconLocal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                </div>
                {inst.endereco}
              </p>
              <progress value={inst.arrecadado} max={inst.meta}></progress>
              <p className={styles.valorInstituicoes}>
                R$ {inst.arrecadado.toLocaleString("pt-BR")} / R${" "}
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </div>
          ))}
        </div>

        <h1 className={styles.tituloInstituicoes}>Novas Campanhas</h1>
        <div className={styles.cardInstituicoes}>
          {[
            {
              nome: "Instituto Ampara Animal",
              endereco:
                "Rua José Felix de Oliveira, 1234 – Granja Viana, Cotia – SP, 06709-400",
              imagem: "/ampara.png",
              arrecadado: 4500,
              meta: 10000,
            },
            {
              nome: "Patas Dadas",
              endereco:
                "Av. Dom Hélder Câmara, 1801 – Benfica, Rio de Janeiro – RJ",
              imagem: "/patasdadas.png",
              arrecadado: 8104.64,
              meta: 16000,
            },
          ].map((inst, index) => (
            <div key={index} className={styles.instituicoes}>
              <img
                src={inst.imagem}
                alt={inst.nome}
                className={styles.imgInstituicoes}
              />
              <h2 className={styles.nomeInstituicoes}>{inst.nome}</h2>
              <p className={styles.enderecoInstituicoes}>
                <div className={styles.iconLocal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                </div>
                {inst.endereco}
              </p>
              <progress value={inst.arrecadado} max={inst.meta}></progress>
              <p className={styles.valorInstituicoes}>
                R$ {inst.arrecadado.toLocaleString("pt-BR")} / R${" "}
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
