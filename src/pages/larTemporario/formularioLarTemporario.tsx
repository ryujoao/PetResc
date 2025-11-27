import React, { useState } from "react";
import styles from "./formularioLarTemporario.module.css";
import Sucesso from "../../components/sucesso";
import Layout from "../../components/layout";

export default function FormularioLarTemporario() {
  const [sucessoOpen, setSucessoOpen] = useState(false);

  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    dataNascimento: "",
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
    quintal: "",
    porteAnimal: "",
    tipoAnimal: "",
    outrosAnimais: "",
    administraMedicamentos: "",
    levarVeterinario: "",
    arcarCustos: "",
    ajudaSuprimentos: "",
    disponibilidade: "",
    declaroLido: false,
    declaroVerdade: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declaroLido || !formData.declaroVerdade) {
      alert("Por favor, concorde com as declarações para finalizar.");
      return;
    }
    console.log("Enviando:", formData);
    setSucessoOpen(true);
  };

  return (
    <Layout>
      <div className={styles.container}>
        
        <h1 className={styles.titulo}>Seja um lar temporário</h1>
        <p className={styles.subtitulo}>Preencha o formulário para se candidatar.</p>

        <form onSubmit={handleSubmit}>
          
          {/* --- BLOCO 1: DADOS PESSOAIS --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Informações Pessoais</h2>
            
            <label className={styles.label}>Nome Completo</label>
            <input name="nomeCompleto" className={styles.input} type="text" onChange={handleChange} />

            <div className={styles.row}>
              <div className={styles.col}>
                <label className={styles.label}>CPF</label>
                <input name="cpf" className={styles.input} type="text" onChange={handleChange} placeholder="000.000.000-00" />
              </div>
              <div className={styles.col}>
                <label className={styles.label}>Data de Nascimento</label>
                <input name="dataNascimento" className={styles.input} type="date" onChange={handleChange} />
              </div>
            </div>

            <label className={styles.label}>Email</label>
            <input name="email" className={styles.input} type="email" onChange={handleChange} placeholder="user@gmail.com" />

            <label className={styles.label}>Telefone</label>
            <input name="telefone" className={styles.input} type="text" onChange={handleChange} placeholder="(00) 00000-0000" />
          </div>

          {/* --- BLOCO 2: ENDEREÇO --- */}
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

          {/* --- BLOCO 3: SOBRE A MORADIA E ANIMAIS --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Sobre o Espaço e Preferências</h2>

            <h3 className={styles.tituloQuestao}>Tipo de Moradia:</h3>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="tipoMoradia" value="casa" onChange={handleChange} checked={formData.tipoMoradia === "casa"} />
                <span className={styles.checkmark}></span> Casa
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="tipoMoradia" value="apartamento" onChange={handleChange} checked={formData.tipoMoradia === "apartamento"} />
                <span className={styles.checkmark}></span> Apartamento
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="tipoMoradia" value="sitio" onChange={handleChange} checked={formData.tipoMoradia === "sitio"} />
                <span className={styles.checkmark}></span> Sítio ou Chácara
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="tipoMoradia" value="outro" onChange={handleChange} checked={formData.tipoMoradia === "outro"} />
                <span className={styles.checkmark}></span> Outro
              </label>
            </div>

            <h3 className={styles.tituloQuestao}>Possui quintal?</h3>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="quintal" value="sim" onChange={handleChange} checked={formData.quintal === "sim"} />
                <span className={styles.checkmark}></span> Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="quintal" value="nao" onChange={handleChange} checked={formData.quintal === "nao"} />
                <span className={styles.checkmark}></span> Não
              </label>
            </div>

            <h3 className={styles.tituloQuestao}>Quais portes aceita?</h3>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="porteAnimal" value="pequeno" onChange={handleChange} checked={formData.porteAnimal === "pequeno"} />
                <span className={styles.checkmark}></span> Pequeno
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="porteAnimal" value="medio" onChange={handleChange} checked={formData.porteAnimal === "medio"} />
                <span className={styles.checkmark}></span> Médio
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="porteAnimal" value="grande" onChange={handleChange} checked={formData.porteAnimal === "grande"} />
                <span className={styles.checkmark}></span> Grande
              </label>
            </div>

            <h3 className={styles.tituloQuestao}>Quais animais aceita?</h3>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="tipoAnimal" value="gato" onChange={handleChange} checked={formData.tipoAnimal === "gato"} />
                <span className={styles.checkmark}></span> Gato
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="tipoAnimal" value="cachorro" onChange={handleChange} checked={formData.tipoAnimal === "cachorro"} />
                <span className={styles.checkmark}></span> Cachorro
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="tipoAnimal" value="todos" onChange={handleChange} checked={formData.tipoAnimal === "todos"} />
                <span className={styles.checkmark}></span> Todos
              </label>
            </div>

            {/* --- PERGUNTAS DE EXPERIÊNCIA QUE FALTAVAM --- */}
            <h2 className={styles.tituloSecao}>Experiência e Condições</h2>
            
            <h3 className={styles.tituloQuestao}>Possui outros animais em casa?</h3>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="outrosAnimais" value="sim" onChange={handleChange} checked={formData.outrosAnimais === "sim"} />
                <span className={styles.checkmark}></span> Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="outrosAnimais" value="nao" onChange={handleChange} checked={formData.outrosAnimais === "nao"} />
                <span className={styles.checkmark}></span> Não
              </label>
            </div>

            <h3 className={styles.tituloQuestao}>Está disposto a administrar medicamentos, se necessário?</h3>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="administraMedicamentos" value="sim" onChange={handleChange} checked={formData.administraMedicamentos === "sim"} />
                <span className={styles.checkmark}></span> Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="administraMedicamentos" value="nao" onChange={handleChange} checked={formData.administraMedicamentos === "nao"} />
                <span className={styles.checkmark}></span> Não
              </label>
            </div>

            <h3 className={styles.tituloQuestao}>Tem disponibilidade para levar o animal ao veterinário, se solicitado pela ONG?</h3>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="levarVeterinario" value="sim" onChange={handleChange} checked={formData.levarVeterinario === "sim"} />
                <span className={styles.checkmark}></span> Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="levarVeterinario" value="nao" onChange={handleChange} checked={formData.levarVeterinario === "nao"} />
                <span className={styles.checkmark}></span> Não
              </label>
            </div>

            <h3 className={styles.tituloQuestao}>Pode arcar com custos básicos?</h3>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="arcarCustos" value="sim" onChange={handleChange} checked={formData.arcarCustos === "sim"} />
                <span className={styles.checkmark}></span> Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="arcarCustos" value="nao" onChange={handleChange} checked={formData.arcarCustos === "nao"} />
                <span className={styles.checkmark}></span> Não
              </label>
            </div>

            <h3 className={styles.tituloQuestao}>Precisa de ajuda com suprimentos?</h3>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="ajudaSuprimentos" value="sim" onChange={handleChange} checked={formData.ajudaSuprimentos === "sim"} />
                <span className={styles.checkmark}></span> Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="ajudaSuprimentos" value="nao" onChange={handleChange} checked={formData.ajudaSuprimentos === "nao"} />
                <span className={styles.checkmark}></span> Não
              </label>
            </div>

            <h2 className={styles.tituloQuestao}>Tempo de Disponibilidade</h2>
            <label className={styles.label}>
                Por quanto tempo você pode abrigar o animal?
            </label>
            <input name="disponibilidade" className={styles.input} type="text" placeholder="Ex: 15 dias, 1 mês, indeterminado..." onChange={handleChange} />
          </div>

          {/* --- BLOCO 4: DECLARAÇÕES --- */}
          <div className={styles.secao}>
            <h2 className={styles.tituloSecao}>Declarações</h2>
            
            <label className={styles.checkboxCustomizado} style={{ alignItems: 'flex-start' }}>
              <input type="checkbox" name="declaroVerdade" checked={formData.declaroVerdade} onChange={handleChange} />
              <span className={styles.checkmark} style={{ marginTop: '3px' }}></span>
              <span className={styles.spanCheckmark}>Declaro que me comprometo a cuidar do animal com responsabilidade, respeitando as orientações da ONG.</span>
            </label>
            
            <label className={styles.checkboxCustomizado} style={{ marginTop: '1rem' }}>
              <input type="checkbox" name="declaroLido" checked={formData.declaroLido} onChange={handleChange} />
              <span className={styles.checkmark}></span>
              <span className={styles.spanCheckmark}>Li e concordo com os termos.</span>
            </label>
          </div>

          <button type="submit" className={styles.botaoEnviar}>Finalizar</button>

        </form>
      </div>  
      <Sucesso isOpen={sucessoOpen} onClose={() => setSucessoOpen(false)} />
    </Layout> 
  );
} 