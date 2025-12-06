import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaPaw } from "react-icons/fa"; // Adicionei ícones para ficar igual ao padrão

import styles from "./meusAnimais.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";

// --- Tipagens ---
interface Animal {
  id: number;
  nome: string;
  raca: string;
  idade: string;
  status: string;
  photoURL: string;
}

interface Adocao {
  id: number;
  animal: Animal;
  status: string; // PENDENTE, APROVADO, RECUSADO
}

// --- Card de Animal ---
interface AnimalCardProps {
  animal: Animal;
  statusAdocao?: string;
  tipoStatus: 'CADASTRO' | 'ADOCAO';
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, statusAdocao, tipoStatus }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (tipoStatus === 'CADASTRO') {
      // Se eu cadastrei -> Vou para a tela de Gerenciar Candidatos
      navigate(`/gerenciar-adocao/${animal.id}`);
    } else {
      // Se eu pedi -> Vou para o Perfil do Animal ver detalhes
      navigate(`/animal/${animal.id}`);
    }
  };

  const formatStatus = (status: string) => status ? status.replace(/_/g, " ") : "Desconhecido";

  // Texto Superior: Status do Animal ou "Adoção Solicitada"
  const statusSuperior = tipoStatus === "CADASTRO" ? formatStatus(animal.status) : "Solicitação Enviada";

  // Texto Inferior: Se for Adoção, mostra se foi Aprovado/Recusado
  const statusInferior = tipoStatus === "ADOCAO" ? `Situação: ${statusAdocao}` : "Clique para gerenciar";

  // Helper de Cor para o Status
  const getStatusColor = () => {
      if (statusAdocao === 'APROVADO') return '#28a745'; // Verde
      if (statusAdocao === 'RECUSADO') return '#dc3545'; // Vermelho
      return '#e67e22'; // Laranja (Pendente)
  };

  const imagemSrc = animal.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto";

  return (
    <div 
      className={styles.card} 
      onClick={handleClick} 
      style={{ cursor: "pointer" }}
      title={tipoStatus === 'CADASTRO' ? "Gerenciar Pedidos" : "Ver Perfil"}
    >
      <div className={styles.imgWrapper}>
        <img
          src={imagemSrc}
          alt={animal.nome || "Animal"}
          onError={(e) => { e.currentTarget.src = "https://placehold.co/300x300/f8f8f8/ccc?text=Erro+Img"; }}
        />
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.cardNome}>{animal.nome || "Sem Nome"}</h3>
        <p className={styles.descricaoCard}>
          {animal.raca || "SRD"} • {animal.idade ? `${animal.idade} anos` : "?"}
        </p>
        <span className={styles.tagId}>#{animal.id}</span>
      </div>

      <div className={styles.statusSuperior}>{statusSuperior}</div>

      {/* Exibe status colorido apenas na aba de Adoção (Pedidos Feitos) */}
      {tipoStatus === 'ADOCAO' && (
        <div
          className={styles.statusInferior}
          style={{ color: getStatusColor(), fontWeight: 'bold' }}
        >
          {statusInferior}
        </div>
      )}
      
      {/* Texto de ajuda na aba de Cadastro */}
      {tipoStatus === 'CADASTRO' && (
          <div className={styles.statusInferior} style={{ color: '#666' }}>
              {statusInferior}
          </div>
      )}
    </div>
  );
};

// --- Página Principal ---
export default function MeusAnimais() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [animaisCadastrados, setAnimaisCadastrados] = useState<Animal[]>([]);
  const [adocoesEmProcesso, setAdocoesEmProcesso] = useState<Adocao[]>([]);
  const [loading, setLoading] = useState(true);

  // Verifica se é ONG para ajustar textos
  const isOng = user?.role === 'ONG';

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMeusDados = async () => {
      setLoading(true);
      try {
        const [resAnimais, resAdocoes] = await Promise.all([
          // 1. Animais que EU (ONG ou User) cadastrei
          api.get("/animais/gerenciar/lista"),
          // 2. Pedidos que EU fiz para outros animais
          api.get("/pedidos-adocao/meus-pedidos")
        ]);

        setAnimaisCadastrados(resAnimais.data);
        setAdocoesEmProcesso(resAdocoes.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeusDados();
  }, [user]);

  if (loading) return <div className={styles.loadingContainer}><p>Carregando painel...</p></div>;

  if (!user) {
    return (
      <div className={styles.containerPrincipal}>
        <p>Faça login para ver seus animais.</p>
        <button className={styles.btnAcao} onClick={() => navigate('/login')}>Ir para Login</button>
      </div>
    );
  }

  return (
    <div className={styles.containerPrincipal}>

      {/* BOX ESQUERDA: ANIMAIS CADASTRADOS (Gerenciamento) */}
      <div className={styles.containerMeusAnimais}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2 className={styles.titulo}>
                {isOng ? "Gestão da ONG" : "Meus Resgates"}
            </h2>
            {/* Atalho rápido para cadastrar */}
            <button 
                onClick={() => navigate('/registrar-animal')} 
                style={{background:'none', border:'none', color:'#2D68A6', cursor:'pointer'}}
            >
                <FaPlusCircle size={20} title="Cadastrar Novo" />
            </button>
        </div>

        {animaisCadastrados.length === 0 ? (
          <div className={styles.vazioBox}>
             <FaPaw size={30} color="#ccc" />
             <p className={styles.mensagemVazio}>Nenhum animal cadastrado.</p>
          </div>
        ) : (
          <div className={styles.gridAnimais}>
            {animaisCadastrados.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} tipoStatus="CADASTRO" />
            ))}
          </div>
        )}
      </div>

      <hr className={styles.divisor} />

      {/* BOX DIREITA: ADOÇÕES EM PROCESSO (Acompanhamento) */}
      <div className={styles.adocaoProcesso}>
        <h2 className={styles.titulo}>Meus Pedidos de Adoção</h2>

        {adocoesEmProcesso.length === 0 ? (
          <div className={styles.vazioBox}>
            <p className={styles.mensagemVazio}>Você não fez nenhum pedido de adoção.</p>
          </div>
        ) : (
          <div className={styles.gridAnimais}>
            {adocoesEmProcesso.map((adocao) => (
              <AnimalCard
                key={adocao.id}
                animal={adocao.animal}
                statusAdocao={adocao.status} // Passa o status do PEDIDO (Pendente, Aprovado...)
                tipoStatus="ADOCAO"
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}