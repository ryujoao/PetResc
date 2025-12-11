import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import styles from "./cadastro.module.css";
import Modal from "../../components/modal";
import PasswordInput from "../../components/passwordInput";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalMsg, setModalMsg] = useState("");

	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await login(email, password);
		} catch (error: any) {
			console.error("Login error:", error);
			setModalMsg(error?.message || "E-mail ou senha incorretos.");
			setModalOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.pagCadastro}>
			<Modal
				isOpen={modalOpen}
				title="Erro no Login"
				message={modalMsg}
				type="error"
				onClose={() => setModalOpen(false)}
			/>

			<div className={styles.containerForms}>
				<div className={styles.logoHeader}>
					<a href="/">PetResc</a>
				</div>

				<form className={styles.form} onSubmit={handleSubmit}>
					<h1 className={styles.titulo}>Login</h1>

					<div>
						<label className={styles.grupoInput}>E-mail</label>
						<input
							className={styles.inputLogin}
							type="email"
							placeholder="user@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className={styles.grupoInput}>Senha</label>
						<PasswordInput
							name="password" 
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Digite sua senha"
						/>
						<div className={styles.esqueciSenhaContainer}>
							<span
								className={styles.esqueciSenhaLink}
								onClick={() => navigate("/recuperar-senha")}
								style={{ cursor: "pointer" }}
							>
								Esqueci minha senha
							</span>
						</div>
					</div>

					<button
						type="submit"
						className={styles.botaoProx}
						disabled={isLoading}
					>
						{isLoading ? "Entrando..." : "Entrar"}
					</button>

					<p className={styles.loginLink}>
						Não tem conta?{" "}
						<span
							onClick={() => navigate("/cadastro")}
							style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
						>
							Cadastre-se
						</span>
					</p>
				</form>
			</div>
			<div className={styles.bannerLogin}></div>
		</div>
	);
}