import { Link } from "react-router-dom";
import styles from "../config.module.css"; 
import { IoIosArrowForward } from "react-icons/io";
import { FaDog } from "react-icons/fa6";

export default function Historico() {
 

  return (
    <div className={styles.configContainer}>
      <h1 className={styles.titulo}>Histórico</h1>

      <section className={styles.configSection}>
       
        <Link to="/config/historico-animais" className={styles.configItem}>
          <div className={styles.iconCircle}>
            <FaDog />
          </div>
          <span className={styles.itemTexto}>Histórico de animais</span>
          <IoIosArrowForward className={styles.seta} />
        </Link>

      </section>

      
    </div>
  );
}