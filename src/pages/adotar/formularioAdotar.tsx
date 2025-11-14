import React, { useState } from "react"; 
import styles from "./formularioAdotar.module.css";
import Layout from "../../components/layout"; 
import Sucesso from "../../components/sucesso";
import StepIntro from "./stepIntro";
import StepPersonal from "./stepPersonal";
import StepQuestionsGroup from "./stepQuestionsGroup";
import StepFinal from "./stepFinal";
import StepTermo from "./stepTermo";
import { IconWrap } from "../../components/icons";

export type FormData = {
  nome: string;
  email: string;
  telefone: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  estado?: string;
  cidade?: string;
  tipoMoradia: string;
  quintal: string;
  tipoMoradiaChoice?: string;
  portesAceitos?: string;
  animaisAceitos?: string;
  jaViuPet?: string;
  qualTipoPet?: string;
  preferenciaPet?: string;
  pessoasNoLar?: string;
  outrosAnimaisLocal?: {
    Quantidade: string;
    "Tipo de Animal": string;
  };
  alergia?: string;
  aceitaTermo?: boolean;
};

export default function FormularioAdotar() {
  
  const [sucessoOpen, setSucessoOpen] = useState(false);
  const [majorStep, setMajorStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [canProceed, setCanProceed] = useState(true);
  const [data, setData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    estado: "",
    cidade: "",
    tipoMoradia: "",
    quintal: "",
    aceitaTermo: false,
  });

  const majorSteps = [
    { id: 0, title: "Introdução", pages: 1 },
    { id: 1, title: "Informações Pessoais", pages: 1 },
    { id: 2, title: "Sobre espaço", pages: 3 },
    { id: 3, title: "Preferências", pages: 3 },
    { id: 4, title: "Recursos & Lar", pages: 3 },
    { id: 5, title: "Termo de Responsabilidade", pages: 1 },
    { id: 6, title: "Concluído", pages: 1 },
  ];

  const update = (patch: Partial<FormData>) =>
    setData((d) => ({ ...d, ...patch }));

  const goNext = () => {
    if (!canProceed) return;
    const block = majorSteps[majorStep];
    if (subStep < block.pages - 1) {
      setSubStep((s) => s + 1);
    } else {
      if (majorStep < majorSteps.length - 1) {
        setMajorStep((m) => m + 1);
        setSubStep(0);
      } else {
        handleSubmit();
      }
    }
    setCanProceed(true);
  };

  const goPrev = () => {
    if (subStep > 0) {
      setSubStep((s) => s - 1);
    } else if (majorStep > 0) {
      const prevBlock = majorSteps[majorStep - 1];
      setMajorStep((m) => m - 1);
      setSubStep(prevBlock.pages - 1);
    }
    setCanProceed(true);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!data.aceitaTermo) {
      alert("Você precisa aceitar o termo para finalizar.");
      return;
    }
    console.log("Enviar dados:", data);
    setSucessoOpen(true);
  };

  const progressPercent = (majorStep / (majorSteps.length - 1)) * 100;

  const renderCurrent = () => {
    switch (majorStep) {
      case 0:
        return <StepIntro onChange={update} setCanProceed={setCanProceed} />;
      case 1:
        return (
          <StepPersonal
            data={data}
            onChange={update}
            setCanProceed={setCanProceed}
          />
        );
      case 2:
        return (
          <StepQuestionsGroup
            groupId={2}
            subStep={subStep}
            onAnswer={update}
            data={data}
          />
        );
      case 3:
        return (
          <StepQuestionsGroup
            groupId={3}
            subStep={subStep}
            onAnswer={update}
            data={data}
          />
        );
      case 4:
        return (
          <StepQuestionsGroup
            groupId={4}
            subStep={subStep}
            onAnswer={update}
            data={data}
          />
        );
      case 5:
        return (
          <StepTermo
            data={data}
            onChange={update}
            setCanProceed={setCanProceed}
          />
        );
      case 6:
        return <StepFinal data={data} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      
      <div className={styles.pageFormularioAdotar}>
        
        <div className={`${styles.barraProgresso} topBar`}>
          <div className={styles.progressoContainer}>
            <div className={styles.progressoLinha} />
            <div
              className={styles.progressoPreenchido}
              style={{ width: `${progressPercent}%` }}
            />
            <div className={styles.steps}>
              {majorSteps.map((s, i) => {
                const state =
                  i < majorStep ? "done" : i === majorStep ? "active" : "idle";
                const stateClass =
                  state === "done"
                    ? styles.done
                    : state === "active"
                    ? styles.active
                    : styles.idle;
                return (
                  <div key={s.id} className={`${styles.step} ${stateClass}`}>
                    <div className={styles.iconWrap} aria-hidden>
                      <IconWrap state={state} />
                    </div>
                    <div className={styles.stepTitle}>{s.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <main
          className={`${styles.conteudo} ${
            majorStep === 5 ? styles.conteudoFullWidth : ""
          }`}
        >
          {majorStep === 0 && subStep === 0 && (
            <h1 className={styles.titulo}>Formulário de Interesse em Adoção</h1>
          )}
          
          {majorStep === 0 && subStep === 0 && (
            <p className={styles.introducaoFormulario}>
              Bem-vindo(a) ao nosso Formulário de Interesse. Ficamos muito
              felizes por você ter dado o primeiro passo para adotar um pet.
              Aqui você irá responder algumas perguntas iniciais para que a
              ONG/protetor parceiro possa te conhecer melhor e dar agilidade ao
              processo de adoção. Precisaremos de alguns dados pessoais para que
              possamos entrar em contato com você, além de saber um pouco sobre
              a sua casa, sua família e estrutura.
            </p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              goNext();
            }}
            className={styles.form}
          >
            {renderCurrent()}
            
            <div className={styles.controls}>
              <button
                type="button"
                onClick={goPrev}
                disabled={majorStep === 0 && subStep === 0}
                className={styles.botoesVoltar}
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={goNext}
                className={styles.botoesAvancar}
                disabled={!canProceed}
              >
                {majorStep === majorSteps.length - 1 &&
                subStep === majorSteps[majorStep].pages - 1
                  ? "Enviar"
                  : "Próximo"}
              </button>
            </div>
          </form>
        </main>
      </div>
      
      <Sucesso isOpen={sucessoOpen} onClose={() => setSucessoOpen(false)} />
    </Layout>
  );
}