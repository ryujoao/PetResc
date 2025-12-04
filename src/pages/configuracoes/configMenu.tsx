import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./config.module.css"
import { useAuth } from "../../auth/AuthContext";
import Logout from "./ajuda/logout"; 
import Layout from "../../components/layout";
import { BsBellFill, BsChevronRight, BsFillLockFill, BsFillShieldFill, BsHouseFill, BsPersonFill } from "react-icons/bs";

export default function ConfigMenu() {
  const { logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowLogout(false);
  };

  const menuItems = [
    { to: "/config/conta", label: "Conta", icon: <BsPersonFill /> },
    { to: "/config/endereco", label: "Endereço", icon: <BsHouseFill />  },
    { to: "/config/notificacoes", label: "Notificação", icon: <BsBellFill /> },
    { to: "/config/privacidade", label: "Privacidade", icon: <BsFillShieldFill /> },
    { to: "/config/seguranca", label: "Segurança", icon: <BsFillLockFill />},
  ];

  return (
    <>
      <Logout
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleConfirmLogout}
      />

      <Layout>
      <div className={styles.configContainer}>
        <h1 className={styles.titulo}>Configurações</h1>

        <section className={styles.configSection}>
          <h2 className={styles.subtitulo}>Conta</h2>
          
          {menuItems.map((item) => (
            <Link key={item.to} to={item.to} className={styles.configItem}>
              <div className={styles.iconCircle}>
                {item.icon}
              </div>
              <span className={styles.itemTexto}>{item.label}</span>
              <BsChevronRight  className={styles.seta} />
            </Link>
          ))}
        </section>
        
        <section className={styles.configSection}>
          <h2 className={styles.subtitulo}>Ajuda</h2>
          <div className={styles.ajudaLista}>
            <Link to="/config/contate-nos" className={styles.ajudaLink}>
              Contate-nos
            </Link>
            <Link to="/config/faq" className={styles.ajudaLink}>
              FAQ
            </Link>
            
            <button 
              onClick={() => setShowLogout(true)} 
              className={`${styles.ajudaLink} ${styles.botaoLogout}`}
            >
              Sair
            </button>
          </div>
        </section>
      </div>
      </Layout>
    </>
  );
}