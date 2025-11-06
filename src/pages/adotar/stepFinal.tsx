import React from "react";
import styles from "./formularioAdotar.module.css";
// Importe o tipo de dados que você acabou de exportar
import type { FormData } from "./formularioAdotar";

// Componente auxiliar para renderizar cada item da lista
// (Definido fora para ser mais limpo)
const ReviewItem = ({ label, value }: { label: string; value?: string | null }) => {
  // Não renderiza o item se o valor for nulo, indefinido ou vazio
  if (!value) {
    return null;
  }
  
  return (
    <div className={styles.reviewItem}>
      <span className={styles.reviewLabel}>{label}</span>
      <span className={styles.reviewValue}>{value}</span>
    </div>
  );
};

// Props agora espera receber 'data'
type Props = {
  data: FormData;
};

export default function StepFinal({ data }: Props) {
  
  // Função para o botão "Revisar dados" rolar a tela
  const handleReviewClick = () => {
    document.getElementById("review-list")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    // section não precisa mais do stepSection, pois o header já centraliza
    <section> 
      <div className={styles.finalHeader}>
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

        <h2 className={styles.finalTitle}>Tudo pronto!</h2>

        <p className={styles.finalSubtitle}>
          Revise seus dados. Se estiver tudo certo, basta clicar em "Enviar" no
          final da página.
        </p>

        {/* Botão agora rola a tela para a lista de revisão */}
        <button
          type="button"
          className={styles.finalReviewButton}
          onClick={handleReviewClick}
        >
          Revisar dados
        </button>
      </div>

      <hr className={styles.finalDivider} />

      {/* --- LISTA DE REVISÃO DOS DADOS --- */}
      <div className={styles.reviewContainer} id="review-list">
        <h2 className={styles.reviewTitle}>Seus Dados</h2>

        <div className={styles.reviewList}>
          {/* Dados Pessoais */}
          <h3 className={styles.reviewSubheader}>Informações Pessoais</h3>
          <ReviewItem label="Nome Completo" value={data.nome} />
          <ReviewItem label="Email" value={data.email} />
          <ReviewItem label="Telefone" value={data.telefone} />

          {/* Endereço */}
          <h3 className={styles.reviewSubheader}>Endereço</h3>
          <ReviewItem label="CEP" value={data.cep} />
          <ReviewItem label="Rua" value={data.rua} />
          <ReviewItem label="Número" value={data.numero} />
          <ReviewItem label="Complemento" value={data.complemento} />
          <ReviewItem label="Bairro" value={data.bairro} />
          <ReviewItem label="Cidade" value={data.cidade} />
          <ReviewItem label="Estado" value={data.estado} />

          {/* Sobre o Espaço */}
          <h3 className={styles.reviewSubheader}>Sobre o Espaço</h3>
          <ReviewItem label="Tipo de moradia" value={data.tipoMoradia} />
          <ReviewItem label="Possui quintal?" value={data.quintal} />
          <ReviewItem label="Sua moradia é..." value={data.tipoMoradiaChoice} />
          
          {/* Preferências */}
          <h3 className={styles.reviewSubheader}>Preferências</h3>
          <ReviewItem label="Portes que aceita" value={data.portesAceitos} />
          <ReviewItem label="Animais que aceita" value={data.animaisAceitos} />
          <ReviewItem label="Já viu o pet?" value={data.jaViuPet} />

          {/* Recursos & Lar */}
          <h3 className={styles.reviewSubheader}>Recursos e Lar</h3>
          <ReviewItem label="Tipo de pet preferido" value={data.qualTipoPet} />
          <ReviewItem label="Prefere..." value={data.preferenciaPet} />
          <ReviewItem label="Pessoas no lar" value={data.pessoasNoLar} />
          <ReviewItem label="Alguém alérgico?" value={data.alergia} />
          
          {/* Adicione aqui os outros campos do seu 'data' se necessário */}
          
        </div>
      </div>
    </section>
  );
}