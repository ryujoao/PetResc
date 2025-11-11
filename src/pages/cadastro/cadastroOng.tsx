import { useState } from "react";
import { Link } from "react-router-dom";
// import styles from "../style/navbar.module.css"; // Simulado abaixo
// import Denuncie from "./denuncie"; // Simulado abaixo
// import Notificacoes from "./notificacoes"; // Simulado abaixo
// import { useAuth } from "../auth/AuthContext"; // Simulado abaixo

// --- INÍCIO DAS SIMULAÇÕES (MOCKS) ---
// Para corrigir os erros de compilação, estou simulando os arquivos que não temos.
// No seu projeto real, você DEVE usar os seus 'imports' originais (linhas 3-6).

// 1. Simulação do CSS Module
const styles: { [key: string]: string } = {
  topBar: "topBar-mock",
  navbar: "navbar-mock",
  navLogo: "navLogo-mock",
  navCategorias: "navCategorias-mock",
  navLink: "navLink-mock",
  perfilUsuario: "perfilUsuario-mock",
  notificacao: "notificacao-mock",
  bell: "bell-mock",
  perfilLink: "perfilLink-mock",
  usernameText: "usernameText-mock",
  botaoLogout: "botaoLogout-mock",
  botoesCadastro: "botoesCadastro-mock",
  cadastroONG: "cadastroONG-mock",
  cadastro: "cadastro-mock",
};

// 2. Simulação do Componente 'Denuncie'
const Denuncie = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <h2>Modal Denúncia (Simulação)</h2>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

// 3. Simulação do Componente 'Notificacoes'
const Notificacoes = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "40px",
        right: 0,
        background: "white",
        border: "1px solid #ccc",
        padding: "10px",
        zIndex: 100,
      }}
    >
      <p>Notificações (Simulação)</p>
    </div>
  );
};

// 4. Simulação do Contexto 'useAuth'
interface User {
  id: number | string;
  nome?: string; // Nome do usuário ou responsável
  nomeOng?: string; // Nome da ONG (se for ONG)
  role: "USER" | "ONG" | "ADMIN";
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: User | null;
}

const useAuth = (): AuthContextType => {
  // --- VOCÊ PODE MUDAR O RETORNO AQUI PARA TESTAR ---
  // 3. Simular ONG/Admin logado (para testar sua nova lógica)
  return {
    isAuthenticated: true,
    login: () => console.log("Simular login"),
    logout: () => console.log("Simular logout"),
    user: { id: 2, nome: "Responsavel ONG", nomeOng: "PetResc Focinhos", role: "ONG" },
  };

  // 2. Simular usuário COMUM logado
  // return {
  //   isAuthenticated: true,
  //   login: () => console.log("Simular login"),
  //   logout: () => console.log("Simular logout"),
  //   user: { id: 1, nome: "UsuarioComum", role: "USER" },
  // };
};

// --- FIM DAS SIMULAÇÕES ---

export default function Nav() {
  // No seu código real, os imports das linhas 3-6 trarão o 'useAuth' verdadeiro
  const { isAuthenticated, login, logout, user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Variável para verificar se o usuário é ONG ou Admin
  const isOngOrAdmin =
    isAuthenticated && (user?.role === "ONG" || user?.role === "ADMIN");

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <>
      <Denuncie isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className={`${styles.topBar} topBar`}></div>
      <div className={`${styles.navbar} navbar`}>
        <div className={styles.navLogo}>
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                maxWidth: "90px",
                height: "60px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            />
          </Link>
        </div>

        {/* Links de navegação que mudam com base no login E na role */}
        <ul className={styles.navCategorias}>
          {/* Bloco condicional:
            Estes links só aparecem se o usuário NÃO FOR uma ONG/Admin.
          */}
          {!isOngOrAdmin && (
            <>
              <li>
                <Link
                  to={isAuthenticated ? "/adotar" : "/cadastro"}
                  className={styles.navLink}
                >
                  Adotar
                </Link>
              </li>
              <li>
                <Link
                  to={isAuthenticated ? "/larTemporario" : "/cadastro"}
                  className={styles.navLink}
                >
                  Lar Temporário
                </Link>
              </li>
            </>
          )}

          {/* Links que aparecem para TODOS (logados ou não) */}
          <li>
            <Link
              to={isAuthenticated ? "/doar" : "/cadastro"}
              className={styles.navLink}
            >
              {/* Se for ONG/Admin, mostra "Doação", senão, mostra "Doar" */}
              {isOngOrAdmin ? "Doação" : "Doar"}
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={styles.navLink}
            >
              Denuncie
            </button>
          </li>
          <li>
            <Link
              to={isAuthenticated ? "/registrarAnimal" : "/cadastro"}
              className={styles.navLink}
            >
              Registrar Animal
            </Link>
          </li>
        </ul>

        {/* AQUI ESTÁ A MÁGICA: Renderização Condicional */}
        {isAuthenticated ? (
          // Se estiver LOGADO, mostra o perfil e notificações
          <ul className={styles.perfilUsuario}>
            <li style={{ position: "relative" }}>
              <button
                className={styles.notificacao}
                onClick={toggleNotifications}
              >
                <svg viewBox="0 0 448 512" className={styles.bell}>
                  <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
                </svg>
              </button>
              {isNotificationsOpen && <Notificacoes />}
            </li>
            <li>
              <Link to="/perfil" className={styles.perfilLink}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={35}
                  height={35}
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                  color="black"
                  style={{ cursor: "pointer" }}
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                {/* // ALTERADO AQUI:
                  // Mostra user.nomeOng se for ONG/Admin, senão mostra user.nome
                */}
                <span className={styles.usernameText}>
                  @
                  {isOngOrAdmin
                    ? user?.nomeOng || "ONG"
                    : user?.nome || "Usuário"}
                </span>
              </Link>
            </li>

            <li>
              <button onClick={logout} className={styles.botaoLogout}>
                Sair
              </button>
            </li>
          </ul>
        ) : (
          // Se NÃO estiver logado, mostra os botões de cadastro
          <ul className={styles.botoesCadastro}>
            <Link to={"/cadastroOng"} style={{ textDecoration: "none" }}>
              <button className={styles.cadastroONG}>Cadastre sua ONG</button>
            </Link>
            <Link to={"/cadastro"} style={{ textDecoration: "none" }}>
              <button className={styles.cadastro}>Cadastre-se</button>
            </Link>
            {/* <button onClick={login}>Simular login (dev)</button> */}
          </ul>
        )}
      </div>
    </>
  );
}