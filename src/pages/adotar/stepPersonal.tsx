import React, { useEffect, useRef } from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
  data: any;
  onChange: (p: Partial<any>) => void;
  setCanProceed: (v: boolean) => void;
};

export default function StepPersonal({ data, onChange, setCanProceed }: Props) {
  useEffect(() => setCanProceed(true), [setCanProceed]);

  // Cria referência para focar no número após buscar o CEP
  const numeroRef = useRef<HTMLInputElement>(null);

  // --- FUNÇÃO DE BUSCA DE CEP ---
  const buscarCep = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cepLimpo = e.target.value.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const json = await response.json();

      if (json.erro) {
        alert("CEP não encontrado.");
        return;
      }

      // Atualiza o estado pai com os dados do endereço
      onChange({
        rua: json.logradouro,
        bairro: json.bairro,
        cidade: json.localidade,
        estado: json.uf,
      });

      // Foca no campo número para facilitar para o usuário
      numeroRef.current?.focus();

    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

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
          <input 
            className={styles.input}
            value={data.cpf || ""} 
            onChange={(e) => onChange({ cpf: e.target.value })}
            placeholder="000.000.000-00"
          />

          <label className={styles.label}>Data de nascimento</label>
          <input 
            className={styles.input} 
            type="date" 
            value={data.dataNascimento || ""}
            onChange={(e) => onChange({ dataNascimento: e.target.value })}
          />

          <label className={styles.label}>Telefone</label>
          <input
            className={styles.input}
            value={data.telefone}
            onChange={(e) => onChange({ telefone: e.target.value })}
            placeholder="(00) 00000-0000"
          />

          <label className={styles.label}>E-mail</label>
          <input
            className={styles.input}
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="email@exemplo.com"
          />
        </div>

        <div>
          {/* Movi o CEP para cima para ficar mais lógico UX, 
              mas se preferir em baixo, a lógica funciona igual */}
          
          <label className={styles.label}>CEP</label>
          <input
            className={styles.input}
            value={data.cep}
            onChange={(e) => onChange({ cep: e.target.value })}
            onBlur={buscarCep} // <--- GATILHO DA BUSCA
            maxLength={9}
            placeholder="00000-000"
          />

          <label className={styles.label}>Estado</label>
          <input
            className={styles.input}
            value={data.estado}
            onChange={(e) => onChange({ estado: e.target.value })}
            readOnly // Opcional: Bloqueia edição manual se quiser forçar o CEP
          />

          <label className={styles.label}>Cidade</label>
          <input
            className={styles.input}
            value={data.cidade}
            onChange={(e) => onChange({ cidade: e.target.value })}
            readOnly // Opcional
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
                ref={numeroRef} // <--- REFERÊNCIA PARA O FOCUS
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