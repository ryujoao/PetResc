import styles from "./meusAnimais.module.css";

export default function MeusAnimais() {
  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerMeusAnimais}>
        <h2 className={styles.titulo}>Meus Animais</h2>

        <div className={styles.card}>
          <div className={styles.imgCard}>
            <img src="/animalSemNome.png" alt="Animal Sem Nome" />
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardNome}>
              <h1>Não possui nome</h1>
              <p className={styles.descricaoCard}>Sem raça definida, AD.</p>
              <p className={styles.descricaoCard}>(SRD)</p>
            </div>
          </div>

          <div className={styles.statusSuperior}>Animal cadastrado</div>
          <div className={styles.statusInferior}>Status: Em tratamento</div>
        </div>

        <div className={styles.card}>
          <div className={styles.imgCard}>
            <img src="/amendoim.png" alt="Amendoim" />
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardNome}>
              <h1>Amendoim</h1>
            </div>

            <p className={styles.descricaoCard}>Sem raça definida, FI.</p>
            <p className={styles.descricaoCard}>(SRD)</p>

            <div className={styles.statusSuperior}>Lar temporário</div>
            <div className={styles.statusInferior}>Status: Disponível</div>
          </div>
        </div>
      </div>

      <div className={styles.adocaoProcesso}>
        <h2 className={styles.titulo}>Adoção em Processo</h2>

        <div className={styles.card}>
          <div className={styles.imgCard}>
            <img src="/estrela.png" alt="Estrela" />
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardNome}>
              <h1>Estrela</h1>
            </div>

            <p className={styles.descricaoCard}>Sem raça definida, AD.</p>
            <p className={styles.descricaoCard}>(SRD)</p>

            <div className={styles.statusInferior}>
              Status: Dicumentação em Análise
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
