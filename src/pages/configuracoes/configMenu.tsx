import { Link } from "react-router-dom";
import Nav from "../../components/navbar"; // Ajuste o caminho se necessário
import Footer from "../../components/footer"; // Ajuste o caminho se necessário
import styles from "../configuracoes/config.module.css"; // Crie este arquivo de CSS
import { useAuth } from "../../auth/AuthContext";



const IconPerson = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
  </svg>  
);
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg>
);
const IconBell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
</svg>
);
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
  <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
</svg>
);
const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg>
);


export default function ConfigMenu() {

   const { logout } = useAuth(); 

  return (
    <>
      <Nav />
      <div className={styles.configContainer}>
        <h1 className={styles.titulo}>Configurações</h1>

        {/* Seção da Conta */}
        <section className={styles.configSection}>
          <h2 className={styles.subtitulo}>Conta</h2>
          <div>
            <Link to="/config/conta" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconPerson />
              </div>
              <span className={styles.itemTexto}>Conta</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
            
            <Link to="/config/endereco" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconHome />
              </div>
              <span className={styles.itemTexto}>Endereço</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
            
            <Link to="/config/notificacao" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconBell />
              </div>
              <span className={styles.itemTexto}>Notificação</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
            
            <Link to="/config/privacidade" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconShield />
              </div>
              <span className={styles.itemTexto}>Privacidade</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
            
            <Link to="/config/seguranca" className={styles.configItem}>
              <div className={styles.iconCircle}>
                <IconLock />
              </div>
              <span className={styles.itemTexto}>Segurança</span>
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className={styles.seta} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </Link>
          </div>
        </section>

        {/* Seção de Ajuda */}
        <section className={styles.configSection}>
          <h2 className={styles.subtitulo}>Ajuda</h2>
          <div className={styles.ajudaLista}>
            <Link to="/contate-nos" className={styles.ajudaLink}>
              Contate-nos
            </Link>
            <Link to="/faq" className={styles.ajudaLink}>
              FAQ
            </Link>
            <li>
                <button onClick={logout} className={styles.botaoLogout}>Sair</button>
            </li>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
    