import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminTabelas.module.css";
import api from "../../services/api";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaSearch,
  FaDog,
  FaCat,
  FaPaw
} from "react-icons/fa";

interface HistoricoItem {
  id: number;
  nome: string;
  especie: string;
  createdAt: string;
  account: {
    nome: string;
    role: string;
  };
}

export default function AdminHistoricoPets() {
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Estados dos Filtros
  const [busca, setBusca] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  useEffect(() => {
    async function fetchHistorico() {
      try {
        const response = await api.get("/admin/animais");
        // Garante que é um array antes de setar
        if (Array.isArray(response.data)) {
            setHistorico(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistorico();
  }, []);

  // 2. LÓGICA DE FILTRAGEM (Blindada contra Null/Undefined)
  const itensFiltrados = historico.filter((item) => {
    // Proteção: Se item for inválido, ignora
    if (!item) return false;

    const termo = busca.toLowerCase();
    
    // Proteção: Garante string vazia se vier null do banco
    const nomePet = (item.nome || "").toLowerCase();
    const nomeResp = (item.account?.nome || "").toLowerCase();

    const matchTexto = nomePet.includes(termo) || nomeResp.includes(termo);

    // Filtro de Data
    let matchData = true;
    if (dataInicio || dataFim) {
        if (!item.createdAt) return false; // Se não tiver data, não entra no filtro

        const dataItem = new Date(item.createdAt).setHours(0,0,0,0);
        const inicio = dataInicio ? new Date(dataInicio).setHours(0,0,0,0) : null;
        const fim = dataFim ? new Date(dataFim).setHours(0,0,0,0) : null;

        if (inicio && dataItem < inicio) matchData = false;
        if (fim && dataItem > fim) matchData = false;
    }

    return matchTexto && matchData;
  });

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>Histórico de Cadastros</h1>
            <h2 className={styles.subtituloPagina}>
              Log de entrada de novos animais na plataforma
            </h2>
          </div>
          <Link to="/admin" className={styles.linkVoltar}>
            <FaArrowLeft /> 
          </Link>
        </div>

        {/* Barra de Filtros */}
        <div className={styles.barraFiltrosHistorico}>
          <div className={styles.grupoFiltro}>
            <label className={styles.rotuloFiltroPequeno}>Data Início</label>
            <input 
                type="date" 
                className={styles.inputData} 
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>
          <div className={styles.grupoFiltro}>
            <label className={styles.rotuloFiltroPequeno}>Data Fim</label>
            <input 
                type="date" 
                className={styles.inputData} 
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
          <div className={styles.grupoFiltro}>
            <label className={styles.rotuloFiltroPequeno}>
              Buscar Responsável ou Pet
            </label>
            <div className={styles.grupoBusca}>
              <input
                type="text"
                placeholder="Nome da ONG, Pessoa ou Pet"
                className={styles.inputData}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <button className={styles.botaoPesquisa}>
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className={styles.containerTabela}>
          {loading ? (
              <p style={{padding: 20}}>Carregando histórico...</p>
          ) : (
            <table className={styles.tabelaUsuarios}>
                <thead>
                <tr>
                    <th>Data / Hora</th>
                    <th>Pet</th>
                    <th>Espécie</th>
                    <th>Cadastrado por</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {itensFiltrados.length === 0 && (
                    <tr>
                        <td colSpan={5} style={{textAlign:'center', padding: 20, color: '#999'}}>
                            Nenhum registro encontrado.
                        </td>
                    </tr>
                )}

                {itensFiltrados.map((item) => {
                    // Proteção na Data
                    const dataString = item.createdAt ? new Date(item.createdAt) : new Date();
                    const dataFormatada = dataString.toLocaleDateString('pt-BR');
                    const horaFormatada = dataString.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    
                    // Proteção na Conta
                    const nomeConta = item.account?.nome || "Desconhecido";
                    const roleConta = item.account?.role || "PUBLICO";
                    const tipoUser = roleConta === 'ONG' ? 'ONG' : 'USER';
                    
                    // Proteção na Espécie
                    const especieStr = (item.especie || "").toLowerCase();

                    return (
                        <tr key={item.id}>
                        {/* Coluna Data */}
                        <td>
                            <div className={styles.celulaDataHora}>
                            <FaCalendarAlt color="#999" />
                            <div>
                                <div className={styles.textoData}>{dataFormatada}</div>
                                <div className={styles.textoHora}>{horaFormatada}</div>
                            </div>
                            </div>
                        </td>

                        {/* Coluna Pet */}
                        <td className={styles.colunaNome}>
                            <strong>{item.nome || "Sem Nome"}</strong>
                        </td>

                        {/* Coluna Espécie */}
                        <td>
                            {especieStr.includes("cachorro") || especieStr.includes("cão") ? (
                            <span className={styles.celulaEspecie}>
                                <FaDog /> Cão
                            </span>
                            ) : especieStr.includes("gato") ? (
                            <span className={styles.celulaEspecie}>
                                <FaCat /> Gato
                            </span>
                            ) : (
                            <span className={styles.celulaEspecie}>
                                <FaPaw /> {item.especie || "Outro"}
                            </span>
                            )}
                        </td>

                        {/* Coluna Responsável */}
                        <td>
                            {nomeConta}
                            <span
                            className={`${styles.badgeTipoUsuario} ${
                                tipoUser === "ONG"
                                ? styles.tipoOng
                                : styles.tipoUser
                            }`}
                            >
                            {tipoUser}
                            </span>
                        </td>

                        {/* Ações */}
                        <td>
                            <button
                                onClick={() => navigate(`/animal/${item.id}`)}
                                className={styles.linkDetalhes}
                                style={{background:'none', border:'none', cursor:'pointer', fontSize:'inherit', fontFamily:'inherit'}}
                            >
                            Ver Cadastro &rarr;
                            </button>
                        </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}