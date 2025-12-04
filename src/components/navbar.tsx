import { useState } from "react";
import { Link } from "react-router-dom"; 
import styles from "../style/navbar.module.css"; 
import Denuncie from "./denuncie"; 
import { useAuth } from "../auth/AuthContext"; 
import { BsPersonCircle } from "react-icons/bs";

export default function Nav() {
  const { isAuthenticated, user } = useAuth(); 
  const [showModal, setShowModal] = useState(false);

  // --- MODO DE TESTE PARA VOCÊ VER A NAV DE ADMIN ---
  // Mude para FALSE quando tiver o login real funcionando
  const MODO_TESTE_ADMIN = false; 

  // --- LÓGICA DE ROLES ---
  const isAdmin = MODO_TESTE_ADMIN || (isAuthenticated && user && user.role === "ADMIN");
  const isOng = !MODO_TESTE_ADMIN && (isAuthenticated && user && user.role === "ONG");
  const isUser = !isOng && !isAdmin;

  
  const displayName = user?.nome || (isAdmin ? "Administrador" : isOng ? "ONG" : "Visitante");

  return (
    <>
      <Denuncie isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className={`${styles.topBar} topBar`}></div>
      <div className={`${styles.navbar} navbar`}>
        <div className={styles.navLogo}>
          <Link to="/">
            <img src="/logo4.png" alt="Logo" className={styles.logoImg} />
          </Link>
        </div>

        <ul className={styles.navCategorias}>
          
          {/* MENU ADMIN */}
          {isAdmin && (
            <>
              <li><Link to="/admin/" className={styles.navLink}>Dashboard</Link></li>
              <li><Link to="/admin/gerenciamento" className={styles.navLink}>Gerenciamento</Link></li>
              <li><Link to="/admin/historico-pets" className={styles.navLink}>Histórico de Cadastro</Link></li>
            </>
          )}

          {/* MENU ONG */}
          {isOng && (
            <>
              <li><Link to="/doar" className={styles.navLink}>Doação</Link></li>
              <li><Link to="/central-adocao" className={styles.navLink}>Central de Adoção</Link></li>
              <li><button onClick={() => setShowModal(true)} className={styles.navLink}>Denuncie</button></li>
              <li><Link to="/registrar-animal" className={styles.navLink}>Registrar Animal</Link></li>
            </>
          )}

          {/* MENU USUÁRIO */}
          {isUser && (
            <>
              <li><Link to={isAuthenticated ? "/adotar" : "/login"} className={styles.navLink}>Adotar</Link></li>
              <li><Link to={isAuthenticated ? "/lar-temporario" : "/login"} className={styles.navLink}>Lar Temporário</Link></li>
              <li><Link to={isAuthenticated ? "/doar" : "/login"} className={styles.navLink}>Doar</Link></li>
              <li><button onClick={() => setShowModal(true)} className={styles.navLink}>Denuncie</button></li>
              <li><Link to={isAuthenticated ? "/registrar-animal" : "/login"} className={styles.navLink}>Registrar Animal</Link></li>
            </>
          )}
        </ul>

        {/* PERFIL / LOGIN (LADO DIREITO)*/}
        {(isAuthenticated || MODO_TESTE_ADMIN) ? (
          <ul className={styles.perfilUsuario}>
            <li>
              <Link to="/perfil" className={styles.perfilLink}>
                <BsPersonCircle className={styles.perfilIcon} />
                <span className={styles.usernameText}>
                  @{displayName}
                </span>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className={styles.botoesCadastro}>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <button className={styles.cadastroONG}>Faça Login</button>
            </Link>
            <Link to={"/cadastro"} style={{ textDecoration: "none" }}>
              <button className={styles.cadastro}>Cadastre-se</button>
            </Link>
          </ul>
        )}
      </div>
    </>
  );
} 