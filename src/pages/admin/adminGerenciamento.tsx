import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminGerenciamento.module.css";
import {
  FaPaw,
  FaHandHoldingHeart,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

export default function AdminGerenciamento() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>Central de Gerenciamento</h1>
            <h2 className={styles.subtituloPagina}>
              Selecione uma categoria para administrar
            </h2>
          </div>
        </div>

        
        <div className={styles.gradeOpcoes}>
          {/* Pets */}
          <Link to="/admin/pets" className={styles.cartaoOpcao}>
            <div className={`${styles.caixaIcone} ${styles.iconePets}`}>
              <FaPaw size={40} />
            </div>
            <div className={styles.conteudoCentral}>
              <h3 className={styles.tituloOpcao}>Gerenciar Pets</h3>
              <p className={styles.descricaoOpcao}>
                Visualize, aprove ou edite o status de animais cadastrados na
                plataforma.
              </p>
              <span className={styles.linkOpcao}>
                Acessar <FaArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* ONGs */}
          <Link to="/admin/ongs" className={styles.cartaoOpcao}>
            <div className={`${styles.caixaIcone} ${styles.iconeOngs}`}>
              <FaHandHoldingHeart size={40} />
            </div>
            <div className={styles.conteudoCentral}>
              <h3 className={styles.tituloOpcao}>Gerenciar ONGs</h3>
              <p className={styles.descricaoOpcao}>
                Aprovação de cadastro, suspensão e detalhes de ONGs parceiras.
              </p>
              <span className={styles.linkOpcao}>
                Acessar <FaArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Usuários */}
          <Link to="/admin/usuarios" className={styles.cartaoOpcao}>
            <div className={`${styles.caixaIcone} ${styles.iconeUsuarios}`}>
              <FaUsers size={40} />
            </div>
            <div className={styles.conteudoCentral}>
              <h3 className={styles.tituloOpcao}>Gerenciar Usuários</h3>
              <p className={styles.descricaoOpcao}>
                Controle de usuários comuns, acessos e moderação.
              </p>
              <span className={styles.linkOpcao}>
                Acessar <FaArrowRight size={12} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
