import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cadastro.module.css"; // Reutilizando o CSS de cadastro
import api from "../../services/api";

export default function RecuperarSenha() {
  const navigate = useNavigate();

  // Controle de Etapas: 1=Email, 2=Código, 3=Nova Senha, 4=Sucesso
  const [etapa, setEtapa] = useState(1);

  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState(["", "", "", ""]); // Array para 4 dígitos
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Referências para focar nos inputs de código
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // --- ETAPA 1: ENVIAR EMAIL ---
  const handleEnviarEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });

      console.log("Enviando código para:", email);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEtapa(2); 
    } catch (err) {
      setError("E-mail não encontrado ou erro no servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- ETAPA 2: VALIDAR CÓDIGO ---
  const handleCodigoChange = (index: number, value: string) => {
    // Aceita apenas números
    if (!/^\d*$/.test(value)) return;

    const novoCodigo = [...codigo];
    novoCodigo[index] = value;
    setCodigo(novoCodigo);

    // Foca no próximo input se digitou algo
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Permite apagar e voltar o foco (Backspace)
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerificarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const codigoCompleto = codigo.join("");

    if (codigoCompleto.length < 4) {
      setError("Digite o código completo de 4 dígitos.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/verify-code", { email, code: codigoCompleto });
      console.log("Verificando código:", codigoCompleto);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEtapa(3); // Vai para nova senha
    } catch (err) {
      setError("Código inválido ou expirado.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- ETAPA 3: REDEFINIR SENHA ---
  const handleRedefinirSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);
    try {
        await api.post("/auth/reset-password", { 
         email, 
         code: codigo.join(""), 
          newPassword: novaSenha 
         });  




      console.log("Alterando senha...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEtapa(4); // Sucesso!
    } catch (err) {
      setError("Erro ao redefinir senha.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDERIZAÇÃO ---
  return (
    <div className={styles.pagCadastro}>
      {/* Lado Esquerdo (Formulário) */}
      <div className={styles.containerForms}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        {/* --- ETAPA 1: DIGITAR E-MAIL --- */}
        {etapa === 1 && (
          <form className={styles.form} onSubmit={handleEnviarEmail}>
            <h1 className={styles.titulo}>Esqueceu a senha?</h1>
            <p className={styles.subTitulo}>
              Não se preocupe! Digite seu e-mail e enviaremos um código para
              recuperação.
            </p>

            <label className={styles.grupoInput}>E-mail</label>
            <input
              className={styles.inputLogin}
              type="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className={styles.navButtonBack}
              >
                Voltar
              </button>
              <button
                type="submit"
                className={styles.navButton}
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar Código"}
              </button>
            </div>
          </form>
        )}

        {/* --- ETAPA 2: DIGITAR CÓDIGO (OTP) --- */}
        {etapa === 2 && (
          <form className={styles.form} onSubmit={handleVerificarCodigo}>
            <h1 className={styles.titulo}>Código de Verificação</h1>
            <p className={styles.instrucaoTexto}>
              Digite o código de 4 dígitos enviado para <br />
              <strong>{email}</strong>
            </p>

            <div className={styles.otpContainer}>
              {codigo.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className={styles.otpInput}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodigoChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

            <button
              type="submit"
              className={styles.botaoProx}
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Verificar Código"}
            </button>

            <button
              type="button"
              className={styles.reenviarLink}
              onClick={() => alert("Reenviando código...")} // Adicione lógica real aqui
            >
              Reenviar código
            </button>

            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setEtapa(1);
                }}
                className={styles.esqueciSenhaLink}
              >
                Trocar e-mail
              </a>
            </div>
          </form>
        )}

        {/* --- ETAPA 3: NOVA SENHA --- */}
        {etapa === 3 && (
          <form className={styles.form} onSubmit={handleRedefinirSenha}>
            <h1 className={styles.titulo}>Criar Nova Senha</h1>
            <p className={styles.subTitulo}>
              Sua nova senha deve ser diferente da anterior.
            </p>

            <label className={styles.grupoInput}>Nova Senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Digite a nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />

            <label className={styles.grupoInput}>Confirmar Senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              placeholder="Confirme a nova senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

            <button
              type="submit"
              className={styles.botaoProx}
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Redefinir Senha"}
            </button>
          </form>
        )}

        {/* --- ETAPA 4: SUCESSO --- */}
        {etapa === 4 && (
          <div className={styles.form} style={{ textAlign: "center" }}>
            <h1 className={styles.titulo} style={{ color: "#28a745" }}>
              Senha Alterada!
            </h1>
            <p className={styles.subTitulo}>
              Sua senha foi redefinida com sucesso. Agora você pode fazer login
              com sua nova credencial.
            </p>

            <button
              className={styles.botaoProx}
              onClick={() => navigate("/login")}
            >
              Ir para Login
            </button>
          </div>
        )}
      </div>

      {/* Lado Direito (Imagem - Reutilizando a de Login/Cadastro) */}
      <div className={styles.bannerLogin}></div>
    </div>
  );
}
