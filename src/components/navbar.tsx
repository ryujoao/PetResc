// O nome do seu ficheiro pode ser Nav.js ou Nav.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../style/navbar.module.css";
import Denuncie from "./denuncie";
import Notificacoes from "./notificacoes"; 

export default function Nav() {
  // Estado que controla se o modal está visível
  const [showModal, setShowModal] = useState(false);

  // NOVO: Estado que controla se a barra de notificações está visível
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // NOVO: Função para abrir/fechar a barra de notificações
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <>
      <Denuncie isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className={`${styles.topBar} topBar`}></div>

      <div className={`${styles.navbar} navbar`}>
        <div className={styles.navLogo}>
          <Link to="/home">
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

        <ul className={styles.navCategorias}>
          <li>
            <a href="/adotar" className={styles.navLink}>
              Adotar
            </a>
          </li>
          <li>
            <a href="/larTemporario" className={styles.navLink}>
              Lar Temporário
            </a>
          </li>
          <li>
            <a href="/doar" className={styles.navLink}>
              Doar
            </a>
          </li>

          {/* Botão que abre o modal de denúncia */}
          <li>
            <button
              onClick={() => setShowModal(true)}
              className={styles.navLink}
            >
              Denuncie
            </button>
          </li>

          <li>
            <a href="/registrarAnimal" className={styles.navLink}>
              Registrar Animal
            </a>
          </li>
        </ul>

        <ul className={styles.perfilUsuario}>
          {/* ALTERADO: Este <li> agora é o container relativo */}
          <li style={{ position: 'relative' }}>
            <button className={styles.button} onClick={toggleNotifications}>
              <svg viewBox="0 0 448 512" className={styles.bell}>
                <path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path>
              </svg>
            </button>
            
            {/* ALTERADO: A barra agora é renderizada AQUI DENTRO */}
            {isNotificationsOpen && <Notificacoes />}
          </li>

          <li>
            <Link to="/perfil">
              {/* ... seu svg de perfil ... */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
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
            </Link>
          </li>
          <li>
            <span>@username</span>
          </li>
        </ul>
      </div>
    </>
  );
}