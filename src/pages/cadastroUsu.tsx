import React, { useState } from 'react';
import styles from "../style/cadastroUsu.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api';

import * as Icon from "react-bootstrap-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function CadastroUsu() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    setError('');

    if (!name || !email || !password) {
      setError('Por favor, preencha nome, email e senha.');
      return;
    }

    try {
      await api.post('/usuarios/register', {
        name,
        email,
        password
      });

      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      navigate('/login'); // Redireciona para a página de login após o sucesso

    } catch (err: any) {
      // Captura os erros 
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
      console.error("Erro no cadastro:", err);
    }
  };
  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms}>
        <div className={styles.logoHeader}>
          <a href="/">PetCo</a>
        </div>

        <form className={styles.form}  onSubmit={handleRegister}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </label>

          <label className={styles.grupoInput}>
            <span>Senha</span>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

           <button type="submit" className={styles.botaoProx}>
            Cadastrar
          </button>

          <p className={styles.loginLink}>
            Já tem conta? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div className={styles.bannerSessao}></div>
    </div>
  );
}
