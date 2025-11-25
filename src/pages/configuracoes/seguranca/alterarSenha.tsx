import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../conta/conta.module.css"; 
import api from "../../../services/api"; 
import { AxiosError } from "axios";


import { IoIosArrowBack } from "react-icons/io";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function AlterarSenha() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const [form, setForm] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const [showPassword, setShowPassword] = useState({
    senhaAtual: false,
    novaSenha: false,
    confirmarSenha: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShow = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações locais
    if (form.novaSenha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    if (form.novaSenha.length < 6) {
        alert("A nova senha é muito curta (mínimo 6 dígitos)!");
        return;
    }

    setLoading(true);

    try {
      await api.put("/api/auth/me", {
        currentPassword: form.senhaAtual, 
        password: form.novaSenha         
      });

      alert("Senha alterada com sucesso!");
      navigate("/config/seguranca");

    } catch (err) {
      console.error("Erro ao alterar senha:", err);

      if (err instanceof AxiosError && err.response && err.response.data) {
        alert(err.response.data.error || "Erro ao atualizar senha.");
      } else {
        alert("Erro de conexão. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      
     
      <div className={styles.headerRow}>
        <Link to="/config/seguranca" className={styles.btnVoltar}>
          <IoIosArrowBack />
        </Link>
        <h1 className={styles.titulo}>Alterar Senha</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        
        
        <div className={styles.inputGroup}>
          <label htmlFor="senhaAtual">Senha atual</label>
          <div className={styles.inputWrapper}>
            <input
              id="senhaAtual"
              name="senhaAtual"
              type={showPassword.senhaAtual ? "text" : "password"}
              value={form.senhaAtual}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => toggleShow("senhaAtual")}
              className={styles.eyeIcon}
              tabIndex={-1}
            >
              {showPassword.senhaAtual ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
        </div>

        
        <div className={styles.inputGroup}>
          <label htmlFor="novaSenha">Nova senha</label>
          <div className={styles.inputWrapper}>
            <input
              id="novaSenha"
              name="novaSenha"
              type={showPassword.novaSenha ? "text" : "password"}
              value={form.novaSenha}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
            <button
              type="button"
              onClick={() => toggleShow("novaSenha")}
              className={styles.eyeIcon}
              tabIndex={-1}
            >
              {showPassword.novaSenha ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
        </div>

        
        <div className={styles.inputGroup}>
          <label htmlFor="confirmarSenha">Confirmar nova senha</label>
          <div className={styles.inputWrapper}>
            <input
              id="confirmarSenha"
              name="confirmarSenha"
              type={showPassword.confirmarSenha ? "text" : "password"}
              value={form.confirmarSenha}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => toggleShow("confirmarSenha")}
              className={styles.eyeIcon}
              tabIndex={-1}
            >
              {showPassword.confirmarSenha ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.botaoSalvar}>
            Salvar Alterações
          </button>
        </div>

      </form>
    </div>
  );
}