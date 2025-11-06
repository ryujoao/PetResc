import React from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
  groupId: number;
  subStep: number;
  onAnswer: (p: Partial<any>) => void;
  data: Record<string, any>;
};

// Objeto de grupos (O seu código original, está perfeito)
const groups: Record<
  number,
  {
    questions: {
      key: string;
      title: string;
      options?: string[];
      type?: "options" | "text";
    }[];
  }
> = {
  2: {
    questions: [
      {
        key: "tipoMoradiaChoice",
        title: "Tipo de moradia?",
        options: ["Casa", "Apartamento", "Sítio", "Outro"],
        type: "options",
      },
      {
        key: "portesAceitos",
        title: "Quais portes são aceitos?",
        options: ["Pequeno", "Médio", "Grande", "Todos"],
        type: "options",
      },
      {
        key: "animaisAceitos",
        title: "Quais animais são aceitos?",
        options: ["Gato", "Cachorro", "Pássaros", "Todos"],
        type: "options",
      },
    ],
  },
  3: {
    questions: [
      {
        key: "jaViuPet",
        title: "Você já viu algum pet que tem interesse em adotar?",
        options: ["Sim, já vi", "Não, quero achar um"],
        type: "options",
      },
      {
        key: "qualTipoPet",
        title: "Qual tipo pet que tem interesse em adotar?",
        options: ["Cachorro", "Gato", "Pássaros"],
        type: "options",
      },
      {
        key: "preferenciaPet",
        title: "Qual a sua preferência que o pet seja:",
        options: ["Macho", "Fêmea", "Tanto faz"],
        type: "options",
      },
    ],
  },
  4: {
    questions: [
      {
        key: "pessoasNoLar",
        title: "Quantas pessoas moram no lar?",
        type: "text",
      },
      {
        key: "outrosAnimaisLocal",
        title: "Outros animais no local?",
        options: ["Quantidade", "Tipo de Animal"],
        type: "text",
      },
      {
        key: "alergia",
        title: "Alguma pessoa com alergia?",
        options: ["Sim", "Não"],
        type: "options",
      },
    ],
  },
};

export default function StepQuestionsGroup({
  groupId,
  subStep,
  onAnswer,
  data,
}: Props) {
  const group = groups[groupId];
  if (!group) return null;
  const q = group.questions[subStep];
  if (!q) return null;

  // Handler para os botões de rádio
  const handleOption = (key: string, value: string) =>
    onAnswer({ [key]: value });

  // Handler para os campos de texto múltiplos
  const handleMultiTextChange = (subKey: string, value: string) => {
    const currentObject = data[q.key] || {};
    const newObject = { ...currentObject, [subKey]: value };
    onAnswer({ [q.key]: newObject });
  };

  // Handler para o campo de texto único (textarea)
  const handleSingleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onAnswer({ [q.key]: e.target.value });
  };

  // Pega o valor (que é um objeto) para os campos múltiplos
  const multiTextValue = data[q.key] || {};
  // Pega o valor (que é uma string) para o campo único
  const singleTextValue = data[q.key] ?? "";

  // --- MUDANÇA 1: Variável para checar a condição ---
  // Verifica se a pergunta atual é "jaViuPet" E se a resposta é "Sim, já vi"
  const showIdAnimalInput =
    q.key === "jaViuPet" && data.jaViuPet === "Sim, já vi";

  return (
    <section className={styles.stepSection}>
      <h3 className={styles.questionTitle}>{q.title}</h3>

      {/* --- RENDERIZAÇÃO DAS OPÇÕES (A, B, C) --- */}
      {q.type === "options" &&
        q.options?.map((opt, index) => {
          const letter = String.fromCharCode(65 + index); // Letra 'A'
          const checked = data[q.key] === opt;
          return (
            <label
              key={opt}
              className={`${styles.optionButton} ${
                checked ? styles.selectedOption : ""
              }`}
              onClick={() => handleOption(q.key, opt)}
              role="button"
              aria-pressed={checked}
            >
              <input
                type="radio"
                name={q.key}
                value={opt}
                checked={checked}
                onChange={() => handleOption(q.key, opt)}
                aria-label={opt}
              />
              <span className={styles.optionLetter}>{letter}</span>
              <span className={styles.optionLabel}>{opt}</span>
            </label>
          );
        })}

      {/* --- MUDANÇA 2: Renderização condicional do Input --- */}
      {showIdAnimalInput && (
        <input
          type="text"
          className={styles.inputFinal}
          placeholder="Qual o ID ou nome do animal?"
          // O valor é salvo em um novo campo 'idAnimal'
          value={data.idAnimal ?? ""}
          // O 'onChange' atualiza esse novo campo 'idAnimal'
          onChange={(e) => onAnswer({ idAnimal: e.target.value })}
          style={{ marginTop: "1rem", width: "100%" }} // Estilo para espaçar
        />
      )}
      {/* --- FIM DA MUDANÇA --- */}

      {/* --- RENDERIZAÇÃO DOS CAMPOS DE TEXTO --- */}

      {/* Caso 1: Múltiplos campos de texto (para "Outros animais no local?") */}
      {q.type === "text" && q.options && (
        <div className={styles.multiTextContainer}>
          {q.options.map((placeholder) => {
            const isQuantidade = placeholder === "Quantidade";

            return (
              <input
                key={placeholder}
                type={"text"}
                inputMode={isQuantidade ? "numeric" : "text"}
                className={styles.inputFinal}
                style={{ width: "48%", minWidth: "200px" }}
                placeholder={placeholder}
                value={multiTextValue[placeholder] ?? ""}
                onChange={(e) => {
                  let value = e.target.value;
                  if (isQuantidade) {
                    value = value.replace(/[^0-9]/g, "");
                  }
                  handleMultiTextChange(placeholder, value);
                }}
              />
            );
          })}
        </div>
      )}

      {/* Caso 2: Campo de texto único (para "Quantas pessoas moram no lar?") */}
      {q.type === "text" && !q.options && (
        <textarea
          className={styles.inputFinal}
          placeholder="Sua resposta..."
          rows={1}
          value={singleTextValue}
          onChange={handleSingleTextChange}
        />
      )}
    </section>
  );
}
