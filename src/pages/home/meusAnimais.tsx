import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaPaw } from "react-icons/fa";

import styles from "./meusAnimais.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";

// ... (Interfaces e Componente AnimalCard permanecem iguais)
// Vou omitir as interfaces e o AnimalCard aqui para economizar espaço, 
// pois eles NÃO mudaram. Use os mesmos do passo anterior.

// --- Card de Animal ---
interface Animal { id: number; nome: string; raca: string; idade: string; status: string; photoURL: string; }
interface Adocao { id: number; animal: Animal; status: string; }
interface AnimalCardProps { animal: Animal; statusAdocao?: string; tipoStatus: 'CADASTRO' | 'ADOCAO'; }

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, statusAdocao, tipoStatus }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (tipoStatus === 'CADASTRO') navigate(`/gerenciar-adocao/${animal.id}`);
    else navigate(`/animal/${animal.id}`);
  };
  const formatStatus = (status: string) => status ? status.replace(/_/g, " ") : "Desconhecido";
  const statusSuperior = tipoStatus === "CADASTRO" ? formatStatus(animal.status) : "Solicitação Enviada";
  
  let statusInferiorTexto = "Clique para gerenciar";
  let statusClass = styles.statusNormal;

  if (tipoStatus === 'ADOCAO') {
    statusInferiorTexto = `Situação: ${statusAdocao}`;
    if (statusAdocao === 'APROVADO') statusClass = styles.statusAprovado;
    else if (statusAdocao === 'RECUSADO') statusClass = styles.statusRecusado;
    else statusClass = styles.statusPendente;
  }

  const imagemSrc = animal.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto";

  return (
    <div className={styles.card} onClick={handleClick} title={tipoStatus === 'CADASTRO' ? "Gerenciar Pedidos" : "Ver Perfil"}>
      <div className={styles.imgWrapper}>
        <img src={imagemSrc} alt={animal.nome} onError={(e) => { e.currentTarget.src = "https://placehold.co/300x300/f8f8f8/ccc?text=Erro+Img"; }} />
      </div>
      <div className={styles.infoCard}>
        <h3 className={styles.cardNome}>{animal.nome || "Sem Nome"}</h3>
        <p className={styles.descricaoCard}>
          {animal.raca || "SRD"} &bull; {animal.idade ? `${animal.idade} anos` : "?"}
        </p>
        <span className={styles.tagId}>#{animal.id}</span>
      </div>
      <div className={styles.statusSuperior}>{statusSuperior}</div>
      <div className={`${styles.statusInferior} ${statusClass}`}>{statusInferiorTexto}</div>
    </div>
  );
};

export default function MeusAnimais() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [animaisCadastrados, setAnimaisCadastrados] = useState<Animal[]>([]);
  const [adocoesEmProcesso, setAdocoesEmProcesso] = useState<Adocao[]>([]);
  const [loading, setLoading] = useState(true);
  const isOng = user?.role === 'ONG';

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetchMeusDados = async () => {
      setLoading(true);
      try {
        const [resAnimais, resAdocoes] = await Promise.all([
          api.get("/animais/gerenciar/lista"),
          api.get("/pedidos-adocao/meus-pedidos")
        ]);
        setAnimaisCadastrados(resAnimais.data);
        setAdocoesEmProcesso(resAdocoes.data);
      } catch (err) { console.error("Erro ao buscar dados:", err); } 
      finally { setLoading(false); }
    };
    fetchMeusDados();
  }, [user]);

  if (loading) return <div className={styles.loadingContainer}><p>Carregando painel...</p></div>;
  if (!user) return (<div className={styles.containerPrincipal}><p>Faça login.</p></div>);

  return (
    <div className={styles.containerPrincipal}>

      {/* BOX ESQUERDA: ANIMAIS CADASTRADOS */}
      <div className={styles.containerMeusAnimais}>
        {/* Header Padronizado */}
        <div className={styles.headerSection}>
            <h2 className={styles.titulo}>
                {isOng ? "Gestão da ONG" : "Meus Animais"}
            </h2>
            <button className={styles.btnAdd} onClick={() => navigate('/registrar-animal')}>
                <FaPlusCircle size={22} title="Cadastrar Novo" />
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

      {/* BOX DIREITA: ADOÇÕES EM PROCESSO */}
      <div className={styles.adocaoProcesso}>
        {/* Header Padronizado também na direita */}
        <div className={styles.headerSection}>
            <h2 className={styles.titulo}>Meus Pedidos de Adoção</h2>
            {/* Sem botão aqui, mas mantém o estilo da barra azul */}
        </div>

        {adocoesEmProcesso.length === 0 ? (
          <div className={styles.vazioBox}>
            <p className={styles.mensagemVazio}>Você não fez nenhum pedido de adoção.</p>
          </div>
        ) : (
          <div className={styles.gridAnimais}>
            {adocoesEmProcesso.map((adocao) => (
              <AnimalCard key={adocao.id} animal={adocao.animal} statusAdocao={adocao.status} tipoStatus="ADOCAO" />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}