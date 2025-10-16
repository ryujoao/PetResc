import React from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
  groupId: number;
  subStep: number;
  onAnswer: (p: Partial<any>) => void;
};

const groups: Record<number, { questions: { key: string; title: string; options?: string[]; type?: "options" | "text" }[] }> = {
  2: {
    questions: [
      { key: "tipoMoradiaChoice", title: "Tipo de moradia", options: ["Casa", "Apartamento", "Sítio", "Outro"], type: "options" },
      { key: "portesAceitos", title: "Quais portes são aceitos", options: ["Pequeno", "Médio", "Grande", "Todos"], type: "options" },
      { key: "animaisAceitos", title: "Quais animais são aceitos", options: ["Gato", "Cachorro", "Pássaros", "Todos"], type: "options" },
    ],
  },
  3: {
    questions: [
      { key: "jaViuPet", title: "Você já viu algum pet que tem interesse em adotar?", options: ["Sim, já vi", "Não, quero achar um"], type: "options" },
      { key: "qualTipoPet", title: "Qual tipo pet que tem interesse em adotar?", options: ["Cachorro", "Gato", "Pássaros"], type: "options" },
      { key: "preferenciaPet", title: "Qual a sua preferência que o pet seja:", options: ["Macho", "Fêmea", "Tanto faz"], type: "options" },
    ],
  },
  4: {
    questions: [
      { key: "pessoasNoLar", title: "Quantas pessoas moram no lar?", type: "text" },
      { key: "outrosAnimaisLocal", title: "Outros animais no local? (quantidade / tipo)", type: "text" },
      { key: "alergia", title: "Alguma pessoa com alergia?", options: ["Sim", "Não"], type: "options" },
    ],
  },
};

export default function StepQuestionsGroup({ groupId, subStep, onAnswer }: Props) {
  const group = groups[groupId];
  if (!group) return null;
  const q = group.questions[subStep];

  const handleOption = (key: string, value: string) => onAnswer({ [key]: value });

  return (
    <section className={styles.stepSection}>
      <h3 className={styles.questionTitle}>{q.title}</h3>

      {q.type === "options" && q.options?.map((opt) => (
        <label key={opt} className={styles.optionButton}>
          <input type="radio" name={q.key} onChange={() => handleOption(q.key, opt)} />
          <span className={styles.optionLabel}>{opt}</span>
        </label>
      ))}

      {q.type === "text" && (
        <textarea className={styles.input} rows={3} onChange={(e) => handleOption(q.key, e.target.value)} />
      )}
    </section>
  );
}