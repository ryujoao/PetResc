import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./avaliarAnimal.module.css";
// import api from "../../services/api"; // Comentado para o Mock
import { useAuth } from "../../auth/AuthContext";
import Modal from "../../components/modal";

// Interface (Mantida)
interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca: string | null;
  idade: string | null;
  status: string;
  porte: string | null;
  sexo: string | null;
  descricao: string | null;
  photoURL: string | null;
  corPredominante: string | null;
  createdAt: string;
  account: {
    nome: string;
    email: string;
    telefone: string;
  };
  ficha?: {
    vacinado: boolean;
    vermifugado: boolean;
    castrado: boolean;
    temperamento: string;
    saude: string;
    observacoes: string;
  };
}

// --- DADOS MOCKADOS ---
const animalMock: Animal = {
  id: 4521,
  nome: "Paçoca",
  especie: "Cachorro",
  raca: "Vira-lata (SRD)",
  idade: "2 anos",
  status: "PENDENTE",
  porte: "Médio",
  sexo: "Macho",
  descricao: "Encontrado perto da praça, muito dócil mas estava assustado.",
  photoURL: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop", 
  corPredominante: "Caramelo",
  createdAt: "2023-10-15T14:30:00.000Z",
  account: {
    nome: "João Resgatador",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
  },
  ficha: {
    vacinado: true,
    vermifugado: true,
    castrado: false,
    temperamento: "Dócil, Brincalhão, Carente",
    saude: "Ótima, apenas um pouco magro.",
    observacoes: "Se dá muito bem com crianças e outros cachorros.",
  },
};

export default function AvaliarAnimal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

  // Estado para o Modal de Confirmação (Substituto do window.confirm)
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Estado para o Modal de Feedback (Sucesso/Erro)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    msg: "",
    type: "success" as "success" | "error",
    redirect: "" as string | null,
  });

  const showFeedbackModal = (title: string, msg: string, type: "success" | "error" = "success", redirect: string | null = null) => {
    setModalConfig({ title, msg, type, redirect });
    setModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setModalOpen(false);
    if (modalConfig.redirect) navigate(modalConfig.redirect);
  };

  useEffect(() => {
    // MOCK: Carregamento
    setTimeout(() => {
        setAnimal(animalMock);
        setLoading(false);
    }, 500);
  }, [id]);

  const getTags = (text?: string) => {
      if (!text) return [];
      return text.split(',').map(t => t.trim());
  };

  // --- AÇÕES ---

  const handleAceitar = async () => {
      if (!animal) return;
      try {
          console.log("MOCK: Animal Aprovado via API");
          showFeedbackModal("Sucesso", `O animal ${animal.nome} foi aprovado!`, "success", "/central-adocao");
      } catch (error) {
          showFeedbackModal("Erro", "Falha ao aprovar o registro.", "error");
      }
  };

  // 1. O usuário clica em "Negar Registro" e abre o modal
  const handleNegarClick = () => {
      setShowConfirmModal(true);
  };

  // 2. O usuário clica em "Sim, tenho certeza" dentro do modal
  const confirmNegarAction = async () => {
      setShowConfirmModal(false); // Fecha o modal de pergunta
      if (!animal) return;

      try {
          // await api.delete(`/animais/${animal.id}`);
          console.log("MOCK: Animal Deletado via API");
          
          // Exibe o modal de sucesso
          showFeedbackModal("Registro Negado", "O registro do animal foi removido do sistema.", "success", "/central-adocao");
      } catch (error) {
          showFeedbackModal("Erro", "Falha ao negar o registro.", "error");
      }
  };

  if (loading) return <Layout><div className={styles.loading}>Carregando avaliação...</div></Layout>;
  if (!animal) return null;

  return (
    <Layout>
      {/* Modal Genérico de Sucesso/Erro (existente) */}
      <Modal
        isOpen={modalOpen}
        title={modalConfig.title}
        message={modalConfig.msg}
        type={modalConfig.type}
        onClose={handleCloseFeedbackModal}
      />

      {/* --- NOVO: Modal de Confirmação Customizado --- */}
      {showConfirmModal && (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>Negar Registro?</h3>
                <p className={styles.modalMessage}>
                    Tem certeza que deseja remover o registro de <strong>{animal.nome}</strong>? 
                    <br />Essa ação não pode ser desfeita.
                </p>
                <div className={styles.modalActions}>
                    <button 
                        className={styles.btnCancel} 
                        onClick={() => setShowConfirmModal(false)}
                    >
                        Cancelar
                    </button>
                    <button 
                        className={styles.btnConfirmDanger} 
                        onClick={confirmNegarAction}
                    >
                        Sim, Negar
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className={styles.container}>
        
        {/* CABEÇALHO */}
        <div className={styles.headerCard}>
            <div className={styles.imageWrapper}>
                <img src={animal.photoURL || ""} alt={animal.nome} />
            </div>
            <div className={styles.headerInfo}>
                <h1 className={styles.nomeAnimal}>{animal.nome}</h1>
                <div className={styles.statusRow}>
                    <span className={styles.statusLabel}>Status:</span>
                    <span className={styles.statusValue}>
                        {animal.status === 'PENDENTE' ? 'Aguardando Aprovação' : animal.status}
                    </span>
                </div>
                <p className={styles.lastUpdate}>Atualizado em: {new Date(animal.createdAt).toLocaleDateString()}</p>
                <span className={styles.codigo}>Código: {animal.id}</span>
            </div>
        </div>

        <h2 className={styles.sectionTitle}>Características</h2>
        <div className={styles.divider} />

        <div className={styles.detailsGrid}>
            {/* Colunas de detalhes (Idênticas ao anterior) */}
            <div className={styles.column}>
                <div className={styles.detailItem}><strong>Nome</strong><p>{animal.nome}</p></div>
                <div className={styles.detailItem}><strong>Gênero</strong><p>{animal.sexo}</p></div>
                <div className={styles.detailItem}><strong>Porte</strong><p>{animal.porte}</p></div>
                <div className={styles.detailItem}><strong>Raça</strong><p>{animal.raca}</p></div>
            </div>
            <div className={styles.column}>
                <h3 className={styles.colTitle}>Saúde</h3>
                <div className={styles.tagsContainer}>
                    {animal.ficha?.vacinado && <span className={styles.tag}>Vacinado</span>}
                    {animal.ficha?.castrado && <span className={styles.tag}>Castrado</span>}
                </div>
            </div>
             <div className={styles.column}>
                <h3 className={styles.colTitle}>Temperamento</h3>
                <div className={styles.tagsContainer}>
                    {getTags(animal.ficha?.temperamento).map((tag, i) => <span key={i} className={styles.tag}>{tag}</span>)}
                </div>
            </div>
            <div className={styles.column}>
                <h3 className={styles.colTitle}>Sociabilidade</h3>
                <div className={styles.tagsContainer}>
                   <span className={styles.tag}>Sociável com pessoas</span>
                </div>
            </div>
        </div>

        {/* RODAPÉ DE AÇÃO */}
        <div className={styles.actionsFooter}>
            {/* Agora chama handleNegarClick para abrir o modal */}
            <button className={styles.btnNegar} onClick={handleNegarClick}>
                Negar Registro
            </button>
            <button className={styles.btnAceitar} onClick={handleAceitar}>
                Aceitar Registro
            </button>
        </div>

      </div>
    </Layout>
  );
}