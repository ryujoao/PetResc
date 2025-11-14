import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../configuracoes/config.module.css";
import { useAuth } from "../../auth/AuthContext";
import Logout from "../configuracoes/logout"; 
import { IconPerson, IconHome, IconBell, IconShield, IconLock, IconArrowRight } from "../../components/icons";
import Layout from "../../components/layout";

export default function ConfigMenu() {
  const { logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowLogout(false);
  };

  // Icones e rotas do menu de configurações
  const menuItems = [
    { to: "/config/conta", label: "Conta", icon: <IconPerson /> },
    { to: "/config/endereco", label: "Endereço", icon: <IconHome /> },
    { to: "/config/notificacao", label: "Notificação", icon: <IconBell /> },
    { to: "/config/privacidade", label: "Privacidade", icon: <IconShield /> },
    { to: "/config/seguranca", label: "Segurança", icon: <IconLock /> },
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
          <div>
            {menuItems.map((item) => (
              <Link key={item.to} to={item.to} className={styles.configItem}>
                <div className={styles.iconCircle}>
                  {item.icon}
                </div>
                <span className={styles.itemTexto}>{item.label}</span>
                <IconArrowRight />
              </Link>
            ))}
          </div>
        </section>

        
        <section className={styles.configSection}>
          <h2 className={styles.subtitulo}>Ajuda</h2>
          <div className={styles.ajudaLista}>
            <Link to="/contate-nos" className={styles.ajudaLink}>
              Contate-nos
            </Link>
            <Link to="/faq" className={styles.ajudaLink}>
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