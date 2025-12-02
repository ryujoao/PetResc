import React, { useState } from "react";
import styles from "./formularioLarTemporario.module.css";
import Sucesso from "../../components/sucesso";
import Layout from "../../components/layout";

/** Tipagens */
type YesNo = "sim" | "nao" | "";
interface FormData {
  nomeCompleto: string;
  cpf: string;
  email: string;
  telefone: string;

  // endereco
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;

  // moradia / animais
  tipoMoradia: string;
  quintal: YesNo;
  porteAnimal: string;
  tipoAnimal: string;

  // experiencia / condicoes
  outrosAnimais: YesNo;
  administraMedicamentos: YesNo;
  levarVeterinario: YesNo;
  arcarCustos: YesNo;
  ajudaSuprimentos: YesNo;

  periodoDisponibilidade: string;

  // declarações
  declaroLido: boolean;
  declaroVerdade: boolean;
}

export default function FormularioLarTemporario() {
  const [sucessoOpen, setSucessoOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: "",
    cpf: "",
    email: "",
    telefone: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    tipoMoradia: "",
    quintal: "" as YesNo,
    porteAnimal: "",
    tipoAnimal: "",
    outrosAnimais: "" as YesNo,
    administraMedicamentos: "" as YesNo,
    levarVeterinario: "" as YesNo,
    arcarCustos: "" as YesNo,
    ajudaSuprimentos: "" as YesNo,
    periodoDisponibilidade: "",
    declaroLido: false,
    declaroVerdade: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: rawName, value, type, checked } = e.target;
    const name = rawName as keyof FormData;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    
    setFormData((prev) => ({ ...prev, [name]: value } as FormData));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formData.periodoDisponibilidade) {
        alert("Informe o período de disponibilidade.");
        return;
      }

      const token = localStorage.getItem("@AuthData:token");

      if (!token) {
        alert("Erro: usuário não autenticado.");
        return;
      }

      const payload = {
        nomeCompleto: formData.nomeCompleto,
        cpf: formData.cpf,
        email: formData.email,
        telefone: formData.telefone,

        endereco: {
          cep: formData.cep,
          rua: formData.rua,
          numero: formData.numero,
          complemento: formData.complemento || null,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
        },

        tipoResidencia: formData.tipoMoradia,
        espacoDisponivel: formData.quintal === "sim",

        porteAnimal: formData.porteAnimal,
        tipoAnimalInteresse: formData.tipoAnimal,

        possuiAnimais: formData.outrosAnimais === "sim",
        experiencia: formData.administraMedicamentos === "sim",

        levarVeterinario: formData.levarVeterinario === "sim",
        arcarCustos: formData.arcarCustos === "sim",
        ajudaSuprimentos: formData.ajudaSuprimentos === "sim",

        periodoDisponibilidade: formData.periodoDisponibilidade,

        declaroLido: formData.declaroLido,
        declaroVerdade: formData.declaroVerdade,
      };

      console.log("🔵 ENVIANDO PAYLOAD:", payload);

      const response = await fetch(
        "https://petresc.onrender.com/api/lares-temporarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const erro = await response.json();
        console.error("❌ Erro do servidor:", erro);
        alert("Erro ao enviar formulário: " + erro.error);
        return;
      }

      setSucessoOpen(true);
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Erro inesperado ao enviar o formulário.");
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.titulo}>Seja um lar temporário</h1>
        <p className={styles.subtitulo}>Preencha o formulário para se candidatar.</p>

        <form onSubmit={handleSubmit}>
          {/* --- DADOS PESSOAIS --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Informações Pessoais</h2>

            <label className={styles.label}>Nome Completo</label>
            <input name="nomeCompleto" className={styles.input} type="text" onChange={handleChange} />

            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.label}>CPF</label>
                <input name="cpf" className={styles.input} type="text" onChange={handleChange} placeholder="000.000.000-00" />
              </div>
            </div>

            <label className={styles.label}>Email</label>
            <input name="email" className={styles.input} type="email" onChange={handleChange} placeholder="user@gmail.com" />

            <label className={styles.label}>Telefone</label>
            <input name="telefone" className={styles.input} type="text" onChange={handleChange} placeholder="(00) 00000-0000" />
          </div>

          {/* --- ENDEREÇO --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Endereço</h2>

            <label className={styles.label}>CEP</label>
            <input name="cep" className={styles.input} type="text" onChange={handleChange} />

            <label className={styles.label}>Rua/Avenida</label>
            <input name="rua" className={styles.input} type="text" onChange={handleChange} />

            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.label}>Número</label>
                <input name="numero" className={styles.input} type="text" onChange={handleChange} />
              </div>
              <div className={styles.col}>
                <label className={styles.label}>Complemento</label>
                <input name="complemento" className={styles.input} type="text" placeholder="Opcional" onChange={handleChange} />
              </div>
            </div>

            <label className={styles.label}>Bairro</label>
            <input name="bairro" className={styles.input} type="text" onChange={handleChange} />

            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.label}>Cidade</label>
                <input name="cidade" className={styles.input} type="text" onChange={handleChange} />
              </div>
              <div className={styles.col}>
                <label className={styles.label}>Estado</label>
                <input name="estado" className={styles.input} type="text" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* --- MORADIA / ANIMAIS --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Sobre o Espaço e Preferências</h2>

            <h3 className={styles.tituloQuestao}>Tipo de Moradia:</h3>
            <div className={styles.grupoOpcoes}>
              {["casa", "apartamento", "sitio", "outro"].map((tipo) => (
                <label key={tipo} className={styles.checkboxCustomizado}>
                  <input
                    type="radio"
                    name="tipoMoradia"
                    value={tipo}
                    onChange={handleChange}
                    checked={formData.tipoMoradia === tipo}
                  />
                  <span className={styles.checkmark}></span>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </label>
              ))}
            </div>

            <h3 className={styles.tituloQuestao}>Possui quintal?</h3>
            <div className={styles.grupoOpcoes}>
              {["sim", "nao"].map((v) => (
                <label key={v} className={styles.checkboxCustomizado}>
                  <input
                    type="radio"
                    name="quintal"
                    value={v}
                    onChange={handleChange}
                    checked={formData["quintal"] === v}
                  />
                  <span className={styles.checkmark}></span>
                  {v === "sim" ? "Sim" : "Não"}
                </label>
              ))}
            </div>

            <h3 className={styles.tituloQuestao}>Quais portes aceita?</h3>
            <div className={styles.grupoOpcoes}>
              {["pequeno", "medio", "grande"].map((v) => (
                <label key={v} className={styles.checkboxCustomizado}>
                  <input
                    type="radio"
                    name="porteAnimal"
                    value={v}
                    onChange={handleChange}
                    checked={formData.porteAnimal === v}
                  />
                  <span className={styles.checkmark}></span>
                  {v}
                </label>
              ))}
            </div>

            <h3 className={styles.tituloQuestao}>Quais animais aceita?</h3>
            <div className={styles.grupoOpcoes}>
              {["gato", "cachorro", "todos"].map((v) => (
                <label key={v} className={styles.checkboxCustomizado}>
                  <input
                    type="radio"
                    name="tipoAnimal"
                    value={v}
                    onChange={handleChange}
                    checked={formData.tipoAnimal === v}
                  />
                  <span className={styles.checkmark}></span>
                  {v}
                </label>
              ))}
            </div>

            <h2 className={styles.tituloSecao}>Experiência e Condições</h2>

            {[
              { label: "Possui outros animais em casa?", name: "outrosAnimais" },
              { label: "Está disposto a administrar medicamentos?", name: "administraMedicamentos" },
              { label: "Tem disponibilidade para levar o animal ao veterinário?", name: "levarVeterinario" },
              { label: "Pode arcar com custos básicos?", name: "arcarCustos" },
              { label: "Precisa de ajuda com suprimentos?", name: "ajudaSuprimentos" },
            ].map((q) => (
              <div key={q.name}>
                <h3 className={styles.tituloQuestao}>{q.label}</h3>
                <div className={styles.grupoOpcoes}>
                  {["sim", "nao"].map((v) => (
                    <label key={v} className={styles.checkboxCustomizado}>
                      <input
                        type="radio"
                        name={q.name}
                        value={v}
                        onChange={handleChange}
                        checked={formData[q.name as keyof FormData] === v}
                      />
                      <span className={styles.checkmark}></span>
                      {v === "sim" ? "Sim" : "Não"}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <h2 className={styles.tituloQuestao}>Tempo de Disponibilidade</h2>
            <label className={styles.label}>Por quanto tempo você pode abrigar o animal?</label>
            <input
              name="periodoDisponibilidade"
              className={styles.input}
              type="text"
              placeholder="Ex: 15 dias, 1 mês..."
              onChange={handleChange}
            />
          </div>

          {/* --- DECLARAÇÕES --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Declarações</h2>

            <label className={styles.checkboxCustomizado} style={{ alignItems: "flex-start" }}>
              <input type="checkbox" name="declaroVerdade" checked={formData.declaroVerdade} onChange={handleChange} />
              <span className={styles.checkmark} style={{ marginTop: "3px" }}></span>
              <span className={styles.spanCheckmark}>Declaro que me comprometo a cuidar do animal com responsabilidade.</span>
            </label>

            <label className={styles.checkboxCustomizado} style={{ marginTop: "1rem" }}>
              <input type="checkbox" name="declaroLido" checked={formData.declaroLido} onChange={handleChange} />
              <span className={styles.checkmark}></span>
              <span className={styles.spanCheckmark}>Li e concordo com os termos.</span>
            </label>
          </div>

          <button type="submit" className={styles.botaoEnviar}>Finalizar</button>
        </form>
      </div>

      <Sucesso
        isOpen={sucessoOpen}
        onClose={() => {
          setSucessoOpen(false);
          window.location.href = "/";
        }}
      />
    </Layout>
  );
}
