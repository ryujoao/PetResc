import React, { useEffect } from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
  groupId: number;
  subStep: number;
  onAnswer: (p: Partial<any>) => void;
  data: Record<string, any>;
  setCanProceed: (v: boolean) => void;
};

// --- CONFIGURAÇÃO DAS PERGUNTAS ---
const groups: Record<
  number,
  {
    questions: {
      key: string;
      title: string;
      options?: string[];
      type?: "options" | "text";
      required: boolean; 
      multiple?: boolean;
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
        required: true,
        multiple: false,
      },
      {
        key: "portesAceitos",
        title: "Quais portes são aceitos?",
        options: ["Pequeno", "Médio", "Grande", "Todos"],
        type: "options",
        required: true,
        multiple: true,
      },
      {
        key: "animaisAceitos",
        title: "Quais animais são aceitos?",
        options: ["Gato", "Cachorro", "Pássaros", "Todos"],
        type: "options",
        required: true,
        multiple: true,
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
        required: false,
        multiple: false,
      },
      {
        key: "preferenciaPet",
        title: "Qual a sua preferência que o pet seja:",
        options: ["Macho", "Fêmea", "Tanto faz"],
        type: "options",
        required: true,
        multiple: false,
      },
    ],
  },
  4: {
    questions: [
      {
        key: "pessoasNoLar",
        title: "Quantas pessoas moram no lar?",
        type: "text",
        required: true,
      },
      {
        key: "outrosAnimaisLocal",
        title: "Outros animais no local?",
        options: ["Quantidade", "Tipo de Animal"],
        type: "text",
        required: true,
      },
      {
        key: "alergia",
        title: "Alguma pessoa com alergia?",
        options: ["Sim", "Não"],
        type: "options",
        required: true,
        multiple: false,
      },
    ],
  },
};

export default function StepQuestionsGroup({
  groupId,
  subStep,
  onAnswer,
  data,
  setCanProceed,
}: Props) {
  const group = groups[groupId];
  if (!group) return null;
  const q = group.questions[subStep];
  if (!q) return null;

  // --- VALIDAÇÃO AUTOMÁTICA ---
  useEffect(() => {
    // Se não é obrigatório, libera sempre
    if (!q.required) {
      setCanProceed(true);
      return;
    }

    const value = data[q.key];

    // Regra especial para "jaViuPet"
    if (q.key === "jaViuPet" && value === "Sim, já vi") {
      const idPreenchido = data.idAnimal && data.idAnimal.trim().length > 0;
      setCanProceed(!!idPreenchido);
      return;
    }

    let isValid = false;

    if (q.multiple) {
      // Se for múltipla, tem que ser um array com itens
      isValid = Array.isArray(value) && value.length > 0;
    } else if (q.type === "text" && q.options) {
      // Se for texto composto, verifica se tem algo preenchido
      isValid = value && Object.values(value).some((v: any) => v && v.trim() !== "");
    } else {
      // Texto simples ou radio único
      isValid = value && typeof value === "string" && value.trim() !== "";
    }

    setCanProceed(isValid);
  }, [data, q, setCanProceed]);

  // --- HANDLERS (AÇÕES) ---
  const handleOption = (key: string, value: string, isMultiple?: boolean) => {
    if (isMultiple) {
      const currentList: string[] = Array.isArray(data[key]) ? data[key] : [];
      
      // Verifica se o item já está na lista
      if (currentList.includes(value)) {
        // Se já tem, remove (desmarca)
        const novaLista = currentList.filter((item) => item !== value);
        onAnswer({ [key]: novaLista });
      } else {
        // Se não tem, adiciona (marca)
        onAnswer({ [key]: [...currentList, value] });
      }
    } else {
      // Escolha única (radio)
      onAnswer({ [key]: value });
    }
  };

  const handleMultiTextChange = (subKey: string, value: string) => {
    const currentObject = data[q.key] || {};
    const newObject = { ...currentObject, [subKey]: value };
    onAnswer({ [q.key]: newObject });
  };

  const handleSingleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswer({ [q.key]: e.target.value });
  };

  const multiTextValue = data[q.key] || {};
  const singleTextValue = data[q.key] ?? "";
  const showIdAnimalInput = q.key === "jaViuPet" && data.jaViuPet === "Sim, já vi";

  return (
    <section className={styles.stepSection}>
      <h3 className={styles.questionTitle}>
        {q.title}
        {!q.required && (
          <span style={{ fontSize: "0.8rem", fontWeight: "normal", color: "#666" }}>
            {" "}
            (Opcional)
          </span>
        )}
      </h3>
      
      {q.multiple && (
        <p style={{ fontSize: "0.8rem", marginBottom: "10px", color: "#555" }}>
          Selecione todas as opções que desejar.
        </p>
      )}

      {/* RENDERIZAÇÃO DAS OPÇÕES (Radio ou Checkbox) */}
      {q.type === "options" &&
        q.options?.map((opt, index) => {
          const letter = String.fromCharCode(65 + index);
          
          const isSelected = q.multiple
            ? (data[q.key] || []).includes(opt)
            : data[q.key] === opt;

          return (
            <label
              key={opt}
              className={`${styles.optionButton} ${
                isSelected ? styles.selectedOption : ""
              }`}
              // REMOVI O ONCLICK DAQUI (causava o problema de duplo clique)
              role="button"
              aria-pressed={isSelected}
            >
              <input
                type={q.multiple ? "checkbox" : "radio"}
                name={q.key}
                value={opt}
                checked={isSelected}
                // O evento fica apenas aqui no input
                onChange={() => handleOption(q.key, opt, q.multiple)}
                style={{ display: "none" }}
              />
              <span className={styles.optionLetter}>{letter}</span>
              <span className={styles.optionLabel}>{opt}</span>
              {q.multiple && isSelected && (
                <span style={{ marginLeft: "auto", fontWeight: "bold" }}>✓</span>
              )}
            </label>
          );
        })}

      {/* INPUT EXTRA: ID DO ANIMAL */}
      {showIdAnimalInput && (
        <input
          type="text"
          className={styles.inputFinal}
          placeholder="Qual o ID ou nome do animal?"
          value={data.idAnimal ?? ""}
          onChange={(e) => onAnswer({ idAnimal: e.target.value })}
          style={{ marginTop: "1rem", width: "100%" }}
        />
      )}

      {/* INPUTS DE TEXTO COMPOSTOS */}
      {q.type === "text" && q.options && (
        <div className={styles.multiTextContainer}>
          {q.options.map((placeholder) => {
            const isQuantidade = placeholder === "Quantidade";
            return (
              <input
                key={placeholder}
                type="text"
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

      {/* INPUT DE TEXTO ÚNICO */}
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