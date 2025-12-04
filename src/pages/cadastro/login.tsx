import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import api from '../../services/api'; 
import styles from "./cadastro.module.css";




export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);

    } catch (error: any) {
      console.error("Login error:", error);
      setError(error?.message || "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.titulo}>Login</h1>

          <div>
            <label className={styles.grupoInput}>E-mail</label>
            <input
              className={styles.inputLogin}
              type="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.grupoInput}>Senha</label>
            <input
            className={`${styles.inputLogin} ${styles.inputLoginSenha}`}
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles.esqueciSenhaContainer}>
              <a href="/recuperar-senha" className={styles.esqueciSenhaLink}>
                Esqueci minha senha
              </a>
            </div>
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
              {error}
            </p>
          )}

          <button 
            type="submit" 
            className={styles.botaoProx}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>

          <p className={styles.loginLink}>
            Não tem conta? <a href="/cadastro">Cadastre-se</a>
          </p>
        </form>
      </div>
      <div className={styles.bannerLogin}></div>
    </div>
  );
}