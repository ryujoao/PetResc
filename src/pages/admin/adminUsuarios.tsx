import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminTabelas.module.css";
import api from "../../services/api";
import {
  FaArrowLeft,
  FaSearch,
  FaEdit,
  FaTrash, // Trocamos o Ban pelo Trash
  FaUser,
} from "react-icons/fa";

interface UsuarioAdmin {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  data: string;
  status: string;
}

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  // 1. CARREGAR DADOS
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await api.get("/admin/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao listar usuários:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsuarios();
  }, []);

  // 2. FUNÇÃO DELETAR
  const handleDelete = async (id: number, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário "${nome}"? Essa ação é irreversível.`)) {
        try {
            await api.delete(`/admin/usuarios/${id}`); // Reusa a rota de delete genérica que criamos
            setUsuarios(prev => prev.filter(u => u.id !== id));
            alert("Usuário removido.");
        } catch (error) {
            alert("Erro ao excluir usuário.");
        }
    }
  };

  // 3. FILTRAGEM LOCAL
  const usuariosFiltrados = usuarios.filter(u => 
    u.nome.toLowerCase().includes(busca.toLowerCase()) ||
    u.email.toLowerCase().includes(busca.toLowerCase())
  );

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
          <Link to="/admin" className={styles.linkVoltar}>
            <FaArrowLeft />
          </Link>
        </div>

        {/* Barra de Pesquisa */}
        <div className={styles.containerBarraPesquisa}>
          <input
            type="text"
            className={`${styles.inputFiltro} ${styles.inputSemMargem}`}
            placeholder="Buscar por nome ou e-mail..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className={styles.botaoPesquisa}>
            <FaSearch />
          </button>
        </div>

        <div className={styles.containerTabela}>
          {loading ? (
              <p style={{padding: 20}}>Carregando usuários...</p>
          ) : (
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
                {usuariosFiltrados.length === 0 && (
                    <tr>
                        <td colSpan={7} style={{textAlign:'center', padding:20, color:'#999'}}>
                            Nenhum usuário encontrado.
                        </td>
                    </tr>
                )}

                {usuariosFiltrados.map((user) => (
                    <tr key={user.id}>
                    <td className={styles.celulaIcone}>
                        <FaUser />
                    </td>

                    <td>
                        <span className={styles.colunaNome}>{user.nome}</span>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.tipo}</td>
                    <td>{new Date(user.data).toLocaleDateString('pt-BR')}</td>
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
                            title="Editar (Em breve)"
                            style={{opacity: 0.5, cursor: 'not-allowed'}}
                        >
                            <FaEdit size={14} />
                        </button>

                        {/* Botão de Excluir (Reutilizando estilo do Bloquear para manter design) */}
                        <button
                            className={`${styles.btnAcaoTabela} ${styles.btnBloquear}`}
                            title="Excluir Usuário"
                            onClick={() => handleDelete(user.id, user.nome)}
                        >
                            <FaTrash size={14} />
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}