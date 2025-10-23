import React, { useState, useLayoutEffect, useRef } from "react";
import styles from "./formularioAdotar.module.css";
import Nav from "../../components/navbar";
import Footer from "../../components/footer";
import Sucesso from "../../components/sucesso";
import StepIntro from "./stepIntro";
import StepPersonal from "./stepPersonal";
import StepQuestionsGroup from "./stepQuestionsGroup";
import StepFinal from "./stepFinal";

type FormData = {
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
  outrosAnimaisLocal?: string;
  alergia?: string;
  aceitaTermo?: boolean;
};

export default function FormularioAdotar() {
  const pageRef = useRef<HTMLDivElement | null>(null);
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

  useLayoutEffect(() => {
    setTimeout(() => {
      const pageEl = pageRef.current;
      if (!pageEl) return;
      const topBar = document.querySelector(".topBar") as HTMLElement | null;
      const navBar = document.querySelector(".navbar") as HTMLElement | null;
      const topHeight = topBar?.offsetHeight ?? 0;
      const navHeight = navBar?.offsetHeight ?? 0;
      const totalHeight = topHeight + navHeight;
      pageEl.style.paddingTop = `${totalHeight}px`;
      pageEl.style.minHeight = `calc(100vh - ${totalHeight}px)`;
    }, 0);
  }, []);

  const majorSteps = [
    { id: 0, title: "Intro", pages: 1 },
    { id: 1, title: "Pessoais", pages: 1 },
    { id: 2, title: "Sobre espaço", pages: 3 },
    { id: 3, title: "Preferências", pages: 3 },
    { id: 4, title: "Recursos & Lar", pages: 3 },
    { id: 5, title: "Final", pages: 2 },
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
            data={data} // <-- MUDANÇA AQUI
          />
        );
      case 3:
        return (
          <StepQuestionsGroup
            groupId={3}
            subStep={subStep}
            onAnswer={update}
            data={data} // <-- MUDANÇA AQUI
          />
        );
      case 4:
        return (
          <StepQuestionsGroup
            groupId={4}
            subStep={subStep}
            onAnswer={update}
            data={data} // <-- MUDANÇA AQUI
          />
        );
      case 5:
        return (
          <StepFinal
            data={data}
            onChange={update}
            setCanProceed={setCanProceed}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* ... (O resto do seu componente Nav, Footer, barra de progresso, etc. continua igual) ... */}
      <Nav />
      <div ref={pageRef} className={styles.pageFormularioAdotar}>
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
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        {state === "done" && (
                          <path
                            d="M7 12l3 3 7-7"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            fill="none"
                          />
                        )}
                        {state === "active" && (
                          <circle cx="12" cy="12" r="4" fill="currentColor" />
                        )}
                      </svg>
                    </div>
                    <div className={styles.stepTitle}>{s.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <main className={styles.conteudo}>
          {majorStep === 0 && subStep === 0 && (
            <h1 className={styles.titulo}>Formulário de Interesse em Adoção</h1>
          )}

          {/* introdução grande aparece apenas no primeiro bloco/subpasso */}
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

      <Footer />
      <Sucesso isOpen={sucessoOpen} onClose={() => setSucessoOpen(false)} />
    </>
  );
}