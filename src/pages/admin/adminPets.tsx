import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminListas.module.css";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

// Mock dos Dados
const petsData = [
  {
    id: 1,
    nome: "Luna (Gato)",
    dono: "ONG: Abrigo Viver",
    status: "Em análise",
    progresso: 75,
  },
  {
    id: 2,
    nome: "Rex (Cachorro)",
    dono: "ONG: Patas Unidas",
    status: "Disponível",
    progresso: 100,
  },
  {
    id: 3,
    nome: "Luna (Gato)",
    dono: "Protetor: Carlos M.",
    status: "Adotado",
    progresso: 100,
  },
];

export default function AdminGerenciamento() {
  // Estados para controlar a abertura de cada menu
  const [statusOpen, setStatusOpen] = useState(true);
  const [especieOpen, setEspecieOpen] = useState(false);
  const [porteOpen, setPorteOpen] = useState(false);
  const [idadeOpen, setIdadeOpen] = useState(false);
  const [ongOpen, setOngOpen] = useState(false);
  const [periodoOpen, setPeriodoOpen] = useState(false);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>Gerenciamento de Pets</h1>
            <h2 className={styles.subtituloPagina}>Gerenciamento de animais</h2>
          </div>
          <Link to="/admin/gerenciamento" className={styles.linkVoltar}>
            <FaArrowLeft />
          </Link>
        </div>

        <div className={styles.conteudoGestao}>
          
          <div className={styles.listaCartoes}>
            {petsData.map((pet) => (
              <div key={pet.id} className={styles.cartaoItemGestao}>
                <div className={styles.linhaCabecalhoCartao}>
                  <span className={styles.nomeItem}>{pet.nome}</span>
                  <span className={styles.statusItem}>Status: {pet.status}</span>
                </div>
                
                <div className={styles.donoPet}>{pet.dono}</div>
                
                <div className={styles.linhaProgresso}>
                  <span className={styles.rotuloProgresso}>Progresso:</span>
                  <div className={styles.fundoBarraProgresso}>
                    <div 
                        className={styles.preenchimentoBarra} 
                        style={{ width: `${pet.progresso}%` }}
                    ></div>
                  </div>
                  <span className={styles.valorProgresso}>{pet.progresso}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.barraLateralFiltros}>
            <h3 className={styles.tituloFiltro}>Filtros</h3>
            
            {/* Filtro status */}
            <div className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro} onClick={() => setStatusOpen(!statusOpen)}>
                    Status
                    {statusOpen ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                </div>
                {statusOpen && (
                    <ul className={styles.listaSubItens}>
                        <li className={styles.subItem}>Pendente de revisão</li>
                        <li className={styles.subItem}>Em tratamento</li>
                        <li className={styles.subItem}>Disponível</li>
                        <li className={styles.subItem}>Adotado</li>
                    </ul>
                )}
            </div>

            {/* Filtro espécie */}
            <div className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro} onClick={() => setEspecieOpen(!especieOpen)}>
                    Espécie
                    {especieOpen ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                </div>
                {especieOpen && (
                    <ul className={styles.listaSubItens}>
                        <li className={styles.subItem}>Cachorro</li>
                        <li className={styles.subItem}>Gato</li>
                        <li className={styles.subItem}>Outros</li>
                    </ul>
                )}
            </div>

            {/* Filtro porte */}
            <div className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro} onClick={() => setPorteOpen(!porteOpen)}>
                    Porte
                    {porteOpen ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                </div>
                {porteOpen && (
                    <ul className={styles.listaSubItens}>
                        <li className={styles.subItem}>Pequeno</li>
                        <li className={styles.subItem}>Médio</li>
                        <li className={styles.subItem}>Grande</li>
                    </ul>
                )}
            </div>

            {/* Filtro idade */}
            <div className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro} onClick={() => setIdadeOpen(!idadeOpen)}>
                    Idade
                    {idadeOpen ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                </div>
                {idadeOpen && (
                    <div style={{ paddingLeft: '1rem' }}>
                        <ul className={styles.listaSubItens} style={{ paddingLeft: 0 }}>
                            <li className={styles.subItem}>Filhote</li>
                            <li className={styles.subItem}>Adulto</li>
                        </ul>
                        <input 
                            type="text" 
                            className={styles.inputFiltro} 
                            placeholder="Anos ou meses"
                        />
                    </div>
                )}
            </div>

            {/* Filtro ong parceira */}
            <div className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro} onClick={() => setOngOpen(!ongOpen)}>
                    ONG parceira
                    {ongOpen ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                </div>
                {ongOpen && (
                    <ul className={styles.listaSubItens}>
                        <li className={styles.subItem}>ONG Cão Amigo</li>
                        <li className={styles.subItem}>Instituto Patas Unidas</li>
                        <li className={styles.subItem}>Abrigo Bons Cães</li>
                        <li className={styles.subItem}>Abrigo Viver</li>
                    </ul>
                )}
            </div>

            {/* Filtro período */}
            <div className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro} onClick={() => setPeriodoOpen(!periodoOpen)}>
                    Periodo de cadastro
                    {periodoOpen ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                </div>
                {periodoOpen && (
                    <ul className={styles.listaSubItens}>
                        <li className={styles.subItem}>Hoje</li>
                        <li className={styles.subItem}>Últimos 7 dias</li>
                        <li className={styles.subItem}>Últimos 30 dias</li>
                        <li className={styles.subItem}>Todos</li>
                    </ul>
                )}
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}