import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api";
import styles from "./cadastro.module.css";
import axios, { AxiosError } from "axios";

interface IBGEUFResponse {
  id: number;
  sigla: string;
  nome: string;
}
interface IBGECidadeResponse {
  id: number;
  nome: string;
}

export default function CadastroFinal() {
  const navigate = useNavigate();
  const location = useLocation();

  // dadosEtapaAnterior deve conter: { nome, email, cnpj, descricao, telefone, password, role }
  const dadosEtapaAnterior = location.state;

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [estados, setEstados] = useState<IBGEUFResponse[]>([]);
  const [cidades, setCidades] = useState<IBGECidadeResponse[]>([]);

  // (Os useEffects para buscar CEP, Estados e Cidades continuam iguais)
  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((response) => setEstados(response.data));
  }, []);

  useEffect(() => {
    if (estado) {
      axios
        .get<IBGECidadeResponse[]>(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
        )
        .then((response) => setCidades(response.data));
    }
  }, [estado]);

  useEffect(() => {
    const cepFormatado = cep.replace(/\D/g, "");
    if (cepFormatado.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cepFormatado}/json/`)
        .then((response) => {
          if (!response.data.erro) {
            setRua(response.data.logradouro);
            setBairro(response.data.bairro);
            setEstado(response.data.uf);
            setCidade(response.data.localidade);
            setError("");
          } else {
            setError("CEP não encontrado.");
          }
        })
        .catch(() => setError("Erro ao buscar o CEP."));
    }
  }, [cep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
      setError("Por favor, preencha todos os campos do endereço.");
      return;
    }

    if (!dadosEtapaAnterior) {
      setError("Ocorreu um erro. Por favor, volte para o início do cadastro.");
      return;
    }

    // --- MUDANÇA 1: VERIFICAR SE 'descricao' VEIO DA PÁGINA ANTERIOR ---
    if (!dadosEtapaAnterior.descricao) {
      setError(
        "Erro: A 'descrição' da ONG não foi encontrada. Por favor, volte ao início do cadastro."
      );
      setIsLoading(false);
      return;
    }
    // --- FIM DA MUDANÇA ---

    setIsLoading(true);

    const enderecoFormatado = `${rua}, ${numero}${
      complemento ? ` - ${complemento}` : ""
    } - ${bairro}, ${cidade}/${estado} - ${cep}`;

    // --- MUDANÇA 2: MONTAR O PAYLOAD CORRETO ---
    const dadosCompletos = {
      nome: dadosEtapaAnterior.nome,
      email: dadosEtapaAnterior.email,
      password: dadosEtapaAnterior.password,
      role: dadosEtapaAnterior.role, // "ONG"
      cnpj: dadosEtapaAnterior.cnpj,
      descricao: dadosEtapaAnterior.descricao, // <-- Lendo o dado que veio do state
      telefone: dadosEtapaAnterior.telefone,
      endereco: enderecoFormatado,
    };

    try {
      await api.post("/auth/register", dadosCompletos);
      alert(
        "Cadastro da ONG realizado com sucesso! Você será redirecionado para o login."
      );
      navigate("/login");
    } catch (apiError) {
      if (apiError instanceof AxiosError && apiError.response) {
        console.error("Erro do backend:", apiError.response.data);

        let msg = "Não foi possível realizar o cadastro.";
        // Tenta ler a mensagem de erro específica do back-end
        if (apiError.response.data && apiError.response.data.error) {
          msg = apiError.response.data.error; // Ex: "E-mail já cadastrado."
        } else if (
          apiError.response.data &&
          typeof apiError.response.data === "object"
        ) {
          msg =
            "Erro de validação. Verifique se todos os campos estão corretos.";
        }
        setError(msg);
      } else {
        console.error("Erro ao cadastrar:", apiError);
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms2}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.titulo}>Endereço da ONG</h1>
          <p className={styles.subTitulo}>
            Complete os dados de localização para finalizar
          </p>

          {/* --- MUDANÇA 3: REMOVER O CAMPO DE DESCRIÇÃO DAQUI --- */}
          {/* O <textarea> de Descrição foi removido. */}

          <div>
            <label className={styles.grupoInput}>CEP</label>
            <input
              className={styles.inputLogin}
              type="text"
              placeholder="Digite o CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              maxLength={9}
            />
          </div>
          <div>
            <label className={styles.grupoInput}>Rua/Avenida</label>
            <input
              className={styles.inputLogin}
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </div>

          <div className={styles.linhaCampos}>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Número</label>
              <input
                className={styles.inputLogin}
                type="text"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Complemento</label>
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="Opcional"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={styles.grupoInput}>Bairro</label>
            <input
              className={styles.inputLogin}
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          <div className={styles.linhaCampos}>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Estado</label>
              <select
                className={styles.inputLogin}
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Selecione um estado</option>
                {estados.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Cidade</label>
              <select
                className={styles.inputLogin}
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                disabled={!estado}
              >
                <option value="">Selecione uma cidade</option>
                {cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className={styles.botaoProx}
            disabled={isLoading}
          >
            {isLoading ? "Finalizando..." : "Finalizar Cadastro"}
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
