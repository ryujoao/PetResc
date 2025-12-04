import styles from "./formularioAdotar.module.css";
// Certifique-se de que o caminho do import está correto para o seu projeto
import type { FormData } from "./formularioAdotar";
import { BsCheckCircleFill } from "react-icons/bs";

// Componente auxiliar para renderizar cada item da lista
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

type Props = {
  data: FormData;
};

export default function StepFinal({ data }: Props) {
  
  const handleReviewClick = () => {
    document.getElementById("review-list")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const formatOutrosAnimais = () => {
    if (
      data.outrosAnimaisLocal && 
      data.outrosAnimaisLocal.Quantidade && 
      data.outrosAnimaisLocal.Quantidade !== "0"
    ) {
        return `${data.outrosAnimaisLocal.Quantidade} - ${data.outrosAnimaisLocal["Tipo de Animal"] || ''}`;
    }
    return "Não possui";
  };

  // --- NOVA FUNÇÃO AUXILIAR ---
  // Se for uma lista (Array), junta com vírgulas. Se for texto, devolve o texto.
  const formatValue = (val: string | string[] | undefined | null): string => {
    if (Array.isArray(val)) {
      return val.join(", "); // Ex: "Gato, Cachorro"
    }
    return val || ""; // Retorna o valor ou string vazia se for null/undefined
  };

  return (
    <section> 
      <div className={styles.finalHeader}>
        <BsCheckCircleFill className={styles.finalIcon} />

        <h2 className={styles.finalTitle}>Tudo pronto!</h2>

        <p className={styles.finalSubtitle}>
          Revise seus dados abaixo.
        </p>

        <button
          type="button"
          className={styles.finalReviewButton}
          onClick={handleReviewClick}
        >
          Revisar dados enviados
        </button>
      </div>

      <hr className={styles.finalDivider} />

      {/* --- LISTA DE REVISÃO DOS DADOS --- */}
      <div className={styles.reviewContainer} id="review-list">
        <h2 className={styles.reviewTitle}>Resumo do Pedido</h2>

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
          <ReviewItem label="Tipo de moradia" value={data.tipoMoradiaChoice || data.tipoMoradia} />
          <ReviewItem label="Possui quintal?" value={data.quintal} />
          
          {/* Preferências - AQUI USAMOS A NOVA FUNÇÃO */}
          <h3 className={styles.reviewSubheader}>Preferências</h3>
          <ReviewItem label="Portes que aceita" value={formatValue(data.portesAceitos)} />
          <ReviewItem label="Animais que aceita" value={formatValue(data.animaisAceitos)} />
          <ReviewItem label="Já viu o pet?" value={data.jaViuPet} />

          {/* Recursos & Lar */}
          <h3 className={styles.reviewSubheader}>Recursos e Lar</h3>
          <ReviewItem label="Tipo de pet preferido" value={formatValue(data.qualTipoPet)} />
          <ReviewItem label="Prefere..." value={data.preferenciaPet} />
          <ReviewItem label="Pessoas no lar" value={data.pessoasNoLar} />
          <ReviewItem label="Alguém alérgico?" value={data.alergia} />
          
          <ReviewItem label="Outros animais" value={formatOutrosAnimais()} />
          
        </div>
      </div>
    </section>
  );
}