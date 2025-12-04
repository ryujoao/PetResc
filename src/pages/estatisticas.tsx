import styles from "../style/estatisticas.module.css";
export default function Estatisticas() {
  return (
    <>
      <div className={styles.containerPrincipal}>
            <div className={styles.card}>
                <h1>63</h1>
                <p>Animais adotados</p>
            </div>
            <div className={styles.card}>
                <h1>12</h1>
                <p>ONGs cadastradas</p>
            </div>
            <div className={styles.card}>
                <h1>89</h1>
                <p>Animais registrados</p>
            </div>
            <div className={styles.card}>
                <h1>152</h1>
                <p>Animais felizes</p>
            </div>
        </div>
    </>
  );
}
