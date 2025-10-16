import styles from "./nossaMissao.module.css";

export default function NossaMissao() {
  return (
    <>
      <div className={styles.containerPrincipal}>
        <div className={styles.containerNossaMissao}>
          <div className={styles.imgAnimais}>
            <img className={styles.cachorro} src="../../../public/banners/cachorroMIssao.png" alt="" />
            <img className={styles.gato} src="../../../public/banners/gatoMissao.png" alt="" />
          </div>
          <div className={styles.tituloNossaMissao}>
            <h2 className={styles.titulo}>Nossa Missão</h2>
            <p>Unir ONGs, protetores independentes e a comunidade em uma única
              plataforma. 
            </p>
            <p>
              Nosso objetivo é otimizar a gestão das organizações,
              dar mais visibilidade aos animais em situação de vulnerabilidade e
              incentivar a participação social, ajudando a reduzir o abandono e
              promovendo a adoção responsável.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
