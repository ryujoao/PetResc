import { useNavigate, Link } from "react-router-dom"; // 1. Importar o hook de navegação
import Layout from "../../components/layout";
import styles from "./adotar.module.css";
import { BsFileText, BsGraphUpArrow, BsPersonCheckFill } from "react-icons/bs";

export default function LarTemporario() {
  // 2. Criar a constante de navegação
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={styles.container}>
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

        {/* === SEÇÃO 2: O QUE É === */}
        <section className={styles.secaoComoFunciona}>
          <h2 className={styles.tituloSecao}>Como Funciona a Adoção?</h2>
          <p className={styles.textoSecao}>
            Nosso sistema de adoção foi desenvolvido para conectar animais em
            situação de vulnerabilidade a pessoas responsáveis que desejam
            oferecer um lar. Ao preencher o formulário, você fornece informações
            importantes que ajudam a ONG a avaliar o perfil do adotante e
            garantir que o animal tenha um ambiente seguro e adequado.
          </p>
        </section>

        {/* === SEÇÃO 3: ETAPAS === */}
        <section className={styles.secaoEtapas}>
          <div className={styles.containerEtapas}>
            {/* Passo 1 */}
            <div className={styles.cartaoEtapa}>
              <div className={styles.circuloIcone}>
                <BsFileText />
              </div>
              <h3 className={styles.tituloEtapa}>Formulário de interesse</h3>
              <p className={styles.descricaoEtapa}>
                Formulário de Interesse Faça o formulário de interesse que
                disponibilizamos aqui que a ONG/protetor entrará em contato com
                você em até 48h.
              </p>
            </div>

            {/* Passo 2 */}
            <div className={styles.cartaoEtapa}>
              <div className={styles.circuloIcone}>
                <BsGraphUpArrow />
              </div>
              <h3 className={styles.tituloEtapa}>Avaliação da Adoção</h3>
              <p className={styles.descricaoEtapa}>
                A ONG irá fazer a análise do cadastro e perfil do adotante e o
                pet escolhido. Preenchendo os requisitos, você recebe a
                aprovação por telefone / e-mail .
              </p>
            </div>

            {/* Passo 3 */}
            <div className={styles.cartaoEtapa}>
              <div className={styles.circuloIcone}>
                <BsPersonCheckFill />
              </div>
              <h3 className={styles.tituloEtapa}>Adoção Completa</h3>
              <p className={styles.descricaoEtapa}>
                Caso seja aprovado espere o contato e a aprovação. Com tudo
                certo, você busca seu pet no dia combinado com a ONG/protetor.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
