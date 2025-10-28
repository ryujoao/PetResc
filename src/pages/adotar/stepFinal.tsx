import React, { useEffect } from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
  data: any;
  onChange: (p: Partial<any>) => void;
  setCanProceed: (v: boolean) => void;
};

export default function StepFinal({ data, onChange, setCanProceed }: Props) {
  useEffect(
    () => setCanProceed(!!data.aceitaTermo),
    [data.aceitaTermo, setCanProceed]
  );

  return (
    // A classe .stepSection agora vai alinhar à esquerda por padrão
    <section className={styles.stepSection}>
      {/* --- MUDANÇA AQUI --- */}
      {/* Adicionamos um header centralizado para o conteúdo de "Tudo Pronto!" */}
      <div className={styles.finalHeader}>
        {/* Ícone de Check (como na imagem) */}
        <svg
          className={styles.finalIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="currentColor"
          />
        </svg>

        {/* Título (como na imagem) */}
        <h2 className={styles.finalTitle}>Tudo pronto!</h2>

        {/* Subtítulo (como na imagem) */}
        <p className={styles.finalSubtitle}>
          Revise seus dados e, se estiver tudo certo, aceite o termo de
          responsabilidade abaixo para finalizar.
        </p>

        {/* Botão (como na imagem) */}
        <button type="button" className={styles.finalReviewButton}>
          Revisar dados
        </button>
      </div>

      {/* Divisor (como na imagem) */}
      <hr className={styles.finalDivider} />
      {/* --- FIM DA MUDANÇA --- */}

      <h3 className={styles.finalTermTitle}>
        Termo de Responsabilidade de Adoção
      </h3>
      <p className={styles.termoText}>
        Ao adotar um animal por meio da plataforma PetControl, declaro estar
        ciente de que a adoção é um compromisso sério e de longo prazo. Assim,
        comprometo-me a:
        <br />
        <br />
        Oferecer alimentação, cuidados veterinários, abrigo seguro e carinho.
        Manter o animal vacinado, vermifugado e, quando necessário, castrado.
        Nunca praticar ou permitir maus-tratos, negligência ou abandono. Não
        vender, doar ou repassar o animal sem informar previamente a ONG.
        Permitir contatos da ONG para acompanhamento da adaptação. Reconhecer
        que o animal depende de mim e que sua guarda é de minha total
        responsabilidade.
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
