import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../config.module.css";
import { BsChevronRight } from "react-icons/bs";

interface QuestionItem {
  text: string;
  path?: string;
  answer?: string;
}

interface FAQItem {
  category: string;
  questions: QuestionItem[];
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openQuestionKey, setOpenQuestionKey] = useState<string | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    setOpenQuestionKey(null);
  };

  const toggleQuestion = (catIndex: number, qIndex: number) => {
    const key = `${catIndex}-${qIndex}`;
    setOpenQuestionKey(openQuestionKey === key ? null : key);
  };

  const faqData: FAQItem[] = [
    {
      category: "Conta e acesso",
      questions: [
        {
          text: "Como criar uma conta no app/site?",
          answer:
            "Clique em 'Cadastro' no menu, escolha 'Sou uma Pessoa' ou 'Sou uma ONG' e preencha os campos obrigatórios. Após confirmação você poderá fazer login imediatamente."
        },
        {
          text: "Esqueci minha senha, como recuperar?",
          answer:
            "Use 'Recuperar senha' na tela de login, informe o e‑mail cadastrado e siga as instruções enviadas por e‑mail para redefinir sua senha."
        },
        {
          text: "Posso alterar meus dados pessoais?",
          answer:
            "Sim. Acesse Configurações > Conta para editar nome, e‑mail, telefone e endereço. Algumas alterações podem exigir confirmação via e‑mail."
        }
      ]
    },
    {
      category: "Cadastro de ONGs",
      questions: [
        {
          text: "Como cadastrar minha ONG?",
          answer:
            "No Cadastro escolha 'Sou uma ONG' e informe dados do responsável, CNPJ, descrição e endereço. O cadastro pode passar por validação antes da ativação pública."
        },
        {
          text: "Documentação necessária",
          answer:
            "Geralmente são solicitados CNPJ e comprovante de endereço da ONG; documentos do responsável podem ser pedidos para verificação."
        },
        {
          text: "Atualizar dados da organização",
          answer:
            "Em Configurações > Conta/ONG você pode editar as informações da ONG. Salve e aguarde a atualização no perfil público."
        }
      ]
    },
    {
      category: "Cadastro de animais",
      questions: [
        {
          text: "Registrar um animal para adoção",
          answer:
            "Vá em 'Registrar animal' no painel da ONG (ou em 'Meu Perfil' se autorizado), preencha nome, idade, sexo, raça, descrição e adicione fotos."
        },
        {
          text: "Editar fotos do animal",
          answer:
            "Abra o perfil do animal em Gerenciar > Meus Animais e use 'Editar' para adicionar/remover/reordenar fotos. Fotos de qualidade ajudam na adoção."
        },
        {
          text: "Marcar como adotado",
          answer:
            "No registro do animal mude o status para 'Adotado'. O perfil será arquivado e removido das listagens públicas de adoção."
        }
      ]
    },
    {
      category: "Adoção e doação",
      questions: [
        {
          text: "Requisitos para adotar",
          answer:
            "Os requisitos variam por ONG: podem incluir entrevista, comprovante de residência e disponibilidade para visitas. Verifique o anúncio específico."
        },
        {
          text: "Processo de doação",
          answer:
            "Para doar, entre em contato com a ONG pelo perfil do animal ou formulário de contato. A ONG orientará sobre logística e documentação."
        }
      ]
    },
    {
      category: "Notificações e alertas",
      questions: [
        {
          text: "Ativar alertas de novos pets",
          answer:
            "Em Configurações > Notificações ative alertas e selecione filtros (raça, porte, local). Receba notificações quando novos pets correspondentes forem cadastrados."
        },
        {
          text: "Configurar e-mails",
          answer:
            "No mesmo painel você pode escolher receber notificações por e‑mail sobre mensagens, novas publicações e comunicados das ONGs."
        }
      ]
    },
    {
      category: "Suporte e contato",
      questions: [
        {
          text: "Horários de atendimento",
          path: "/config/contate-nos",
          answer:
            "Nosso suporte atende em horário comercial (dias úteis). Consulte a página de contato para horários atualizados e canais disponíveis."
        },
        {
          text: "Preencher formulário de contato",
          path: "/config/contate-nos",
          answer:
            "Acesse Configurações > Ajuda > Contate‑nos, preencha o formulário com detalhes do seu caso e aguarde resposta por e‑mail."
        },
        {
          text: "Enviar e-mail para o suporte",
          answer:
            "Se preferir, envie um e‑mail para o endereço disponível na página de contato com seu nome, e‑mail cadastrado e descrição do problema."
        }
      ]
    },
    {
      category: "Segurança e privacidade",
      questions: [
        {
          text: "Segurança dos dados",
          answer:
            "Utilizamos conexões seguras (HTTPS) e boas práticas de armazenamento de senhas. Dados sensíveis não são exibidos publicamente sem necessidade."
        },
        {
          text: "Política de privacidade",
          answer:
            "A política completa está em Configurações > Privacidade. Lá explicamos quais dados coletamos e como são usados; entre em contato para dúvidas."
        }
      ]
    }
  ];

  return (
    <div className={styles.configContainer}>
      <h1 className={styles.titulo}>FAQ</h1>

      <div className={styles.wideSection}>
        {faqData.map((item, index: number) => {
          const isOpen = openIndex === index;

          return (
            <div key={index}>
              <div
                className={styles.configItem}
                onClick={() => toggleAccordion(index)}
                role="button"
                aria-expanded={isOpen}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <span className={styles.itemTexto}>{item.category}</span>
                <BsChevronRight className={isOpen ? styles.setaRotated : styles.seta} />
              </div>

              <div className={`${styles.faqContent} ${isOpen ? styles.faqContentOpen : ""}`}>
                <ul className={styles.faqList}>
                  {item.questions.map((question, qIndex: number) => {
                    const qKey = `${index}-${qIndex}`;
                    const isQOpen = openQuestionKey === qKey;

                    return (
                      <li key={qIndex} className={styles.faqListItem}>
                        {/* texto simples (não botão) */}
                        <div
                          onClick={() => {
                            // se existe path, não sobrescreve navegação — apenas mostra link
                            if (!question.path) toggleQuestion(index, qIndex);
                          }}
                          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                        >
                          {question.path ? (
                            <Link to={question.path} style={{ color: "inherit", textDecoration: "underline" }}>
                              {question.text}
                            </Link>
                          ) : (
                            <span>{question.text}</span>
                          )}
                        </div>

                        {isQOpen && question.answer && (
                          <div className={styles.faqAnswer}>
                            <p>{question.answer}</p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}