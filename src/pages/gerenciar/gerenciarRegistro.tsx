import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./gerenciar.module.css";
import Layout from "../../components/layout"; // Ajuste o caminho conforme seu projeto
import { FaArrowLeft } from "react-icons/fa";

// Dados mockados de UM animal específico
const MOCK_DADOS = {
  id: 1,
  animal: {
    nome: "Branquinho",
    fotoUrl: "https://placehold.co/400x400/png", // Placeholder
    status: "Aguardando Vaga",
    codigo: "000000",
    ultimaAtualizacao: "00/00/0000",
  },
  caracteristicas: {
    nome: "Sem Nome Definida (SND)",
    genero: "Macho",
    porte: "Não informado",
    cor: "Branca",
    raca: "Sem Raça Definida (SRD)",
    idade: "Adulto",
  },
  fichaMedica: {
    vacinado: true,
    castrado: false, // Exemplo falso para testar visualização
    vermifugado: false,
  },
  temperamento: {
    docil: true,
    brincalhao: true,
    sociavel: true,
    carente: true,
    independente: true,
  },
  sociabilidade: {
    comEstranhos: true,
    comCriancas: true,
    comGatos: true,
    comCachorros: true,
  },
};

export default function GerenciarRegistro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dados, setDados] = useState<typeof MOCK_DADOS | null>(null);

  useEffect(() => {
    // Simula carregamento
    setTimeout(() => {
      setDados(MOCK_DADOS);
    }, 500);
  }, [id]);

  if (!dados)
    return (
      <Layout>
        <div>Carregando...</div>
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.btnVoltar}>
          <FaArrowLeft /> Voltar
        </button>

        {/* --- CABEÇALHO: FOTO À ESQUERDA, CARD AZUL À DIREITA --- */}
        <div className={styles.secaoCabecalho}>
          <div className={styles.moldeFoto}>
            <img
              src={dados.animal.fotoUrl}
              alt={dados.animal.nome}
              className={styles.fotoAnimal}
            />
          </div>

          <div className={styles.painelInfoPrincipal}>
            <h1 className={styles.nomeAnimal}>{dados.animal.nome}</h1>
            <div className={styles.linhaStatus}>
              Status: <strong>{dados.animal.status}</strong>
              <br />
              Última atualização: {dados.animal.ultimaAtualizacao}
            </div>

            <button className={styles.btnMudarStatus}>Mudar Status</button>

            <span className={styles.codigoAnimal}>
              Código: {dados.animal.codigo}
            </span>
          </div>
        </div>

        {/* --- TÍTULO E DIVISOR --- */}
        <h2 className={styles.tituloSecao}>Características</h2>
        <div className={styles.divisorAzul}></div>

        {/* --- GRID DE 4 COLUNAS --- */}
        <div className={styles.gradeInfos}>
          {/* COLUNA 1: DADOS BÁSICOS (TEXTO) */}
          <div className={styles.coluna}>
            <div className={styles.blocoDado}>
              <span className={styles.rotulo}>Nome</span>
              <p className={styles.valor}>{dados.caracteristicas.nome}</p>
            </div>
            <div className={styles.blocoDado}>
              <span className={styles.rotulo}>Gênero</span>
              <p className={styles.valor}>{dados.caracteristicas.genero}</p>
            </div>
            <div className={styles.blocoDado}>
              <span className={styles.rotulo}>PORTE</span>
              <p className={styles.valor}>{dados.caracteristicas.porte}</p>
            </div>
            <div className={styles.blocoDado}>
              <span className={styles.rotulo}>COR PREDOMINANTE</span>
              <p className={styles.valor}>{dados.caracteristicas.cor}</p>
            </div>
            <div className={styles.blocoDado}>
              <span className={styles.rotulo}>RAÇA</span>
              <p className={styles.valor}>{dados.caracteristicas.raca}</p>
            </div>
            <div className={styles.blocoDado}>
              <span className={styles.rotulo}>IDADE</span>
              <p className={styles.valor}>{dados.caracteristicas.idade}</p>
            </div>
          </div>

          {/* COLUNA 2: CUIDADOS VETERINÁRIOS (BADGES) */}
          <div className={`${styles.coluna} ${styles.comBordaEsquerda}`}>
            <h3 className={styles.tituloColuna}>Cuidados Veterinários</h3>
            <div className={styles.wrapperEtiquetas}>
              {dados.fichaMedica.vacinado && (
                <div className={styles.etiquetaAzul}>Vacinado</div>
              )}
              {dados.fichaMedica.castrado && (
                <div className={styles.etiquetaAzul}>Castrado</div>
              )}
              {dados.fichaMedica.vermifugado && (
                <div className={styles.etiquetaAzul}>Vermifugado</div>
              )}
            </div>
          </div>

          {/* COLUNA 3: TEMPERAMENTO (BADGES) */}
          <div className={`${styles.coluna} ${styles.comBordaEsquerda}`}>
            <h3 className={styles.tituloColuna}>Temperamento</h3>
            <div className={styles.wrapperEtiquetas}>
              {dados.temperamento.docil && (
                <div className={styles.etiquetaAzul}>Dócil</div>
              )}
              {dados.temperamento.brincalhao && (
                <div className={styles.etiquetaAzul}>Brincalhão</div>
              )}
              {dados.temperamento.sociavel && (
                <div className={styles.etiquetaAzul}>Sociável</div>
              )}
              {dados.temperamento.carente && (
                <div className={styles.etiquetaAzul}>Carente</div>
              )}
              {dados.temperamento.independente && (
                <div className={styles.etiquetaAzul}>Independente</div>
              )}
            </div>
          </div>

          {/* COLUNA 4: SOCIABILIDADE (BADGES) */}
          <div className={`${styles.coluna} ${styles.comBordaEsquerda}`}>
            <h3 className={styles.tituloColuna}>Sociabilidade</h3>
            <div className={styles.wrapperEtiquetas}>
              {dados.sociabilidade.comEstranhos && (
                <div className={styles.etiquetaAzul}>
                  Sociável com estranhos
                </div>
              )}
              {dados.sociabilidade.comCriancas && (
                <div className={styles.etiquetaAzul}>Sociável com crianças</div>
              )}
              {dados.sociabilidade.comGatos && (
                <div className={styles.etiquetaAzul}>Sociável com gatos</div>
              )}
              {dados.sociabilidade.comCachorros && (
                <div className={styles.etiquetaAzul}>
                  Sociável com cachorros
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- BOTÕES DO RODAPÉ --- */}
        <div className={styles.rodapeAcoes}>
          <button
            className={`${styles.btnAcao} ${styles.negativo}`}
            onClick={() => alert("Negado")}
          >
            Negar Registro
          </button>
          <button
            className={`${styles.btnAcao} ${styles.positivo}`}
            onClick={() => alert("Aceito")}
          >
            Aceitar Registro
          </button>
        </div>
      </div>
    </Layout>
  );
}
