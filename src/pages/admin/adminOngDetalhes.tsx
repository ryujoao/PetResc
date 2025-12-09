import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminDetalhes.module.css";
import api from "../../services/api";
import {
  FaArrowLeft,
  FaTrash,
  FaPaw,
  FaBan,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
} from "react-icons/fa";

interface OngDetalhes {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  endereco: string;
  totalAnimais: number;
  // Adicionei campos opcionais caso venham ou não
  status?: string; 
  adocaoMedia?: string; 
  logoUrl?: string;
}

export default function AdminOngsDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ong, setOng] = useState<OngDetalhes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetalhes() {
      try {
        const response = await api.get(`/admin/ongs/${id}`);
        setOng(response.data);
      } catch (error) {
        console.error("Erro ao carregar ONG", error);
        navigate("/admin/ongs");
      } finally {
        setLoading(false);
      }
    }
    fetchDetalhes();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!ong) return;
    if (window.confirm(`Tem certeza que deseja excluir a ONG "${ong.nome}" definitivamente?`)) {
        try {
            await api.delete(`/admin/usuarios/${ong.id}`);
            alert("ONG excluída com sucesso.");
            navigate("/admin/ongs");
        } catch (error) {
            alert("Erro ao excluir.");
        }
    }
  };

  if (loading) return <Layout><div style={{padding:40}}>Carregando...</div></Layout>;
  if (!ong) return <Layout><div style={{padding:40}}>ONG não encontrada.</div></Layout>;

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
                {ong.nome}
                <span className={styles.statusDetalhe}>Ativa</span>
              </h2>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>Pets ativos:</span>
              <span className={styles.valorDetalhe}>{ong.totalAnimais} animais cadastrados</span>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>Adoção Média:</span>
              <span className={styles.valorDetalhe}>Dados insuficientes</span>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>
                <FaIdCard className={styles.iconeTexto} /> CNPJ:
              </span>
              <span className={styles.valorDetalhe}>{ong.cnpj}</span>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>
                <FaEnvelope className={styles.iconeTexto} /> Email:
              </span>
              <span className={styles.valorDetalhe}>{ong.email}</span>
            </div>

            <div className={styles.linhaDetalhe}>
              <span className={styles.rotuloDetalhe}>
                <FaMapMarkerAlt className={styles.iconeTexto} /> Endereço:
              </span>
              <span className={styles.valorDetalhe}>{ong.endereco}</span>
            </div>
          </div>

          {/* Logo (Placeholder se não tiver) */}
          <div className={styles.containerLogoOng}>
            <img
              src={ong.logoUrl || "https://placehold.co/200x200/2c6893/ffffff?text=ONG"}
              alt={`Logo ${ong.nome}`}
              className={styles.imgLogoOng}
            />
          </div>
        </div>

        {/* Ações Administrativas */}
        <h3 className={styles.tituloAcoesAdmin}>Ações administrativas</h3>

        <div className={styles.acoesDetalhes}>
          
          <Link
            to={`/admin/ongs/${ong.id}/pets`} // Link corrigido
            className={`${styles.botaoAcaoGrande} ${styles.btnAzul}`}
          >
            <FaPaw /> Gerenciar Pets desta ONG
          </Link>

          {/* Botão Bloquear (Mantido visualmente mas desativado ou com alert) */}
          <button className={`${styles.botaoAcaoGrande} ${styles.btnAmarelo}`} onClick={() => alert("Funcionalidade de bloqueio em breve.")}>
            <FaBan /> Bloquear ONG Temporariamente
          </button>

          {/* Botão Excluir (Funcional) */}
          <button
            className={`${styles.botaoAcaoGrande} ${styles.btnVermelho}`}
            onClick={handleDelete}
          >
            <FaTrash /> Excluir ONG Definitivamente
          </button>
        </div>
      </div>
    </Layout>
  );
}