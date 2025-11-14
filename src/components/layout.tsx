import Nav from "./navbar";     
import Footer from "./footer"; 
import styles from "../style/layout.module.css";

interface LayoutProps {
  children: React.ReactNode; // conteúdo da página
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Nav />
      
      /* espaçamento correto */
      <main className={styles.mainContent}>
        {children}
      </main>

      <Footer />
    </div>
  );
}