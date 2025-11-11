import { Link } from "react-router-dom";
import styles from "./conta.module.css"; 
import { useEffect, useState } from "react";

// Você pode reusar esta interface
interface UserData {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  role: string;
}

export default function Conta() {
  // 1. MANTER: Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // 2. MANTER E AJUSTAR: Busca os dados para preencher o formulário
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("@AuthData:token");
      if (!token) {
        console.error("Usuário não autenticado");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do usuário");
        }
        const data: UserData = await response.json();
        
        // --- AJUSTE IMPORTANTE ---
        // Preenche os estados do formulário, em vez de um 'usuario' separado
        setNome(data.nome || "");
        setEmail(data.email || "");
        setTelefone(data.telefone || "");
        // --- FIM DO AJUSTE ---

      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []); // Roda só uma vez

  // 3. MANTER: A lógica de salvar (que você precisa adicionar)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada de API (PUT ou PATCH) para salvar
    console.log("Salvando dados:", { nome, email, telefone });
    alert("Dados salvos (simulação)");
  };



  return (

    <div className={styles.formContainer}>

        
      
      {/* 1. Cabeçalho com "Voltar" e Título */}
      <div className={styles.formHeader}>
        <Link to="/config" className={styles.backButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </Link>
        <h1 className={styles.title}>Conta</h1>
      </div>

      {/* 2. Formulário */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        {/* 3. Botão de Salvar */}
        <button type="submit" className={styles.saveButton}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}