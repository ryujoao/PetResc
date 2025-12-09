import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminListas.module.css";
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../../services/api";

// Interface dos dados que vêm da API
interface AnimalAdmin {
  id: number;
  nome: string;
  especie: string;
  status: string;     // Status do banco (DISPONIVEL, ADOTADO...)
  statusReal: string; // Status calculado (AGUARDANDO...)
  createdAt: string;
  account: {
    nome: string;
    role: string;
    cidade?: string;
    estado?: string;
  };
}

export default function AdminGerenciamento() {
  const navigate = useNavigate();
  
  // Estados de Dados
  const [pets, setPets] = useState<AnimalAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de Controle dos Menus (Collapse)
  const [menusOpen, setMenusOpen] = useState({
    status: true,
    especie: false,
    porte: false, // Nota: Porte não vem na listagem simples atual, precisaria ajustar o backend se for crucial
    idade: false,
    ong: false,
    periodo: false
  });

  // Estados dos Filtros Selecionados
  const [filtroStatus, setFiltroStatus] = useState<string>("");
  const [filtroEspecie, setFiltroEspecie] = useState<string>("");
  const [filtroOng, setFiltroOng] = useState<string>("");

  // 1. BUSCAR DADOS
  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await api.get("/admin/animais");
        setPets(response.data);
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, []);

  // Toggle do Menu Lateral
  const toggleMenu = (key: keyof typeof menusOpen) => {
    setMenusOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Extrair lista única de ONGs para o filtro dinâmico
  const listaOngs = Array.from(new Set(pets.map(p => p.account.nome))).sort();

  // 2. LÓGICA DE FILTRAGEM
  const petsFiltrados = pets.filter(pet => {
    // Filtro Status
    if (filtroStatus) {
        const statusNormalizado = pet.statusReal || pet.status;
        if (filtroStatus === 'Disponível' && statusNormalizado !== 'DISPONIVEL') return false;
        if (filtroStatus === 'Adotado' && statusNormalizado !== 'ADOTADO') return false;
        if (filtroStatus === 'Pendente' && statusNormalizado !== 'AGUARDANDO') return false;
        if (filtroStatus === 'Encontrado' && statusNormalizado !== 'ENCONTRADO') return false;
    }

    // Filtro Espécie
    if (filtroEspecie) {
        if (!pet.especie.toLowerCase().includes(filtroEspecie.toLowerCase())) return false;
    }

    // Filtro ONG
    if (filtroOng) {
        if (pet.account.nome !== filtroOng) return false;
    }

    return true;
  });

  // Helper para formatar a data
  const formatDate = (isoString: string) => {
      return new Date(isoString).toLocaleDateString('pt-BR');
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>Gerenciamento Detalhado</h1>
            <h2 className={styles.subtituloPagina}>Visualize e filtre os animais da plataforma</h2>
          </div>
          <Link to="/admin" className={styles.linkVoltar}>
            <FaArrowLeft />
          </Link>
        </div>

        <div className={styles.conteudoGestao}>
          
          {/* LISTA DE CARTÕES */}
          <div className={styles.listaCartoes}>
            {loading ? <p>Carregando...</p> : petsFiltrados.length === 0 ? (
                <div style={{padding: 20, color: '#666'}}>Nenhum animal encontrado com esses filtros.</div>
            ) : (
                petsFiltrados.map((pet) => {
                    const statusExibicao = pet.statusReal || pet.status;
                    
                    // Definindo cor da barra lateralzinha baseada no status
                    let statusColor = '#ccc';
                    if(statusExibicao === 'DISPONIVEL') statusColor = '#2f80ed';
                    if(statusExibicao === 'ADOTADO') statusColor = '#27ae60';
                    if(statusExibicao === 'AGUARDANDO') statusColor = '#f2c94c';

                    return (
                      <div key={pet.id} className={styles.cartaoItemGestao} style={{borderLeft: `4px solid ${statusColor}`}}>
                        
                        <div className={styles.linhaCabecalhoCartao}>
                          <span className={styles.nomeItem}>
                              {pet.nome} <span style={{fontSize:'0.8rem', fontWeight:'normal'}}>({pet.especie})</span>
                          </span>
                          <span 
                            className={styles.statusItem}
                            style={{color: statusColor, fontWeight: 'bold'}}
                          >
                              {statusExibicao}
                          </span>
                        </div>
                        
                        <div className={styles.donoPet}>
                            Responsável: <strong>{pet.account.nome}</strong>
                            <br/>
                            <span style={{fontSize:'0.8rem', color:'#666'}}>
                                <FaMapMarkerAlt size={10}/> {pet.account.cidade || "Local não inf."} - {pet.account.estado || "UF"}
                            </span>
                        </div>
                        
                        {/* ADAPTAÇÃO: Substituindo Porcentagem por Data e Botão */}
                        <div className={styles.linhaProgresso} style={{justifyContent: 'space-between', marginTop: '15px'}}>
                          
                          <div style={{display:'flex', flexDirection:'column'}}>
                              <span className={styles.rotuloProgresso} style={{marginBottom: 2}}>Cadastrado em:</span>
                              <span style={{fontSize: '0.9rem', color: '#333', fontWeight: '500'}}>
                                  {formatDate(pet.createdAt)}
                              </span>
                          </div>

                          <button 
                            onClick={() => navigate(`/animal/${pet.id}`)}
                            style={{
                                background: 'none', border: '1px solid #ccc', borderRadius: '4px', 
                                padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem',
                                display: 'flex', alignItems: 'center', gap: '5px', color: '#555'
                            }}
                          >
                              <FaEye /> Ver Detalhes
                          </button>

                        </div>
                      </div>
                    );
                })
            )}
          </div>

          {/* BARRA LATERAL DE FILTROS */}
          <div className={styles.barraLateralFiltros}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h3 className={styles.tituloFiltro}>Filtros</h3>
                {(filtroStatus || filtroEspecie || filtroOng) && (
                    <button 
                        onClick={() => { setFiltroStatus(""); setFiltroEspecie(""); setFiltroOng(""); }}
                        style={{border:'none', background:'none', color:'#e74c3c', cursor:'pointer', fontSize:'0.8rem'}}
                    >
                        Limpar
                    </button>
                )}
            </div>
            
            {/* Filtro Status */}
            <div className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro} onClick={() => toggleMenu('status')}>
                    Status
                    {menusOpen.status ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                </div>
                {menusOpen.status && (
                    <ul className={styles.listaSubItens}>
                        {['Pendente', 'Disponível', 'Adotado', 'Encontrado'].map(st => (
                            <li 
                                key={st} 
                                className={styles.subItem}
                                style={{fontWeight: filtroStatus === st ? 'bold' : 'normal', color: filtroStatus === st ? '#2D68A6' : 'inherit', cursor:'pointer'}}
                                onClick={() => setFiltroStatus(filtroStatus === st ? "" : st)}
                            >
                                {st}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Filtro Espécie */}
            <div className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro} onClick={() => toggleMenu('especie')}>
                    Espécie
                    {menusOpen.especie ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                </div>
                {menusOpen.especie && (
                    <ul className={styles.listaSubItens}>
                        {['Cachorro', 'Gato', 'Outro'].map(esp => (
                            <li 
                                key={esp} 
                                className={styles.subItem}
                                style={{fontWeight: filtroEspecie === esp ? 'bold' : 'normal', color: filtroEspecie === esp ? '#2D68A6' : 'inherit', cursor:'pointer'}}
                                onClick={() => setFiltroEspecie(filtroEspecie === esp ? "" : esp)}
                            >
                                {esp}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Filtro ONG (Dinâmico) */}
            <div className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro} onClick={() => toggleMenu('ong')}>
                    Responsável / ONG
                    {menusOpen.ong ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                </div>
                {menusOpen.ong && (
                    <ul className={styles.listaSubItens}>
                        {listaOngs.map(nome => (
                            <li 
                                key={nome} 
                                className={styles.subItem}
                                style={{fontWeight: filtroOng === nome ? 'bold' : 'normal', color: filtroOng === nome ? '#2D68A6' : 'inherit', cursor:'pointer'}}
                                onClick={() => setFiltroOng(filtroOng === nome ? "" : nome)}
                            >
                                {nome}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Filtros Visuais (Sem lógica ainda, mantidos para layout) */}
            <div className={styles.grupoFiltro} style={{opacity: 0.5}}>
                <div className={styles.rotuloFiltro}>Porte (Em breve)</div>
            </div>
            <div className={styles.grupoFiltro} style={{opacity: 0.5}}>
                <div className={styles.rotuloFiltro}>Idade (Em breve)</div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}