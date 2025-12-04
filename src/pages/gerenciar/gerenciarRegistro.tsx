import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./gerenciar.module.css"; 
import Layout from "../../components/layout";
import { FaArrowLeft, FaPaw, FaMapMarkerAlt, FaCheck, FaTimes } from "react-icons/fa";

// Tipagem completa baseada no seu backend/mock
interface AnimalDetalhado {
  id: number;
  nome: string;
  fotoUrl: string;
  status: string;
  codigo: string;
  ultimaAtualizacao: string;
  descricao: string;
  local_cidade: string;
  local_estado: string;
  
  // Características Físicas
  genero: string;
  porte: string;
  cor: string;
  raca: string;
  idade: string; // Ex: "Adulto" ou número

  // Ficha Médica
  fichaMedica: {
    vacinado: boolean;
    castrado: boolean;
    vermifugado: boolean;
  };

  // Comportamento
  comportamento: {
    docil: boolean;
    brincalhao: boolean;
    sociavel: boolean;
    carente: boolean;
    independente: boolean;
  };

  // Sociabilidade
  sociabilidade: {
    comEstranhos: boolean;
    comCriancas: boolean;
    comGatos: boolean;
    comCachorros: boolean;
  };
}

export default function GerenciarRegistro() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dados, setDados] = useState<AnimalDetalhado | null>(null);
  const [loading, setLoading] = useState(true);

  // MOCK DE DADOS (Substitua pela chamada API real depois)
  useEffect(() => {
    setTimeout(() => {
      setDados({
        id: 1,
        nome: "Branquinho",
        fotoUrl: "https://placehold.co/400x400",
        status: "Aguardando Aprovação",
        codigo: "BR00123",
        ultimaAtualizacao: "04/12/2025",
        descricao: "Resgatado próximo à rodovia. Muito dócil e precisa de cuidados especiais na pata esquerda.",
        local_cidade: "São Paulo",
        local_estado: "SP",
        
        genero: "Macho",
        porte: "Médio",
        cor: "Branca",
        raca: "SRD",
        idade: "Adulto",

        fichaMedica: {
          vacinado: true,
          castrado: false,
          vermifugado: true
        },
        comportamento: {
          docil: true,
          brincalhao: true,
          sociavel: true,
          carente: false,
          independente: false
        },
        sociabilidade: {
          comEstranhos: true,
          comCriancas: true,
          comGatos: false,
          comCachorros: true
        }
      });
      setLoading(false);
    }, 600);
  }, [id]);

  const handleNegar = () => {
    if (window.confirm("Deseja NEGAR este registro?")) {
      alert("Registro Negado.");
      navigate(-1);
    }
  };

  const handleAceitar = () => {
    if (window.confirm("Deseja APROVAR este registro?")) {
      alert("Registro Aceito com Sucesso!");
      navigate(-1);
    }
  };

  if (loading) return <Layout><div style={{padding:'40px'}}>Carregando...</div></Layout>;
  if (!dados) return <Layout><div style={{padding:'40px'}}>Registro não encontrado.</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        
        {/* Botão Voltar */}
        <button onClick={() => navigate(-1)} className={styles.btnVoltar}>
          <FaArrowLeft /> Voltar para lista
        </button>

        {/* === CABEÇALHO (Estilo idêntico ao Gerenciar Adoção) === */}
        <section className={styles.animalHeader}>
          <div className={styles.animalImageWrapper}>
            <img src={dados.fotoUrl} alt={dados.nome} className={styles.animalImg} />
          </div>

          <div className={styles.animalContent}>
            <div className={styles.animalTitleRow}>
              <h1 className={styles.animalName}>{dados.nome}</h1>
              <span className={styles.statusBadge}>{dados.status}</span>
            </div>

            <div className={styles.animalTags}>
              <span><FaPaw /> {dados.raca}</span>
              <span>• {dados.idade}</span>
              <span>• {dados.genero}</span>
              <span>• {dados.porte}</span>
            </div>

            <p className={styles.animalStory}>{dados.descricao}</p>

            <div className={styles.animalLocation}>
              <FaMapMarkerAlt color="#d9534f" /> {dados.local_cidade} - {dados.local_estado}
              <span style={{marginLeft: '15px', color:'#2b6b99'}}>Código: {dados.codigo}</span>
            </div>
          </div>
        </section>

        {/* === ÁREA DE CONTEÚDO (Substituindo o Grid de Candidatos pelo Grid de Características) === */}
        
        <div className={styles.detailsPanel}>
            <h2 className={styles.sectionTitle}>Características Técnicas</h2>
            <div className={styles.separator}></div>

            {/* GRID DE 4 COLUNAS */}
            <div className={styles.infoGrid}>

                {/* COLUNA 1: DADOS BÁSICOS */}
                <div className={styles.column}>
                    <div className={styles.infoBlock}>
                        <label>Gênero</label>
                        <p>{dados.genero}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Porte</label>
                        <p>{dados.porte}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Cor Predominante</label>
                        <p>{dados.cor}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Raça</label>
                        <p>{dados.raca}</p>
                    </div>
                    <div className={styles.infoBlock}>
                        <label>Idade</label>
                        <p>{dados.idade}</p>
                    </div>
                </div>

                {/* COLUNA 2: CUIDADOS VETERINÁRIOS */}
                <div className={`${styles.column} ${styles.columnBorderLeft}`}>
                    <h3 className={styles.columnHeader}>Cuidados Veterinários</h3>
                    <div className={styles.tagsContainer}>
                        {dados.fichaMedica.vacinado && <span className={styles.badgeBlue}>Vacinado</span>}
                        {dados.fichaMedica.castrado && <span className={styles.badgeBlue}>Castrado</span>}
                        {dados.fichaMedica.vermifugado && <span className={styles.badgeBlue}>Vermifugado</span>}
                        {!dados.fichaMedica.vacinado && !dados.fichaMedica.castrado && !dados.fichaMedica.vermifugado && <span style={{color:'#999'}}>Nenhum registro</span>}
                    </div>
                </div>

                {/* COLUNA 3: TEMPERAMENTO */}
                <div className={`${styles.column} ${styles.columnBorderLeft}`}>
                    <h3 className={styles.columnHeader}>Temperamento</h3>
                    <div className={styles.tagsVertical}>
                        {dados.comportamento.docil && <span className={styles.badgeLight}>Dócil</span>}
                        {dados.comportamento.brincalhao && <span className={styles.badgeLight}>Brincalhão</span>}
                        {dados.comportamento.sociavel && <span className={styles.badgeLight}>Sociável</span>}
                        {dados.comportamento.carente && <span className={styles.badgeLight}>Carente</span>}
                        {dados.comportamento.independente && <span className={styles.badgeLight}>Independente</span>}
                    </div>
                </div>

                {/* COLUNA 4: SOCIABILIDADE */}
                <div className={`${styles.column} ${styles.columnBorderLeft}`}>
                    <h3 className={styles.columnHeader}>Sociabilidade</h3>
                    <div className={styles.tagsVertical}>
                        {dados.sociabilidade.comEstranhos && <span className={styles.badgeBlueOutline}>Sociável com estranhos</span>}
                        {dados.sociabilidade.comCriancas && <span className={styles.badgeBlueOutline}>Sociável com crianças</span>}
                        {dados.sociabilidade.comGatos && <span className={styles.badgeBlueOutline}>Sociável com gatos</span>}
                        {dados.sociabilidade.comCachorros && <span className={styles.badgeBlueOutline}>Sociável com cachorros</span>}
                    </div>
                </div>
            </div>

            {/* BOTÕES DE AÇÃO NO RODAPÉ DO CARD */}
            <div className={styles.footerActions}>
                <button className={styles.btnNegar} onClick={handleNegar}>
                    <FaTimes /> Negar Registro
                </button>

                <button className={styles.btnAceitar} onClick={handleAceitar}>
                    <FaCheck /> Aceitar Registro
                </button>
            </div>
        </div>

      </div>
    </Layout>
  );
}