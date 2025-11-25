import { BsGraphUp, BsJournalText, BsUiChecks } from "react-icons/bs";
import Layout from "../../components/layout";
import styles from "../home/home.module.css";
import { Link } from "react-router-dom";

export default function Adotar() {
  return (
    <>
      <Layout>

      <div className={styles.bannerAdotar}>
        <div className={styles.homeTitulo}>
          <h1 className={styles.titulo}>Conheça seu novo melhor amigo!</h1>
          <Link to="/formulario-adotar" style={{ textDecoration: "none" }}>
            <button className={styles.subtitulo}>Formulário</button>
          </Link>
          <Link to="/central-adocao" style={{ textDecoration: "none" }}>
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
                <BsJournalText />
              </div>
              <h3 className={styles.cardTitulo}>Formulário de Interesse</h3>
              <p className={styles.cardTexto}>
                Faça o formulário de interesse que disponibilizamos aqui que a
                ONG/protetor entrará em contato com você em até 48h.
              </p>
            </div>

            <div className={styles.cardComoAdotar}>
              <div className={styles.cardCirculo}>
                <BsGraphUp />
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
                <BsUiChecks />
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

      </Layout>
    </>
  );
}
