import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cadastro.module.css";
import api from "../../services/api";
import Modal from "../../components/modal";
import PasswordInput from "../../components/passwordInput";

export default function RecuperarSenha() {
	const navigate = useNavigate();

	const [etapa, setEtapa] = useState(1);

	const [email, setEmail] = useState("");
	const [codigo, setCodigo] = useState(["", "", "", ""]);
	const [novaSenha, setNovaSenha] = useState("");
	const [confirmarSenha, setConfirmarSenha] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalInfo, setModalInfo] = useState({ title: "", msg: "", type: "success" as "success" | "error" });

	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const handleEnviarEmail = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await api.post("/auth/forgot-password", { email });
			setEtapa(2);
		} catch (err) {
			setModalInfo({ title: "Erro", msg: "E-mail não encontrado.", type: "error" });
			setModalOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCodigoChange = (index: number, value: string) => {
		if (!/^\d*$/.test(value)) return;
		const novoCodigo = [...codigo];
		novoCodigo[index] = value;
		setCodigo(novoCodigo);

		if (value && index < 3) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !codigo[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleVerificarCodigo = async (e: React.FormEvent) => {
		e.preventDefault();
		const codigoCompleto = codigo.join("");

		if (codigoCompleto.length < 4) {
			setModalInfo({ title: "Atenção", msg: "Digite o código completo.", type: "error" });
			setModalOpen(true);
			return;
		}

		setIsLoading(true);
		try {
			await api.post("/auth/verify-code", { email, code: codigoCompleto });
			setEtapa(3);
		} catch (err) {
			setModalInfo({ title: "Erro", msg: "Código inválido.", type: "error" });
			setModalOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleRedefinirSenha = async (e: React.FormEvent) => {
		e.preventDefault();

		if (novaSenha !== confirmarSenha) {
			setModalInfo({ title: "Erro", msg: "As senhas não coincidem.", type: "error" });
			setModalOpen(true);
			return;
		}

		setIsLoading(true);
		try {
			await api.post("/auth/reset-password", {
				email,
				code: codigo.join(""),
				newPassword: novaSenha
			});

			setModalInfo({ title: "Sucesso!", msg: "Senha alterada com sucesso! Faça login.", type: "success" });
			setModalOpen(true);

		} catch (err) {
			setModalInfo({ title: "Erro", msg: "Erro ao redefinir senha.", type: "error" });
			setModalOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		if (modalInfo.title === "Sucesso!") {
			navigate("/login");
		}
	};

	return (
		<div className={styles.pagCadastro}>
			<Modal
				isOpen={modalOpen}
				title={modalInfo.title}
				message={modalInfo.msg}
				type={modalInfo.type}
				onClose={handleCloseModal}
			/>

			<div className={styles.containerForms}>
				<div className={styles.logoHeader}>
					<a href="/">PetResc</a>
				</div>

				{/* ETAPA 1 */}
				{etapa === 1 && (
					<form className={styles.form} onSubmit={handleEnviarEmail}>
						<h1 className={styles.titulo}>Esqueceu a senha?</h1>
						<p className={styles.subTitulo}>Digite seu e-mail para recuperar.</p>
						<label className={styles.grupoInput}>E-mail</label>
						<input className={styles.inputLogin} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						<div className={styles.buttonGroup}>
							<button type="button" onClick={() => navigate("/login")} className={styles.navButtonBack}>Voltar</button>
							<button type="submit" className={styles.navButton} disabled={isLoading}>{isLoading ? "Enviando..." : "Enviar Código"}</button>
						</div>
					</form>
				)}

				{/* ETAPA 2 */}
				{etapa === 2 && (
					<form className={styles.form} onSubmit={handleVerificarCodigo}>
						<h1 className={styles.titulo}>Código de Verificação</h1>
						<p className={styles.instrucaoTexto}>Enviado para <strong>{email}</strong></p>
						<div className={styles.otpContainer}>
							{codigo.map((digit, index) => (
								<input
									key={index}
									ref={(el) => { inputRefs.current[index] = el }}
									className={styles.otpInput}
									type="text"
									maxLength={1}
									value={digit}
									onChange={(e) => handleCodigoChange(index, e.target.value)}
									onKeyDown={(e) => handleKeyDown(index, e)}
								/>
							))}
						</div>
						<button type="submit" className={styles.botaoProx} disabled={isLoading}>{isLoading ? "Verificando..." : "Verificar Código"}</button>
					</form>
				)}

				{/* ETAPA 3 */}
				{etapa === 3 && (
					<form className={styles.form} onSubmit={handleRedefinirSenha}>
						<h1 className={styles.titulo}>Criar Nova Senha</h1>
						<label className={styles.grupoInput}>Nova Senha</label>
						<PasswordInput 
                            name="novaSenha" 
                            value={novaSenha} 
                            onChange={(e) => setNovaSenha(e.target.value)} 
                            placeholder="Digite sua nova senha"
                        />
						<label className={styles.grupoInput}>Confirmar Senha</label>
						<PasswordInput 
                            name="confirmarNovaSenha" 
                            value={confirmarSenha} 
                            onChange={(e) => setConfirmarSenha(e.target.value)} 
                            placeholder="Confirme sua nova senha"
                        />
						<button type="submit" className={styles.botaoProx} disabled={isLoading}>{isLoading ? "Salvando..." : "Redefinir Senha"}</button>
					</form>
				)}
			</div>
			<div className={styles.bannerLogin}></div>
		</div>
	);
}