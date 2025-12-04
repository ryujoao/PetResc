import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../config.module.css"; 
import { BsChevronRight } from "react-icons/bs";

interface QuestionItem {
  text: string;
  path?: string;
}

interface FAQItem {
  category: string;
  questions: QuestionItem[];
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      category: "Conta e acesso",
      questions: [
        { text: "Como criar uma conta no app/site?" },
        { text: "Esqueci minha senha, como recuperar?" },
        { text: "Posso alterar meus dados pessoais?" },
      ],
    },
    {
      category: "Cadastro de ONGs",
      questions: [
        { text: "Como cadastrar minha ONG?" },
        { text: "Documentação necessária" },
        { text: "Atualizar dados da organização" },
      ],
    },
    {
      category: "Cadastro de animais",
      questions: [
        { text: "Registrar um animal para adoção" },
        { text: "Editar fotos do animal" },
        { text: "Marcar como adotado" },
      ],
    },
    {
      category: "Adoção e doação",
      questions: [
        { text: "Requisitos para adotar" },
        { text: "Processo de doação" },
      ],
    },
    {
      category: "Notificações e alertas",
      questions: [
        { text: "Ativar alertas de novos pets" },
        { text: "Configurar e-mails" },
      ],
    },
    {
      category: "Suporte e contato",
      questions: [
        { text: "Horários de atendimento" },
        { text: "Preencher formulário de contato", path: "/config/contate-nos" }, 
        { text: "Enviar e-mail para o suporte" },
      ],
    },
    {
      category: "Segurança e privacidade",
      questions: [
        { text: "Segurança dos dados" },
        { text: "Política de privacidade" },
      ],
    },
  ];

  return (
    <div className={styles.configContainer}>
      
      <h1 className={styles.titulo}>FAQ</h1>

      <div className={styles.wideSection}>
        {faqData.map((item, index: number) => {
          const isOpen = openIndex === index;

          return (
            <div key={index}>
              <button
                className={styles.configItem}
                onClick={() => toggleAccordion(index)}
              >
                <span className={styles.itemTexto}>{item.category}</span>
                <BsChevronRight 
                  className={isOpen ? styles.setaRotated : styles.seta} 
                />
              </button>

              <div
                className={`${styles.faqContent} ${
                  isOpen ? styles.faqContentOpen : ""
                }`}
              >
                <ul className={styles.faqList}>
                  {item.questions.map((question, qIndex: number) => (
                    <li key={qIndex} className={styles.faqListItem}>
                      {question.path ? (
                        <Link to={question.path}>
                          {question.text}
                        </Link>
                      ) : (
                        question.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}