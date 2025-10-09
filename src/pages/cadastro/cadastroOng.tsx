import styles from "./cadastroUsu.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

export default function CadastroOng() {
  const navigate = useNavigate();

  const [nomeResponsavel, setNomeResponsavel] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeOng, setNomeOng] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleProximoPasso = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nomeResponsavel || !cpf || !nomeOng || !cnpj || !email) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // --- AQUI ESTÁ A CORREÇÃO ---
    // Mapeamos 'nomeResponsavel' para o campo 'name' que a API espera.
    const dadosDaPagina1 = {
      name: nomeResponsavel, // A API vai receber { name: "valor do nome do responsável" }
      cpf,
      nomeOng,
      cnpj,
      email,
    };

    navigate('/cadastroNext', { 
      state: { 
        tipo: 'ong', 
        dados: dadosDaPagina1 
      } 
    });
  };

  return (
    <>
      <div className={styles.pagCadastro}>
        <div className={styles.containerForms}>
          <div className={styles.logoHeader}>
            <a href="/">PetResc</a>
          </div>

          <form className={styles.form} onSubmit={handleProximoPasso}>
            <h1 className={styles.titulo}>Cadastre sua ONG</h1>
            <p className={styles.subTitulo}>
              Junte-se a nós e ajude a transformar ainda mais vidas.
            </p>
            
            <div>
              <label className={styles.grupoInput}>Nome do responsável</label>
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="Digite seu nome completo"
                value={nomeResponsavel}
                onChange={(e) => setNomeResponsavel(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.grupoInput}>CPF do responsável</label>
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.grupoInput}>Nome da sua ONG</label>
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="Digite o nome de sua ONG"
                value={nomeOng}
                onChange={(e) => setNomeOng(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.grupoInput}>CNPJ</label>
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="XX.XXX.XXX/0001-XX"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.grupoInput}>E-mail de contato</label>
              <input
                className={styles.inputLogin}
                type="email"
                placeholder="contato@suaong.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

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
    </>
  );
}