import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./campanhasAnteriores.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api"; // SUA CONFIG DO AXIOS
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCalendarAlt, FaHandHoldingHeart } from "react-icons/fa";

// --- TIPAGEM REAL DO BANCO ---
type Campanha = {
  id: number;
  titulo: string;
  createdAt: string; // Vem como string ISO do banco
  dataLimite: string;
  metaFinanceira: string; // Decimal vem como string no JSON muitas vezes
  valorArrecadado: string;
  imagemUrl: string;
};

export default function CampanhasAnteriores() {
  const { user } = useAuth();
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- BUSCA DADOS DA API ---
  useEffect(() => {
    async function fetchMinhasCampanhas() {
        if(!user) return;
        try {
            setLoading(true);
            // Chama a rota que criamos no backend
            const response = await api.get("/campanha/minhas");
            setCampanhas(response.data);
        } catch (error) {
            console.error("Erro ao carregar campanhas:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchMinhasCampanhas();
  }, [user]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Deseja realmente excluir esta campanha?")) {
      try {
          // Se tiver rota de delete no back:
          // await api.delete(`/campanha/${id}`);
          
          // Por enquanto apenas remove visualmente para não quebrar se não tiver rota
          setCampanhas((prev) => prev.filter((c) => c.id !== id));
          alert("Campanha removida.");
      } catch (error) {
          alert("Erro ao excluir.");
      }
    }
  };

  // Filtragem local pelo título
  const listaFiltrada = campanhas.filter((c) =>
    c.titulo.toLowerCase().includes(termoBusca.toLowerCase())
  );

  // Helper para formatar moeda
  const formatMoney = (val: string | number) => {
      const num = Number(val);
      return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <Layout>
      <div className={styles.container}>
        
        {/* CABEÇALHO */}
        <div className={styles.header}>
          <div className={styles.headerTexto}>
            <h1 className={styles.titulo}>Minhas Campanhas</h1>
            <p className={styles.subtitulo}>
              Acompanhe o impacto e gerencie suas arrecadações.
            </p>
          </div>
          <Link to="/nova-campanha" className={styles.btnNova}>
            <FaPlus /> <span>Nova Campanha</span>
          </Link>
        </div>

        {/* BARRA DE PESQUISA */}
        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar campanha pelo nome..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* LISTAGEM */}
        {loading ? (
          <div className={styles.loadingState}>
             <div className={styles.spinner}></div>
             <p>Carregando campanhas...</p>
          </div>
        ) : listaFiltrada.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}><FaHandHoldingHeart /></div>
            <h3>Nenhuma campanha encontrada</h3>
            <p>Comece criando uma nova campanha para arrecadar fundos.</p>
          </div>
        ) : (
          <div className={styles.gridCampanhas}>
            {listaFiltrada.map((campanha) => {
              // Cálculos de Status e Progresso
              const hoje = new Date();
              const limite = new Date(campanha.dataLimite);
              const isFinalizada = hoje > limite;
              
              const status = isFinalizada ? "Finalizada" : "Ativa";
              const meta = Number(campanha.metaFinanceira);
              const arrecadado = Number(campanha.valorArrecadado);
              
              // Evita divisão por zero
              const progresso = meta > 0 ? Math.min((arrecadado / meta) * 100, 100) : 0;
              
              return (
                <div key={campanha.id} className={`${styles.card} ${isFinalizada ? styles.cardFinalizado : ''}`}>
                  
                  {/* Imagem */}
                  <div className={styles.cardMedia}>
                    <img 
                      src={campanha.imagemUrl || "https://via.placeholder.com/400x200?text=Sem+Imagem"} 
                      alt={campanha.titulo} 
                      className={styles.cardImg}
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x200?text=Erro+Imagem")}
                    />
                    <div className={styles.overlayGradient}></div>
                    
                    {/* Badge de Status Dinâmica */}
                    <span 
                        className={`${styles.badge}`}
                        style={{
                            backgroundColor: isFinalizada ? '#6c757d' : '#28a745'
                        }}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardDate}>
                        <FaCalendarAlt size={12} /> Criada em: {new Date(campanha.createdAt).toLocaleDateString()}
                    </div>
                    <h3 className={styles.cardTitle}>{campanha.titulo}</h3>

                    {/* Barra de Progresso */}
                    <div className={styles.progressoWrapper}>
                        <div className={styles.progressoLabels}>
                            <span className={styles.labelArrecadado}>
                                <strong>{formatMoney(arrecadado)}</strong>
                            </span>
                            <span className={styles.labelMeta}>
                                Meta: {formatMoney(meta)}
                            </span>
                        </div>
                        <div className={styles.barraBg}>
                            <div 
                                className={styles.barraFill} 
                                style={{ 
                                    width: `${progresso}%`,
                                    backgroundColor: isFinalizada ? '#999' : '#2D68A6'
                                }}
                            ></div>
                        </div>
                        <p className={styles.porcentagemTexto}>{Math.round(progresso)}% alcançado</p>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className={styles.cardActions}>
                    <button className={styles.btnEdit} title="Editar">
                        <FaEdit /> Editar
                    </button>
                    <button 
                        className={styles.btnDelete} 
                        onClick={() => handleDelete(campanha.id)}
                        title="Excluir"
                    >
                        <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}