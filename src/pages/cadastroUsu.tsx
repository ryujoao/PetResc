import styles from "../style/cadastroUsu.module.css";
import * as Icon from "react-bootstrap-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

export default function CadastroUsu() {
  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms}>
        <div className={styles.logoHeader}>
          <a href="/">PetCo</a>
        </div>

        <form className={styles.form}>
          <h1 className={styles.titulo}>Cadastre-se</h1>
          <p className={styles.subTitulo}>
            Crie sua conta e ajude a transformar vidas
          </p>

          <div className={styles.botoesRedes}>
            <button type="button" className={styles.botaoRede}>
              <img className={styles.google} src="google.png" alt="Google" />
              Cadastre-se com o Google
            </button>

            <button type="button" className={styles.botaoRede}>
              <img className={styles.apple} src="apple.png" alt="Apple" />
              Cadastre-se com a Apple
            </button>
          </div>

          <div className={styles.divisoria}>
            <div className={styles.linha}></div>
            <span className={styles.texto}>ou</span>
            <div className={styles.linha}></div>
          </div>

          <label className={styles.grupoInput}>
            <span>Nome completo</span>
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="Digite seu nome"
            />
          </label>

          <label className={styles.grupoInput}>
            <span>CPF</span>
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="000.000.000-00"
            />
          </label>

          <label className={styles.grupoInput}>
            <span>E-mail</span>
            <input
              className={styles.inputLogin}
              type="email"
              placeholder="user@gmail.com"
            />
          </label>

          <Link  to={"/home"} style={{ textDecoration: 'none' }}>
            <button type="submit" className={styles.botaoProx}>Cadastrar</button>
          </Link>
          <p className={styles.loginLink}>
            Já tem conta? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div className={styles.bannerSessao}></div>
    </div>
  );
}
