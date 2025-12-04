import { useNavigate } from "react-router-dom"; // 1. Importar o hook de navegação
import Layout from "../../components/layout";
import styles from "./larTemporario.module.css";
import { BsFileText, BsGraphUpArrow, BsPersonCheckFill } from "react-icons/bs";
import { IoPaw } from "react-icons/io5";

export default function LarTemporario() {
  // 2. Criar a constante de navegação
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={styles.container}>
        
        {/* === SEÇÃO 1: DESTAQUE === */}
        <section className={styles.secaoHero}>
          <IoPaw className={styles.patinha} style={{ top: '10%', left: '5%', fontSize: '100px', transform: 'rotate(-20deg)' }} />
          <IoPaw className={styles.patinha} style={{ bottom: '10%', right: '50%', fontSize: '150px', transform: 'rotate(10deg)' }} />

          <div className={styles.conteudoHero}>
            <h1 className={styles.tituloHero}>
              Seja um Lar Temporário<br />
              Salve Vidas Hoje
            </h1>
            <p className={styles.textoHero}>
              No PetResc, você pode apoiar diretamente as ONGs cadastradas. 
              Cada contribuição ajuda a oferecer alimentação, cuidados médicos 
              e abrigo para animais em situação de vulnerabilidade. Escolha a 
              ONG que mais toca seu coração e faça parte dessa rede de solidariedade.
            </p>
          </div>
          
          <div className={styles.containerImagemHero}>
            {/* Nota: Em React, imagens na pasta public são acessadas com '/' */}
            <img 
              src="/imgLarTemp.png" 
              alt="Cão em lar temporário" 
              className={styles.imagemHero} 
            />
          </div>
        </section>

        {/* === SEÇÃO 2: O QUE É === */}
        <section className={styles.secaoOQueE}>
          <h2 className={styles.tituloSecao}>O que é um Lar Temporário?</h2>
          <p className={styles.textoSecao}>
            É um lar humano acolhedor que abriga temporariamente animais resgatados 
            em situação de vulnerabilidade, oferecendo-lhes um ambiente seguro, 
            carinho e cuidados até que encontrem um lar definitivo ou um cuidador 
            permanente. Este gesto transforma vidas, permitindo que os animais 
            recebam tratamento adequado, evitem o isolamento em abrigos e aprendam 
            a confiar novamente, enquanto as famílias que acolhem se sentem 
            gratificadas por fazer a diferença.
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
                Faça o formulário de inscrição que disponibilizamos aqui 
                que a ONG entrará em contato com você em até 48h.
              </p>
            </div>

            {/* Passo 2 */}
            <div className={styles.cartaoEtapa}>
              <div className={styles.circuloIcone}>
                <BsGraphUpArrow />
              </div>
              <h3 className={styles.tituloEtapa}>Avaliação do formulário</h3>
              <p className={styles.descricaoEtapa}>
                A ONG irá fazer a análise do cadastro e perfil do voluntário. 
                Preenchendo os requisitos, você recebe a aprovação por telefone / e-mail.
              </p>
            </div>

            {/* Passo 3 */}
            <div className={styles.cartaoEtapa}>
              <div className={styles.circuloIcone}>
                <BsPersonCheckFill />
              </div>
              <h3 className={styles.tituloEtapa}>Formulário aprovado</h3>
              <p className={styles.descricaoEtapa}>
                Caso seja aprovado espere o contato e a aprovação. 
                Com tudo certo, você busca o pet no dia combinado com a ONG.
              </p>
            </div>
          </div>
        </section>

        {/* === SEÇÃO 4: PERGUNTAS === */}
        <section className={styles.secaoPerguntas}>
          <h2 className={styles.tituloSecao}>Perguntas frequentes:</h2>
          
          <div className={styles.gradePerguntas}>
            <div className={styles.cartaoPergunta}>
              <h4 className={styles.perguntaTexto}>Por quanto tempo devo cuidar do animal?</h4>
              <p className={styles.respostaTexto}>
                O período varia conforme a necessidade do animal, 
                geralmente de algumas semanas a meses.
              </p>
            </div>

            <div className={styles.cartaoPergunta}>
              <h4 className={styles.perguntaTexto}>Preciso ter experiência com animais?</h4>
              <p className={styles.respostaTexto}>
                Não. Fornecemos orientação e acompanhamento completo 
                durante toda a estadia.
              </p>
            </div>

            <div className={styles.cartaoPergunta}>
              <h4 className={styles.perguntaTexto}>Há custos envolvidos?</h4>
              <p className={styles.respostaTexto}>
                Algumas despesas podem ser cobertas pelo programa, mas 
                cada lar deve fornecer alimentação e cuidados básicos.
              </p>
            </div>
          </div>

          {/* 3. Botão corrigido usando navigate (Maneira correta no React) */}
          <button 
            className={styles.botaoAcao} 
            onClick={() => navigate('/formulario-lar-temporario')}
          >
            Responder Formulário
          </button>
        </section>

      </div>
    </Layout>
  );
}