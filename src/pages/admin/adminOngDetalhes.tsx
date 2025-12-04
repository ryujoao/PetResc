import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminDetalhes.module.css";
import {
  FaArrowLeft,
  FaTrash,
  FaPaw,
  FaBan,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
} from "react-icons/fa";

// Dados Mockados
const ongData = {
  id: 1,
  nome: "ONG Vira Lata é Dez",
  status: "Ativa",
  petsAtivos: "Cerca de 920 animais",
  adocaoMedia: "30 a 40 animais por mês",
  cnpj: "05.551.027/0001-96",
  email: "ongviralataedez@gmail.com",
  endereco: "Rua Manuel Velasco, 90, Vila Leopoldina - SP",
  logoUrl: "https://placehold.co/200x200/2c6893/ffffff?text=VL10",
};

export default function AdminDetalheOng() {
  const { id } = useParams();

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>Gerenciar ONG</h1>
            <h2 className={styles.subtituloPagina}>Detalhes da instituição</h2>
          </div>
          <Link to="/admin/ongs" className={styles.linkVoltar}>
            <FaArrowLeft />
          </Link>
        </div>

        
        <div className={styles.cartaoDetalhes}>
          
          <div className={styles.colunaInfoDetalhes}>
            
            
            <div className={styles.cabecalhoNomeOng}>
              <h2 className={styles.nomeOng}>
                {ongData.nome}
                <span className={styles.statusDetalhe}>{ongData.status}</span>
              </h2>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>Pets ativos:</span>
              <span className={styles.valorDetalhe}>{ongData.petsAtivos}</span>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>Adoção Média:</span>
              <span className={styles.valorDetalhe}>{ongData.adocaoMedia}</span>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>
                <FaIdCard className={styles.iconeTexto} /> CNPJ:
              </span>
              <span className={styles.valorDetalhe}>{ongData.cnpj}</span>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>
                <FaEnvelope className={styles.iconeTexto} /> Email:
              </span>
              <span className={styles.valorDetalhe}>{ongData.email}</span>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>
                <FaMapMarkerAlt className={styles.iconeTexto} /> Endereço:
              </span>
              <span className={styles.valorDetalhe}>{ongData.endereco}</span>
            </div>
          </div>

          {/* Logo */}
          <div className={styles.containerLogoOng}>
            <img
              src={ongData.logoUrl}
              alt={`Logo ${ongData.nome}`}
              className={styles.imgLogoOng}
            />
          </div>
        </div>

        {/* Ações Administrativas */}
        <h3 className={styles.tituloAcoesAdmin}>Ações administrativas</h3>

        <div className={styles.acoesDetalhes}>
          
          <Link
            to="/admin/ongs/:id/pets"
            className={`${styles.botaoAcaoGrande} ${styles.btnAzul}`}
          >
            <FaPaw /> Gerenciar Pets desta ONG
          </Link>

          
          <button className={`${styles.botaoAcaoGrande} ${styles.btnAmarelo}`}>
            <FaBan /> Bloquear ONG Temporariamente
          </button>

         
          <button
            className={`${styles.botaoAcaoGrande} ${styles.btnVermelho}`}
            onClick={() => alert("Tem certeza que deseja excluir esta ONG?")}
          >
            <FaTrash /> Excluir ONG Definitivamente
          </button>
        </div>
      </div>
    </Layout>
  );
}