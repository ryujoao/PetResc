import React, { useState } from 'react';
import styles from "./cadastroUsu.module.css"; // Mantive o seu import de estilo
import { useNavigate, useLocation } from "react-router-dom";
import api from '../../services/api';

export default function CadastroNext() {
  const navigate = useNavigate();
  const location = useLocation();
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  // --- Lógica Unificada de Submissão ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Validação dos campos desta página
    if (!telefone || !senha || !confirmarSenha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    // 2. Recuperar os dados da página anterior (enviados via state)
    const dadosPrimeiraPagina = location.state?.dados;
    if (!dadosPrimeiraPagina) {
        // Medida de segurança: se o utilizador chegar aqui sem passar pela primeira página
        setError("Ocorreu um erro. Por favor, inicie o cadastro novamente.");
        console.error("Dados da primeira etapa do cadastro não encontrados no location.state");
        return;
    }

    try {
      // 3. Juntar os dados de ambas as páginas e enviar para a API
      const dadosCompletos = {
        ...dadosPrimeiraPagina, // Ex: { name, email, cpf }
        telefone,
        password: senha, // Envia para a API o campo 'password' com o valor do estado 'senha'
      };
      
      // NOTA: Ajuste o endpoint '/usuarios/register' se o da ONG for diferente
      await api.post('/usuarios/register', dadosCompletos);

      alert('Cadastro realizado com sucesso!');

      // 4. Lógica de Navegação Condicional (A MÁGICA ACONTECE AQUI)
      const tipoDeCadastro = location.state?.tipo;

      if (tipoDeCadastro === 'ong') {
        // Se for uma ONG, vai para a 3ª etapa
        // Sugestão de nome para a nova página: /cadastro-ong-final
        navigate('/cadastro-ong-final');
      } else {
        // Se for um utilizador comum, vai para a home (ou login)
        navigate('/home');
      }

    } catch (err: any) {
      console.error("Erro no cadastro:", err);
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

        {/* O formulário agora chama a função 'handleSubmit' unificada */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.titulo}>Últimos Passos</h1>
          <p className={styles.subTitulo}>
            Complete seus dados para finalizar
          </p>

          {/* --- Campos Corrigidos --- */}
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
              type="password" // Tipo corrigido para esconder a senha
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.grupoInput}>Confirme sua senha</label>
            <input
              className={styles.inputLogin}
              type="password" // Tipo corrigido para esconder a senha
              placeholder="Confirme sua senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          {/* REMOVIDO o <Link> daqui. O botão agora apenas submete o formulário */}
          <button type="submit" className={styles.botaoProx}>
            Finalizar Cadastro
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
