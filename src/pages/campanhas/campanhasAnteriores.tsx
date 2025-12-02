import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./campanhasAnteriores.module.css";
import { useAuth } from "../../auth/AuthContext";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaCalendarAlt, FaHandHoldingHeart } from "react-icons/fa";

// --- TIPAGEM ---
type Campanha = {
  id: number;
  titulo: string;
  dataCriacao: string;
  status: "Ativa" | "Finalizada" | "Pausada";
  meta: number;
  arrecadado: number;
  imagemUrl: string;
  ongId: string; 
};

// --- DADOS MOCKADOS ---
const MOCK_CAMPANHAS: Campanha[] = [
  {
    id: 1,
    titulo: "Reforma do Canil Principal",
    dataCriacao: "10/01/2025",
    status: "Ativa",
    meta: 16000,
    arrecadado: 8104.64,
    imagemUrl: "/institutos/institutoCaramelo.png", 
    ongId: "1", 
  },
  {
    id: 2,
    titulo: "Campanha de Vacinação V10",
    dataCriacao: "05/12/2024",
    status: "Finalizada",
    meta: 5000,
    arrecadado: 5200,
    imagemUrl: "/institutos/ampara.png",
    ongId: "1",
  },
  {
    id: 3,
    titulo: "Ração para o Inverno",
    dataCriacao: "15/02/2025",
    status: "Ativa",
    meta: 3000,
    arrecadado: 450,
    imagemUrl: "/institutos/suipa.png",
    ongId: "2", 
  },
  {
    id: 4,
    titulo: "Mutirão de Castração",
    dataCriacao: "20/11/2024",
    status: "Finalizada",
    meta: 10000,
    arrecadado: 3000,
    imagemUrl: "/institutos/patasDadas.png",
    ongId: "1",
  },
];

export default function CampanhasAnteriores() {
  const { user } = useAuth();
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    setTimeout(() => {
      // Filtra pelo ID da ONG logada
      const minhasCampanhas = MOCK_CAMPANHAS.filter(
        (c) => c.ongId === String(user?.id || "1") 
      );
      setCampanhas(minhasCampanhas);
      setLoading(false);
    }, 600);
  }, [user]);

  const handleDelete = (id: number) => {
    if (window.confirm("Deseja realmente excluir esta campanha?")) {
      setCampanhas((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const listaFiltrada = campanhas.filter((c) =>
    c.titulo.toLowerCase().includes(termoBusca.toLowerCase())
  );

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

        {/* BARRA DE PESQUISA ESTILIZADA */}
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
              const progresso = Math.min((campanha.arrecadado / campanha.meta) * 100, 100);
              const isFinalizada = campanha.status === 'Finalizada';
              
              return (
                <div key={campanha.id} className={`${styles.card} ${isFinalizada ? styles.cardFinalizado : ''}`}>
                  
                  {/* Imagem */}
                  <div className={styles.cardMedia}>
                    <img 
                      src={campanha.imagemUrl} 
                      alt={campanha.titulo} 
                      className={styles.cardImg}
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x200?text=Campanha")}
                    />
                    <div className={styles.overlayGradient}></div>
                    <span className={`${styles.badge} ${styles[campanha.status.toLowerCase()]}`}>
                      {campanha.status}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardDate}>
                        <FaCalendarAlt size={12} /> {campanha.dataCriacao}
                    </div>
                    <h3 className={styles.cardTitle}>{campanha.titulo}</h3>

                    {/* Barra de Progresso Bonita */}
                    <div className={styles.progressoWrapper}>
                        <div className={styles.progressoLabels}>
                            <span className={styles.labelArrecadado}>
                                <strong>{campanha.arrecadado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
                            </span>
                            <span className={styles.labelMeta}>
                                Meta: {campanha.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                        </div>
                        <div className={styles.barraBg}>
                            <div 
                                className={styles.barraFill} 
                                style={{ 
                                    width: `${progresso}%`,
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