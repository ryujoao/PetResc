import { useEffect } from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
  data: any;
  onChange: (p: Partial<any>) => void;
  setCanProceed: (v: boolean) => void;
};

export default function StepPersonal({ data, onChange, setCanProceed }: Props) {
  useEffect(() => setCanProceed(true), [setCanProceed]);

  return (
    <section className={styles.stepSection}>
      <div className={styles.twoColumns}>
        <div>
          <label className={styles.label}>Nome Completo</label>
          <input
            className={styles.input}
            value={data.nome}
            onChange={(e) => onChange({ nome: e.target.value })}
          />

          <label className={styles.label}>CPF</label>
          <input className={styles.input} />

          <label className={styles.label}>Data de nascimento</label>
          <input className={styles.input} type="date" />

          <label className={styles.label}>Telefone</label>
          <input
            className={styles.input}
            value={data.telefone}
            onChange={(e) => onChange({ telefone: e.target.value })}
          />

          <label className={styles.label}>E-mail</label>
          <input
            className={styles.input}
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>

        <div>
          <label className={styles.label}>Estado</label>
          <input
            className={styles.input}
            value={data.estado}
            onChange={(e) => onChange({ estado: e.target.value })}
          />

          <label className={styles.label}>Cidade</label>
          <input
            className={styles.input}
            value={data.cidade}
            onChange={(e) => onChange({ cidade: e.target.value })}
          />

          <label className={styles.label}>CEP</label>
          <input
            className={styles.input}
            value={data.cep}
            onChange={(e) => onChange({ cep: e.target.value })}
          />

          <label className={styles.label}>Rua / Avenida</label>
          <input
            className={styles.input}
            value={data.rua}
            onChange={(e) => onChange({ rua: e.target.value })}
          />

          <label className={styles.label}>Bairro</label>
          <input
            className={styles.input}
            value={data.bairro}
            onChange={(e) => onChange({ bairro: e.target.value })}
          />
          <div className={styles.row}>
            <div style={{ flex: 1 }}>
              <label className={styles.label}>Número</label>
              <input
                className={styles.input}
                value={data.numero}
                onChange={(e) => onChange({ numero: e.target.value })}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label className={styles.label}>Complemento</label>
              <input
                className={styles.input}
                value={data.complemento}
                onChange={(e) => onChange({ complemento: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
