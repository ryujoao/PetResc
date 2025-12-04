import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cadastro.module.css";
import api from "../../services/api";

export default function Cadastro() {
  const navigate = useNavigate();

  const [etapa, setEtapa] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [dados, setDados] = useState({
    tipo: "ONG",
    nome: "",
    cpf: "",
    nomeOng: "",
    cnpj: "",
    descricao: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const proximaEtapa = (e: React.FormEvent) => {
    e.preventDefault();
    setEtapa(etapa + 1);
  };

  const etapaAnterior = () => {
    setEtapa(etapa - 1);
  };

  const finalizarCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dados.nome || !dados.cpf || !dados.email || !dados.telefone || !dados.senha) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (dados.senha !== dados.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    setIsLoading(true);

    let url = "";
    let payload: any = {};

    if (dados.tipo === "ONG") {
      url = "/auth/register-ong";

      payload = {
        name: dados.nome,
        cpf: dados.cpf,
        nomeOng: dados.nomeOng,
        cnpj: dados.cnpj,
        descricao: dados.descricao,
        email: dados.email,
        telefone: dados.telefone,
        password: dados.senha,
        cep: dados.cep,
        rua: dados.rua,
        numero: dados.numero,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado
      };
    } else if (dados.tipo === "USUARIO") {
      url = "/auth/register";

      payload = {
        nome: dados.nome,
        cpf: dados.cpf,
        email: dados.email,
        telefone: dados.telefone,
        password: dados.senha
      };
    }

    console.log("Tipo de cadastro:", dados.tipo);


    if (!url) {
  alert("Tipo de cadastro inválido.");
  setIsLoading(false);
  return;
}

    try {
      const response = await api.post(url, payload);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const getBannerClass = () => {
    if (etapa === 1) {
      return styles.bannerPadrao; // Mostra imagem padrão na escolha inicial
    }
    // Se passou da etapa 1, verifica o tipo
    if (dados.tipo === "ONG") {
      return styles.bannerOng;
    }
    return styles.bannerUsuario;
  };


  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        {etapa === 1 && (
          <div className={styles.form}>
            <h1 className={styles.tituloEscolha}>
              Como você quer se cadastrar?
            </h1>

            <div className={styles.escolhaContainer}>
              <button
                className={styles.botaoProx}
                onClick={() => {
                  setDados({ ...dados, tipo: "USUARIO" });
                  setEtapa(2);
                }}
              >
                Sou uma Pessoa
              </button>

              <button
                className={styles.botaoProx}
                onClick={() => {
                  setDados({ ...dados, tipo: "ONG" });
                  setEtapa(2);
                }}
              >
                Sou uma ONG
              </button>
            </div>

            <p className={styles.loginLink}>
              Já tem conta? <a href="/login">Login</a>
            </p>
          </div>
        )}

        {etapa === 2 && (
          <form className={styles.form} onSubmit={proximaEtapa}>
            <h1 className={styles.titulo}>Dados Básicos</h1>
            <p className={styles.subTitulo}>Preencha suas informações iniciais</p>

            {dados.tipo === "USUARIO" ? (
              <>
                <label className={styles.grupoInput}>Nome Completo</label>
                <input
                  className={styles.inputLogin}
                  name="nome"
                  value={dados.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  required
                />

                <label className={styles.grupoInput}>CPF</label>
                <input
                  className={styles.inputLogin}
                  name="cpf"
                  value={dados.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                />
              </>
            ) : (
              <>
                <label className={styles.grupoInput}>Nome do Responsável</label>
                <input
                  className={styles.inputLogin}
                  name="nome"
                  value={dados.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome do responsável"
                  required
                />

                <label className={styles.grupoInput}>CPF do Responsável</label>
                <input
                  className={styles.inputLogin}
                  name="cpf"
                  value={dados.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                  required
                />

                <label className={styles.grupoInput}>Nome da ONG</label>
                <input
                  className={styles.inputLogin}
                  name="nomeOng"
                  value={dados.nomeOng}
                  onChange={handleChange}
                  placeholder="Digite o nome da ONG"
                  required
                />

                <label className={styles.grupoInput}>CNPJ</label>
                <input
                  className={styles.inputLogin}
                  name="cnpj"
                  value={dados.cnpj}
                  onChange={handleChange}
                  placeholder="00.000.000/0001-00"
                  required
                />

                <label className={styles.grupoInput}>Descrição</label>
                <textarea
                  className={styles.inputLogin}
                  name="descricao"
                  value={dados.descricao}
                  onChange={handleChange}
                  placeholder="Fale um pouco sobre a missão da ONG..."
                />
              </>
            )}

            <label className={styles.grupoInput}>E-mail</label>
            <input
              className={styles.inputLogin}
              name="email"
              type="email"
              value={dados.email}
              onChange={handleChange}
              placeholder="user@gmail.com"
              required
            />

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={etapaAnterior}
                className={styles.navButtonBack}
              >
                Voltar
              </button>
              <button type="submit" className={styles.navButton}>
                Próximo
              </button>
            </div>
          </form>
        )}

        {etapa === 3 && (
          <form className={styles.form} onSubmit={proximaEtapa}>
            <h1 className={styles.titulo}>Segurança</h1>
            <p className={styles.subTitulo}>Defina sua senha de acesso</p>

            <label className={styles.grupoInput}>Telefone</label>
            <input
              className={styles.inputLogin}
              name="telefone"
              value={dados.telefone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              required
            />

            <label className={styles.grupoInput}>Senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              name="senha"
              value={dados.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />

            <label className={styles.grupoInput}>Confirmar Senha</label>
            <input
              className={styles.inputLogin}
              type="password"
              name="confirmarSenha"
              value={dados.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              required
            />

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={etapaAnterior}
                className={styles.navButtonBack}
              >
                Voltar
              </button>
              <button type="submit" className={styles.navButton}>
                Próximo
              </button>
            </div>
          </form>
        )}

        {etapa === 4 && (
          <form className={styles.form} onSubmit={finalizarCadastro}>
            <h1 className={styles.titulo}>Endereço</h1>
            <p className={styles.subTitulo}>Onde você está localizado?</p>

            <label className={styles.grupoInput}>CEP</label>
            <input
              className={styles.inputLogin}
              name="cep"
              value={dados.cep}
              onChange={handleChange}
              placeholder="00000-000"
              required
            />

            <label className={styles.grupoInput}>Rua</label>
            <input
              className={styles.inputLogin}
              name="rua"
              value={dados.rua}
              onChange={handleChange}
              placeholder="Nome da rua"
              required
            />

            <div className={styles.rowInputs}>
              <div className={styles.colInput}>
                <label className={styles.grupoInput}>Número</label>
                <input
                  className={styles.inputLogin}
                  name="numero"
                  value={dados.numero}
                  onChange={handleChange}
                  placeholder="123"
                  required
                />
              </div>

              <div className={styles.colInput}>
                <label className={styles.grupoInput}>Complemento</label>
                <input
                  className={styles.inputLogin}
                  name="complemento"
                  value={dados.complemento}
                  onChange={handleChange}
                  placeholder="Apto, Bloco..."
                />
              </div>
            </div>

            <div className={styles.rowInputs}>
              <div className={styles.colInput}>
                <label className={styles.grupoInput}>Bairro</label>
                <input
                  className={styles.inputLogin}
                  name="bairro"
                  value={dados.bairro}
                  onChange={handleChange}
                  placeholder="Seu bairro"
                  required
                />
              </div>

              <div className={styles.colInput}>
                <label className={styles.grupoInput}>Cidade</label>
                <input
                  className={styles.inputLogin}
                  name="cidade"
                  value={dados.cidade}
                  onChange={handleChange}
                  placeholder="Sua cidade"
                  required
                />
              </div>
            </div>

            <label className={styles.grupoInput}>Estado (UF)</label>
            <input
              className={styles.inputLogin}
              name="estado"
              value={dados.estado}
              onChange={handleChange}
              placeholder="SP"
              required
              maxLength={2}
            />

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={etapaAnterior}
                className={styles.navButtonBack}
              >
                Voltar
              </button>

              <button
                type="submit"
                className={styles.navButton}
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Finalizar Cadastro!"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className={getBannerClass()}></div>
    </div>
  );
}
