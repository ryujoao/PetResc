import React, { useState } from "react";
import styles from "./cadastro.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import { AxiosError } from "axios";

export default function CadastroNext() {
  const navigate = useNavigate();
  const location = useLocation();

  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    const { tipo, dados: dadosDaPagina1 } = location.state || {};
    if (!dadosDaPagina1) {
      setError("Ocorreu um erro. Por favor, volte para o início do cadastro.");
      return;
    }

    setIsLoading(true);

    const nomeDoUsuario = dadosDaPagina1.nome || dadosDaPagina1.name;

    if (!nomeDoUsuario) {
      setError("Erro: O nome não foi encontrado. Por favor, volte ao início.");
      setIsLoading(false);
      return;
    }

    if (tipo === "usuario") {
      const dadosCompletos = {
        nome: nomeDoUsuario,
        email: dadosDaPagina1.email,
        cpf: dadosDaPagina1.cpf,
        telefone,
        password: senha,
        role: "PUBLICO",
      };

      try {
        await api.post("/auth/register", dadosCompletos);
        alert("Cadastro realizado com sucesso! Você será redirecionado para a página de login.");
        navigate("/login");
      } catch (apiError) {
        if (apiError instanceof AxiosError && apiError.response) {
          console.error("Erro completo:", apiError.response.data);
          setError(apiError.response.data.error || "Não foi possível realizar o cadastro.");
        } else {
          setError("Erro de conexão. Verifique se o servidor está rodando.");
        }
      } finally {
        setIsLoading(false);
      }
    } else if (tipo === "ong") {
      const dadosCombinados = {
        ...dadosDaPagina1,
        nome: nomeDoUsuario,
        telefone,
        password: senha,
        role: "ONG",
      };

      delete dadosCombinados.name;
      navigate("/cadastroFinal", { state: dadosCombinados });
    } else {
      setError("Tipo de cadastro desconhecido.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form} onSubmit={handleRegistrar}>
          <h1 className={styles.titulo}>
            {location.state?.tipo === "ong" ? "Cadastro da ONG" : "Complete seu cadastro"}
          </h1>

          <div>
            <label className={styles.grupoInput}>Telefone</label>
            <input
              className={styles.inputLogin}
              type="tel"
              placeholder="(11) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.grupoInput}>Senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.grupoInput}>Confirmar senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Digite sua senha novamente"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
              {error}
            </p>
          )}

          <button type="submit" className={styles.botaoProx} disabled={isLoading}>
            {isLoading ? "Carregando..." : "Próximo"}
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