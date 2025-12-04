import React, { useEffect, useState } from "react";
import styles from "./formularioAdotar.module.css";

type Props = {
 data?: any; // <-- aceita data opcional
 onChange: (p: Partial<any>) => void;
 setCanProceed: (v: boolean) => void;
};

export default function StepIntro({ data, onChange, setCanProceed }: Props) {
 const [agreed, setAgreed] = useState(false);

 useEffect(() => {
  setCanProceed(agreed);
 }, [agreed, setCanProceed]);

 return (
  <section className={styles.stepIntroBox}>
   <p className={styles.introducaoCheckBox}>
    Aqui você iniciará o processo. Leia as informações e confirme o aceite
    para prosseguir.
   </p>

   <label className={styles.checkboxCustomizado}>
    <input
     type="checkbox"
     checked={agreed}
     onChange={(e) => {
      setAgreed(e.target.checked);
      onChange({});
     }}
    />
    <span className={styles.checkmark}></span>
        
        {/* Isto está correto. Mantenha o <span> ao redor do texto. */}
    <span>
     Declaro que sou maior de 18 anos, li e estou ciente das informações
     passadas e de acordo em compartilhar meus dados para fins de contato por
     uma ONG/protetor. Entendo que o formulário capta o interesse em ser
     contactado pela ONG/protetor parceiro para entrevista e não garante
     reserva do pet caso seja identificado como disponível.
    </span>
   </label>
  </section>
 );
}