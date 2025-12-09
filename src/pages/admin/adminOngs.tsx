import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminListas.module.css";
import api from "../../services/api";
import { FaArrowLeft, FaMapMarkerAlt, FaPaw, FaEdit, FaTrash, FaEye } from "react-icons/fa";

// Interface dos dados
interface OngAdmin {
  id: number;
  nome: string;
  email: string;
  cnpj: string;
  localizacao: string;
  animaisAtivos: number;
  status: string;
}

export default function AdminOngs() {
  const [ongs, setOngs] = useState<OngAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Carregar ONGs
  useEffect(() => {
    async function fetchOngs() {
      try {
        const response = await api.get("/admin/ongs");
        setOngs(response.data);
      } catch (error) {
        console.error("Erro ao listar ONGs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOngs();
  }, []);

  // 2. Função de Excluir
  const handleDelete = async (id: number, nome: string) => {
    const confirmacao = window.confirm(`ATENÇÃO: Tem certeza que deseja excluir a ONG "${nome}"?\nIsso apagará todos os animais e dados vinculados a ela.`);
    
    if (confirmacao) {
      try {
        await api.delete(`/admin/usuarios/${id}`);
        // Atualiza a lista visualmente
        setOngs(prev => prev.filter(ong => ong.id !== id));
        alert("ONG excluída com sucesso.");
      } catch (error) {
        alert("Erro ao excluir. Verifique se a ONG possui registros presos.");
      }
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>Gerenciar ONGs</h1>
            <h2 className={styles.subtituloPagina}>Listagem e controle de instituições parceiras</h2>
          </div>
          <Link to="/admin" className={styles.linkVoltar}>
            <FaArrowLeft />
          </Link>
        </div>

        {/* Lista */}
        <div className={styles.listaCartoes}>
          {loading ? (
            <p style={{padding: 20}}>Carregando instituições...</p>
          ) : ongs.length === 0 ? (
            <p style={{padding: 20}}>Nenhuma ONG cadastrada ainda.</p>
          ) : (
            ongs.map((ong) => (
              <div key={ong.id} className={styles.cartaoItemGestao}>
                
                <div className={styles.linhaCabecalhoCartao}>
                  <span className={styles.nomeItem}>
                      {ong.nome}
                  </span>
                  <span 
                      className={styles.statusItem}
                      style={{ color: '#219653' }} // Verde fixo pois todas são ativas por enquanto
                  >
                      {ong.status}
                  </span>
                </div>

                <div className={styles.detalhesOng}>
                  <span>
                      <FaMapMarkerAlt className={styles.iconeDetalhe} size={12}/> 
                      {ong.localizacao}
                  </span>
                  <span>
                      <FaPaw className={styles.iconeDetalhe} size={12}/> 
                      {ong.animaisAtivos} pets cadastrados
                  </span>
                  <span style={{fontSize: '0.85rem', color: '#666'}}>CNPJ: {ong.cnpj}</span>
                  <span style={{fontSize: '0.85rem', color: '#666'}}>{ong.email}</span>
                </div>

                <div className={styles.rodapeAcoesCartao}>
                  <Link to={`/admin/ongs/${ong.id}`} className={styles.btnAcaoPequeno}>
                      <FaEye /> Ver Detalhes
                  </Link>
                  
                  <button className={styles.btnAcaoPequeno} style={{opacity: 0.6, cursor: 'not-allowed'}} title="Em breve">
                      <FaEdit /> Editar
                  </button>

                  {/* Botão EXCLUIR */}
                  <button 
                    className={`${styles.btnAcaoPequeno} ${styles.btnPerigo}`}
                    onClick={() => handleDelete(ong.id, ong.nome)}
                  >
                      <FaTrash size={12}/> Excluir
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}