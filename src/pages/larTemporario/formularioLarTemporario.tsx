import React, { useState, useLayoutEffect, useRef } from "react";
import styles from "./fomularioLarTemporario.module.css";
import Nav from "../../components/navbar";

export default function FormularioLarTemporario() {
 const pageRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    // Coluna 1
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
    // Coluna 2
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
    // --- NOVOS CAMPOS PARA AS DECLARAÇÕES ---
    declaroLido: false,
    declaroVerdade: false,
  });

  // --- FUNÇÃO ATUALIZADA PARA LIDAR COM CHECKBOXES ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Se o input for do tipo checkbox, usa o 'checked' (true/false)
      // Senão, usa o 'value' (para texto, radio, etc.)
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação para garantir que as declarações foram marcadas
    if (!formData.declaroLido || !formData.declaroVerdade) {
      alert("Por favor, concorde com as declarações para finalizar.");
      return;
    }
    console.log("Dados Finais do Formulário:", formData);
    alert("Formulário enviado! Verifique a consola do navegador.");
  };

useLayoutEffect(() => {
    setTimeout(() => {
      const pageEl = pageRef.current;
      if (!pageEl) return;
      const topBar = document.querySelector(".topBar") as HTMLElement | null;
      const navBar = document.querySelector(".navbar") as HTMLElement | null;
      const topHeight = topBar?.offsetHeight ?? 0;
      const navHeight = navBar?.offsetHeight ?? 0;
      const totalHeight = topHeight + navHeight;
      pageEl.style.paddingTop = `${totalHeight}px`;
      pageEl.style.minHeight = `calc(100vh - ${totalHeight}px)`;
    }, 0);
  }, []);

  return (
    <>
      <Nav />
      <form
        ref={pageRef}
        className={styles.pageFormulario}
        onSubmit={handleSubmit}
      >
        {/* --- COLUNA 1 --- */}
        <div className={styles.coluna}>
          <h1 className={styles.titulo}>Seja um lar temporário</h1>
          <p className={styles.subtitulo}>
            Preencha o formulário para se candidatar.
          </p>
          <h2 className={styles.tituloSecao}>Informações Pessoais</h2>
          <label className={styles.label}>Nome Completo</label>
          <input
            name="nomeCompleto"
            className={styles.barraInfos}
            type="text"
            onChange={handleChange}
          />
          <div className={styles.linhaCampos}>
            <div className={styles.campoMetade}>
              <label className={styles.label}>CPF</label>
              <input
                name="cpf"
                className={styles.barraInfos}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className={styles.campoMetade}>
              <label className={styles.label}>Data de Nascimento</label>
              <input
                name="dataNascimento"
                className={styles.barraInfos}
                type="date"
                onChange={handleChange}
              />
            </div>
          </div>
          <label className={styles.label}>Email</label>
          <input
            name="email"
            className={styles.barraInfos}
            type="email"
            onChange={handleChange}
          />
          <label className={styles.label}>Telefone</label>
          <input
            name="telefone"
            className={styles.barraInfos}
            type="text"
            onChange={handleChange}
          />

          <h2 className={styles.tituloSecao}>Endereço</h2>
          <label className={styles.label}>CEP</label>
          <input
            name="cep"
            className={styles.barraInfos}
            type="text"
            onChange={handleChange}
          />
          <label className={styles.label}>Rua/Avenida</label>
          <input
            name="rua"
            className={styles.barraInfos}
            type="text"
            onChange={handleChange}
          />
          <div className={styles.linhaCampos}>
            <div className={styles.campoMetade}>
              <label className={styles.label}>Número</label>
              <input
                name="numero"
                className={styles.barraInfos}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className={styles.campoMetade}>
              <label className={styles.label}>Complemento</label>
              <input
                name="complemento"
                className={styles.barraInfos}
                type="text"
                placeholder="Opcional"
                onChange={handleChange}
              />
            </div>
          </div>
          <label className={styles.label}>Bairro</label>
          <input
            name="bairro"
            className={styles.barraInfos}
            type="text"
            onChange={handleChange}
          />
          <div className={styles.linhaCampos}>
            <div className={styles.campoMetade}>
              <label className={styles.label}>Cidade</label>
              <input
                name="cidade"
                className={styles.barraInfos}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className={styles.campoMetade}>
              <label className={styles.label}>Estado</label>
              <input
                name="estado"
                className={styles.barraInfos}
                type="text"
                onChange={handleChange}
              />
            </div>
          </div>



          <div className={styles.secaoOpcoes}>
            <h3 className={styles.tituloQuestao}>Declarações</h3>
            <label className={styles.checkboxCustomizado}>
              <input
                type="checkbox"
                name="declaroVerdade"
                checked={formData.declaroLido}
                onChange={handleChange}
              />
              <span className={styles.checkmark}></span>
              Declaração de que se compromete a cuidar do animal com responsabilidade, respeitando as orientações da ONG.
            </label>
            <label className={styles.checkboxCustomizado}>
              <input
                type="checkbox"
                name="declaroLido"
                checked={formData.declaroVerdade}
                onChange={handleChange}
              />
              <span className={styles.checkmark}></span>
              Aceite obrigatório antes do envio.
            </label>
          </div>
        </div>

        {/* --- COLUNA 2 (Alterações aplicadas aqui) --- */}
        <div className={styles.coluna2}>
          <div className={styles.secaoOpcoes}>
            <h3 className={styles.tituloQuestao}>Sobre o Espaço Disponível</h3>
            <h4>Tipo de Moradia:</h4>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}><input type="radio" name="tipoMoradia" value="casa" onChange={handleChange} /><span className={styles.checkmark}></span>Casa</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="tipoMoradia" value="apartamento" onChange={handleChange} /><span className={styles.checkmark}></span>Apartamento</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="tipoMoradia" value="sitioChacara" onChange={handleChange} /><span className={styles.checkmark}></span>Sítio ou Chácara</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="tipoMoradia" value="outro" onChange={handleChange} /><span className={styles.checkmark}></span>Outro</label>
            </div>

            <h4>Possui quintal?</h4>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}><input type="radio" name="quintal" value="sim" onChange={handleChange} /><span className={styles.checkmark}></span>Sim</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="quintal" value="nao" onChange={handleChange} /><span className={styles.checkmark}></span>Não</label>
            </div>

            <h4>Quais portes aceita?</h4>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}><input type="radio" name="porteAnimal" value="pequeno" onChange={handleChange} /><span className={styles.checkmark}></span>Pequeno</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="porteAnimal" value="medio" onChange={handleChange} /><span className={styles.checkmark}></span>Médio</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="porteAnimal" value="grande" onChange={handleChange} /><span className={styles.checkmark}></span>Grande</label>
            </div>

            <h4>Quais Animais Aceita?</h4>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}><input type="radio" name="tipoAnimal" value="cachorro" onChange={handleChange} /><span className={styles.checkmark}></span>Cachorro</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="tipoAnimal" value="gato" onChange={handleChange} /><span className={styles.checkmark}></span>Gato</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="tipoAnimal" value="todos" onChange={handleChange} /><span className={styles.checkmark}></span>Todos</label>
            </div>
          </div>

          <div className={styles.secaoOpcoes}>
            <h3 className={styles.tituloQuestao}>Experiência com Animais</h3>
            <h4>Possui outros animais em casa?</h4>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}><input type="radio" name="outrosAnimais" value="sim" onChange={handleChange} /><span className={styles.checkmark}></span>Sim</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="outrosAnimais" value="nao" onChange={handleChange} /><span className={styles.checkmark}></span>Não</label>
            </div>

            <h4>Está disposto a administrar medicamentos, se necessário?</h4>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}><input type="radio" name="administraMedicamentos" value="sim" onChange={handleChange} /><span className={styles.checkmark}></span>Sim</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="administraMedicamentos" value="nao" onChange={handleChange} /><span className={styles.checkmark}></span>Não</label>
            </div>

            <h4>Tem disponibilidade para levar o animal ao veterinário?</h4>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}><input type="radio" name="levarVeterinario" value="sim" onChange={handleChange} /><span className={styles.checkmark}></span>Sim</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="levarVeterinario" value="nao" onChange={handleChange} /><span className={styles.checkmark}></span>Não</label>
            </div>
          </div>

          <div className={styles.secaoOpcoes}>
            <h3 className={styles.tituloQuestao}>Recursos e condições</h3>
            <h4>Pode fornecer ração e cuidados básicos?</h4>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}><input type="radio" name="arcarCustos" value="sim" onChange={handleChange} /><span className={styles.checkmark}></span>Sim</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="arcarCustos" value="nao" onChange={handleChange} /><span className={styles.checkmark}></span>Não</label>
            </div>

            <h4>Precisa de ajuda da ONG com suprimentos?</h4>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}><input type="radio" name="ajudaSuprimentos" value="sim" onChange={handleChange} /><span className={styles.checkmark}></span>Sim</label>
              <label className={styles.checkboxCustomizado}><input type="radio" name="ajudaSuprimentos" value="nao" onChange={handleChange} /><span className={styles.checkmark}></span>Não</label>
            </div>
          </div>

          <h3 className={styles.tituloQuestao}> Tempo de Disponibilidade</h3>
          <h4 className={styles.label}>Período disponível para abrigar</h4>
          <input
            name="disponibilidade"
            className={styles.barraInfos}
            type="text"
            onChange={handleChange}
          />

          <button type="submit" className={styles.botaoEnviar}>
            Finalizar
          </button>
        </div>
      </form>
    </>
  );
}