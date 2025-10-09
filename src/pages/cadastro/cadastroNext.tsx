import React, { useState } from 'react';
import styles from "./cadastroUsu.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../services/api';

export default function CadastroNext() {
  const navigate = useNavigate();
  const location = useLocation();
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Validação dos campos desta página
    if (!telefone || !senha || !confirmarSenha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // --- NOVA VALIDAÇÃO DE SENHA ---
    // Verifique se a senha tem pelo menos 8 caracteres (ajuste este número se a sua API exigir mais)
    if (senha.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    // NOTA: Você pode adicionar outras regras aqui, como verificar se tem números, letras maiúsculas, etc.
    
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    // 2. Recuperar os dados da página anterior
    const dadosPrimeiraPagina = location.state?.dados;
    if (!dadosPrimeiraPagina) {
      setError("Ocorreu um erro. Por favor, inicie o cadastro novamente.");
      console.error("Dados da primeira etapa do cadastro não encontrados no location.state");
      return;
    }

    try {
      // 3. Juntar os dados e enviar para a API
      const dadosCompletos = {
        ...dadosPrimeiraPagina,
        telefone,
        password: senha, 
      };
      
      await api.post('/usuarios/register', dadosCompletos);

      alert('Cadastro realizado com sucesso!');

      // 4. Lógica de Navegação Condicional
      const tipoDeCadastro = location.state?.tipo;

      if (tipoDeCadastro === 'ong') {
        // Envia os dados completos para a próxima etapa também
        navigate('/cadastroFinal', { state: { dados: dadosCompletos } });
      } else {
        navigate('/home');
      }

    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      // Esta parte já está ótima para mostrar o erro exato que vem da API
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Ocorreu um erro ao processar seu cadastro. Tente novamente.');
      }
    }
  };

  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms2}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
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
              placeholder="Mínimo 8 caracteres" // Dica para o utilizador
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
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <button type="submit" className={styles.botaoProx}>
            Próximo
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