import Footer from "../../components/footer";
import Nav from "../../components/navbar";
import styles from "../home/home.module.css";
import { Link } from "react-router-dom";

export default function Adotar() {
  return (
    <>
      <Nav />

      <div className={styles.bannerUm}>
        <div className={styles.homeTitulo}>
          <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
          <Link to="/formularioAdotar" style={{ textDecoration: "none" }}>
            <button className={styles.subtitulo}>Formulário</button>
          </Link>
          <Link to="/petsDisponiveis" style={{ textDecoration: "none" }}>
            <button className={styles.subtitulo}>Pets Disponíveis</button>
          </Link>
        </div>
      </div>

      <div className={styles.pageComoAdotar}>
        <div className={styles.pageComoAdotarCima}>
          <h2 className={styles.explicacaoAdotar}>
            Nosso sistema de adoção foi desenvolvido para conectar animais em
            situação de vulnerabilidade a pessoas responsáveis que desejam
            oferecer um lar. Ao preencher o formulário, você fornece informações
            importantes que ajudam a ONG a avaliar o perfil do adotante e
            garantir que o animal tenha um ambiente seguro e adequado.
          </h2>
          <div className={styles.linhaAdotar}></div>
        </div>
        <div className={styles.pageComoAdotarBaixo}>
          <h1 className={styles.tituloComoAdotar}>Como Funciona a Adoção?</h1>

          <div className={styles.camposCards}>
            <div className={styles.cardComoAdotar}>
              <div className={styles.cardCirculo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-journal-text"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                </svg>
              </div>
              <h3 className={styles.cardTitulo}>Formulário de Interesse</h3>
              <p className={styles.cardTexto}>
                Faça o formulário de interesse que disponibilizamos aqui que a
                ONG/protetor entrará em contato com você em até 48h.
              </p>
            </div>

            <div className={styles.cardComoAdotar}>
              <div className={styles.cardCirculo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-graph-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"
                  />
                </svg>
              </div>
              <h3 className={styles.cardTitulo}>Avaliação da adoção</h3>
              <p className={styles.cardTexto}>
                A ONG irá fazer a análise do cadastro e perfil do adotante e o
                pet escolhido. Preenchendo os requisitos, você recebe a
                aprovação por telefone / e‑mail.
              </p>
            </div>

            <div className={styles.cardComoAdotar}>
              <div className={styles.cardCirculo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-ui-checks"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm0 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm.854-3.646a.5.5 0 0 1-.708 0l-1-1a.5.5 0 1 1 .708-.708l.646.647 1.646-1.647a.5.5 0 1 1 .708.708zm0 8a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 1.646-1.647a.5.5 0 0 1 .708.708zM7 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                </svg>
              </div>
              <h3 className={styles.cardTitulo}>Adoção Completa</h3>
              <p className={styles.cardTexto}>
                Caso seja aprovado, ocorre o contato e a aprovação. Com tudo
                certo, você busca seu pet no dia combinado com a ONG/protetor.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
