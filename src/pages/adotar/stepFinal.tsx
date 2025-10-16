import React, { useEffect } from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
  data: any;
  onChange: (p: Partial<any>) => void;
  setCanProceed: (v: boolean) => void;
};

export default function StepFinal({ data, onChange, setCanProceed }: Props) {
  useEffect(() => setCanProceed(!!data.aceitaTermo), [data.aceitaTermo, setCanProceed]);

  return (
    <section className={styles.stepSection}>
      <h3>Termo de Responsabilidade de Adoção</h3>
      <p className={styles.termoText}>
        Ao adotar um animal por nossa plataforma, declaro estar ciente de que a adoção é um compromisso sério e de longo prazo. (substitua pelo texto real)
      </p>

      <label className={styles.checkboxCustomizado}>
        <input
          type="checkbox"
          checked={!!data.aceitaTermo}
          onChange={(e) => onChange({ aceitaTermo: e.target.checked })}
        />
        <span className={styles.checkmark}></span>
        Li e aceito o Termo de Responsabilidade de Adoção.
      </label>
    </section>
  );
}