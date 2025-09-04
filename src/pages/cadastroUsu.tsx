import styles from "../style/cadastroUsu.module.css";

export default function CadastroUsu() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>Cadastre-se</h1>
        <p className={styles.subtitle}>
          Crie sua conta e ajude a transformar vidas
        </p>

        <div className={styles.socialButtons}>
          <button type="button" className={`${styles.socialBtn} ${styles.google}`}>
            Cadastre-se com o Google
          </button>
          <button type="button" className={`${styles.socialBtn} ${styles.apple}`}>
            Cadastre-se com a Apple
          </button>
        </div>

        <div className={styles.divider}>
          <span>ou</span>
        </div>

        <label>
          <span>Nome completo</span>
          <input type="text" placeholder="Digite seu nome" />
        </label>

        <label>
          <span>CPF</span>
          <input type="text" placeholder="000.000.000-00" />
        </label>

        <label>
          <span>E-mail</span>
          <input type="email" placeholder="user@gmail.com" />
        </label>

        <button type="submit" className={styles.nextBtn}>Próximo</button>

        <p className={styles.loginLink}>
          Já tem conta? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
