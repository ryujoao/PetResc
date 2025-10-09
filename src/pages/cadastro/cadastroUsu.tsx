import React, { useEffect, useState } from 'react';
import styles from "./cadastroUsu.module.css";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, type User,  } from 'firebase/auth';
// import { auth } from '../../services/firebaseConfig'; // Importando a instância do auth
import "@fortawesome/fontawesome-free/css/all.min.css";


export default function CadastroUsu() {

  const navigate = useNavigate();

  // Estados para os campos desta página
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // --- Função ÚNICA para ir para o próximo passo ---
  const handleProximoPasso = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !cpf || !email) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const dadosDaPagina1 = { name, cpf, email };

    // Navega para a próxima página enviando o TIPO 'usuario' e os DADOS
    navigate('/cadastroNext', { 
      state: { 
        tipo: 'usuario', 
        dados: dadosDaPagina1 
      } 
    });
  };

  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form} onSubmit={handleProximoPasso}>
          <h1 className={styles.titulo}>Cadastre-se</h1>
          <p className={styles.subTitulo}>
            Crie sua conta e ajude a transformar vidas
          </p>

          <div className={styles.botoesRedes}>
            <button type="button" className={styles.botaoRede}>
              <img className={styles.google} src="/icones/google.png" alt="Google" />
              Cadastre-se com o Google
            </button>
            <button type="button" className={styles.botaoRede}>
              <img className={styles.apple} src="/icones/apple.png" alt="Apple" />
              Cadastre-se com a Apple
            </button>
          </div>

          <div className={styles.divisoria}>
            <div className={styles.linhaEsquerda}></div>
            <span className={styles.texto}>ou</span>
            <div className={styles.linhaDireita}></div>
          </div>

          <div>
            <label className={styles.grupoInput}>Nome completo</label>
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.grupoInput}>CPF</label>
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
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

          {/* O <Link> foi removido. Agora é só um botão que submete o formulário */}
          <button type="submit" className={styles.botaoProx}>
            Próximo
          </button>

          <p className={styles.loginLink}>
            Já tem conta? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div className={styles.bannerCadastro}></div>
    </div>
  );
}