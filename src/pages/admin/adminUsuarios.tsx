import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminTabelas.module.css";
import {
  FaArrowLeft,
  FaSearch,
  FaEdit,
  FaBan,
  FaCheck,
  FaUser,
} from "react-icons/fa";

// Dados Mockados de Usuários
const usersData = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@gmail.com",
    tipo: "Adotante",
    data: "12/10/2025",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Bruno Souza",
    email: "bruno.s@hotmail.com",
    tipo: "Doador",
    data: "15/10/2025",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Carla Dias",
    email: "carla.dias@uol.com.br",
    tipo: "Adotante",
    data: "05/09/2025",
    status: "Bloqueado",
  },
  {
    id: 4,
    nome: "Marcos Paulo",
    email: "marcos.p@gmail.com",
    tipo: "Adotante",
    data: "20/10/2025",
    status: "Ativo",
  },
  {
    id: 5,
    nome: "Juliana Lima",
    email: "ju.lima@outlook.com",
    tipo: "Lar Temp.",
    data: "22/10/2025",
    status: "Ativo",
  },
];

export default function AdminUsuarios() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>Gerenciar Usuários</h1>
            <h2 className={styles.subtituloPagina}>
              Base de usuários cadastrados (PF)
            </h2>
          </div>
          <Link to="/admin/gerenciamento" className={styles.linkVoltar}>
            <FaArrowLeft />
          </Link>
        </div>

        {/* Barra de Pesquisa */}
        <div className={styles.containerBarraPesquisa}>
          <input
            type="text"
            className={`${styles.inputFiltro} ${styles.inputSemMargem}`}
            placeholder="Buscar por nome ou e-mail..."
          />
          <button className={styles.botaoPesquisa}>
            <FaSearch />
          </button>
        </div>

        <div className={styles.containerTabela}>
          <table className={styles.tabelaUsuarios}>
            <thead>
              <tr>
                <th style={{ width: "50px", textAlign: "center" }}>#</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Perfil</th>
                <th>Cadastro</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.id}>
                  <td className={styles.celulaIcone}>
                    <FaUser />
                  </td>

                  <td>
                    <span className={styles.colunaNome}>{user.nome}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.tipo}</td>
                  <td>{user.data}</td>
                  <td>
                    <span
                      className={`${styles.badgeStatus} ${
                        user.status === "Ativo"
                          ? styles.statusAtivo
                          : styles.statusBloqueado
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.acoesTabela}>
                      <button
                        className={`${styles.btnAcaoTabela} ${styles.btnEditar}`}
                        title="Editar"
                      >
                        <FaEdit size={14} />
                      </button>

                      {user.status === "Ativo" ? (
                        <button
                          className={`${styles.btnAcaoTabela} ${styles.btnBloquear}`}
                          title="Bloquear Usuário"
                        >
                          <FaBan size={14} />
                        </button>
                      ) : (
                        <button
                          className={`${styles.btnAcaoTabela} ${styles.btnUnblock}`}
                          title="Desbloquear Usuário"
                        >
                          <FaCheck size={14} />
                        </button>
                      )}
                    </div>
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
