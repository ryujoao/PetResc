import React, { useState } from 'react';
import styles from "../cadastro/cadastro.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from '../../services/api';

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth } from '../../auth/AuthContext';

export default function Login() {

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

   const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password ) {
      setError('Por favor, preencha todos os campos obrigatórios (email e senha).');
      return;
    }

    try {
      await api.post('/usuarios/register', {
        email,
        password,
      });

      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      login();
      navigate('/login'); 
    } catch (err: any) {
      console.error("Erro no cadastro:", err); 

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } 
      else if (err.response) {
        setError(`Erro ${err.response.status}: O servidor respondeu, mas não foi possível processar a resposta.`);
      }
      else {
        setError('Ocorreu um erro de rede. O servidor está offline?');
      }
    }
  };

  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form}  onSubmit={handleLogin}>
          <h1 className={styles.titulo}>Bem-vindo de volta</h1>
          <p className={styles.subTitulo}>
            Faça login para continuar
          </p>

          <div className={styles.botoesRedes}>
            <button type="button" className={styles.botaoRede}>
              <img className={styles.google} src="../../../public/icones/google.png" alt="Google" />
              Entre com o Google
            </button>

            <button type="button" className={styles.botaoRede}>
              <img className={styles.apple} src="../../../public/icones/apple.png" alt="Apple" />
              Entre com a Apple
            </button>
          </div>

          <div className={styles.divisoria}>
            <div className={styles.linhaEsquerda}></div>
            <span className={styles.texto}>ou</span>
            <div className={styles.linhaDireita}></div>
          </div>
        
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
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <label className={styles.grupoInput}>Senha</label>
 
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          
           <button type="submit" onClick={login} className={styles.botaoProx}>
            Entrar
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