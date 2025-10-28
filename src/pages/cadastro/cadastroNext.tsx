import React, { useState } from 'react';
import styles from "./cadastro.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../services/api';
import { AxiosError } from 'axios';

export default function CadastroNext() {
  const navigate = useNavigate();
  const location = useLocation();

  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    const { tipo, dados: dadosDaPagina1 } = location.state || {};
    if (!dadosDaPagina1) {
      setError("Ocorreu um erro. Por favor, volte para o início do cadastro.");
      return;
    }
    
    setIsLoading(true);

    if (tipo === 'usuario') {
      
      const dadosCompletos = {
        nome: dadosDaPagina1.nome,
        email: dadosDaPagina1.email,
        cpf: dadosDaPagina1.cpf,
        telefone,
        password: senha,
      };

      try {
        await api.post('/auth/register', dadosCompletos);
        alert("Cadastro realizado com sucesso! Você será redirecionado para a página de login.");
        navigate('/login');

      } catch (apiError) {
        if (apiError instanceof AxiosError && apiError.response) {
          setError(apiError.response.data.error || "Não foi possível realizar o cadastro.");
        } else {
          setError("Erro de conexão. Verifique se o servidor está rodando.");
        }
      } finally {
        setIsLoading(false); 
      }

    } else if (tipo === 'ong') {
      
      const dadosCombinados = {
        ...dadosDaPagina1, 
        telefone,
        password: senha,
      };

      navigate('/cadastroFinal', { state: dadosCombinados });
      
    } else {
      setError("Tipo de cadastro desconhecido.");
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms2}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        {/* Seu JSX (que já estava ótimo) continua aqui... */}
        <form className={styles.form} onSubmit={handleRegistrar}>
          <h1 className={styles.titulo}>Últimos Passos</h1>
          <p className={styles.subTitulo}>
            Complete seus dados para finalizar
          </p>
          
          <div>
            <label className={styles.grupoInput}>Telefone</label>
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="(+55) 00 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.grupoInput}>Senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.grupoInput}>Confirme sua senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}

          <button type="submit" className={styles.botaoProx} disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
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