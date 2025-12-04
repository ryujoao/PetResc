import React, { useState, useRef } from "react";
import styles from "../conta/conta.module.css"; 
import { useAuth } from "../../../auth/AuthContext";

export default function Endereco() {
  const { user, setUser } = useAuth();
  
  // Inicializa os estados com os dados do usuário ou string vazia
  const [cep, setCep] = useState(user?.cep || "");
  const [rua, setRua] = useState(user?.rua || "");
  const [numero, setNumero] = useState(user?.numero || "");
  const [complemento, setComplemento] = useState(user?.complemento || "");
  const [bairro, setBairro] = useState(user?.bairro || "");
  const [cidade, setCidade] = useState(user?.cidade || "");
  const [estado, setEstado] = useState(user?.estado || "");
  const [loading, setLoading] = useState(false);

  // Referência para focar no campo "Número" automaticamente
  const numeroRef = useRef<HTMLInputElement>(null);

  const buscarCep = async (e: React.FocusEvent<HTMLInputElement>) => {
    const valorCep = e.target.value.replace(/\D/g, ''); 

    if (valorCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${valorCep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setRua(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setEstado(data.uf);
          // Joga o cursor para o campo número automaticamente
          numeroRef.current?.focus();
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        alert("Erro de conexão ao buscar CEP.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('@AuthData:token'); 

    if (!user?.id) {
      alert("Usuário não encontrado.");
      setLoading(false);
      return;
    }

    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      setLoading(false);
      return;
    }

    const enderecoData = { cep, rua, numero, complemento, bairro, cidade, estado };

    try {
      // Ajuste a URL conforme sua API
      const response = await fetch(`https://petresc.onrender.com/api/usuarios/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(enderecoData) 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro na atualização');
      }

      // Atualiza o contexto global do usuário com os novos dados
      setUser({
        ...user,
        ...enderecoData
      });

      alert("Endereço atualizado com sucesso!");

    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao atualizar endereço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.titulo}>Endereço</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        
        <div className={styles.inputGroup}>
          <label htmlFor="cep">CEP</label>
          <input 
            id="cep" 
            type="text" 
            maxLength={8} 
            value={cep} 
            onChange={(e) => setCep(e.target.value)}
            onBlur={buscarCep} 
            placeholder="00000000"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="rua">Rua</label>
          <input 
            id="rua" 
            type="text" 
            value={rua} 
            onChange={(e) => setRua(e.target.value)} 
          />
        </div>
        
        <div className={styles.formRow}>
          <div className={`${styles.inputGroup} ${styles.rowItem}`}>
            <label htmlFor="numero">Número</label>
            <input 
              id="numero" 
              type="text" 
              ref={numeroRef} // <--- ADICIONADO AQUI: Conecta a referência
              value={numero} 
              onChange={(e) => setNumero(e.target.value)} 
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.rowItem}`}>
            <label htmlFor="complemento">Complemento (Opcional)</label>
            <input 
              id="complemento" 
              type="text" 
              value={complemento} 
              onChange={(e) => setComplemento(e.target.value)} 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="bairro">Bairro</label>
          <input 
            id="bairro" 
            type="text" 
            value={bairro} 
            onChange={(e) => setBairro(e.target.value)} 
          />
        </div>

        <div className={styles.formRow}>
          <div className={`${styles.inputGroup} ${styles.rowItem}`}>
            <label htmlFor="cidade">Cidade</label>
            <input 
              id="cidade" 
              type="text" 
              value={cidade} 
              onChange={(e) => setCidade(e.target.value)} 
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.rowItem}`}>
            <label htmlFor="estado">Estado (UF)</label>
            <input 
              id="estado" 
              type="text" 
              maxLength={2} 
              value={estado} 
              onChange={(e) => setEstado(e.target.value)} 
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.botaoSalvar} disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}