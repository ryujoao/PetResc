import React, { useState } from 'react';
import styles from "../cadastro/cadastro.module.css"; 
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from '../../auth/AuthContext';

export default function Login() {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha email e senha.');
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);

      navigate('/'); 

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
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

        <form className={styles.form} onSubmit={handleLogin}>
          <h1 className={styles.titulo}>Bem-vindo de volta</h1>
          <p className={styles.subTitulo}>Faça login para continuar</p>

          {/* ... seus botões de redes sociais ... */}

          <div>
            <label className={styles.grupoInput}>E-mail</label>
            <input
              className={styles.inputLogin}
              type="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className={styles.grupoInput}>Senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Insira sua senha"
              value={password}// Corrigido
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
          
          {/* O botão é do tipo submit e não tem onClick*/}
          <button type="submit" className={styles.botaoProx} disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
          
          <p className={styles.loginLink}>
            Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
          </p>
        </form>
      </div>
      <div className={styles.bannerLogin}></div>
    </div>
  );
}