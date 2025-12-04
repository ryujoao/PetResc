import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminTabelas.module.css";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaSearch,
  FaDownload,
  FaDog,
  FaCat,
} from "react-icons/fa";

// Dados Mockados
const historyData = [
  {
    id: 101,
    data: "25/10/2025",
    hora: "14:30",
    pet: "Luna",
    especie: "Gato",
    responsavel: "ONG Abrigo Viver",
    tipoUser: "ONG",
  },
  {
    id: 102,
    data: "25/10/2025",
    hora: "10:15",
    pet: "Thor",
    especie: "Cachorro",
    responsavel: "ONG Cão Feliz",
    tipoUser: "ONG",
  },
  {
    id: 103,
    data: "24/10/2025",
    hora: "18:45",
    pet: "Paçoca",
    especie: "Cachorro",
    responsavel: "Carlos Silva",
    tipoUser: "USER",
  },
  {
    id: 104,
    data: "24/10/2025",
    hora: "09:20",
    pet: "Mimi",
    especie: "Gato",
    responsavel: "Ana Maria",
    tipoUser: "USER",
  },
  {
    id: 105,
    data: "23/10/2025",
    hora: "16:00",
    pet: "Rex",
    especie: "Cachorro",
    responsavel: "Instituto Patas",
    tipoUser: "ONG",
  },
];

export default function AdminHistoricoPets() {
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
          <Link to="/admin/status-pets" className={styles.linkVoltar}>
            <FaArrowLeft /> 
          </Link>
        </div>

        {/* Barra de Filtros */}
        <div className={styles.barraFiltrosHistorico}>
          <div className={styles.grupoFiltro}>
            <label className={styles.rotuloFiltroPequeno}>Data Início</label>
            <input type="date" className={styles.inputData} />
          </div>
          <div className={styles.grupoFiltro}>
            <label className={styles.rotuloFiltroPequeno}>Data Fim</label>
            <input type="date" className={styles.inputData} />
          </div>
          <div className={styles.grupoFiltro}>
            <label className={styles.rotuloFiltroPequeno}>
              Buscar Responsável
            </label>
            <div className={styles.grupoBusca}>
              <input
                type="text"
                placeholder="Nome da ONG ou Pessoa"
                className={styles.inputData}
              />
              <button className={styles.botaoPesquisa}>
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className={styles.containerTabela}>
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
              {historyData.map((item) => (
                <tr key={item.id}>
                  {/* Coluna Data */}
                  <td>
                    <div className={styles.celulaDataHora}>
                      <FaCalendarAlt color="#999" />
                      <div>
                        <div className={styles.textoData}>{item.data}</div>
                        <div className={styles.textoHora}>{item.hora}</div>
                      </div>
                    </div>
                  </td>

                  {/* Coluna Pet */}
                  <td className={styles.colunaNome}>{item.pet}</td>

                  {/* Coluna Espécie */}
                  <td>
                    {item.especie === "Cachorro" ? (
                      <span className={styles.celulaEspecie}>
                        <FaDog /> Cão
                      </span>
                    ) : (
                      <span className={styles.celulaEspecie}>
                        <FaCat /> Gato
                      </span>
                    )}
                  </td>

                  {/* Coluna Responsável */}
                  <td>
                    {item.responsavel}
                    <span
                      className={`${styles.badgeTipoUsuario} ${
                        item.tipoUser === "ONG"
                          ? styles.tipoOng
                          : styles.tipoUser
                      }`}
                    >
                      {item.tipoUser}
                    </span>
                  </td>

                  {/* Ações */}
                  <td>
                    <Link
                      to={`/admin/gerenciamento/pets`}
                      className={styles.linkDetalhes}
                    >
                      Ver Cadastro &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
