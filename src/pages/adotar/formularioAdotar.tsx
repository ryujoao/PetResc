import React, { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./formularioAdotar.module.css";
import Layout from "../../components/layout"; 
import Sucesso from "../../components/sucesso";
import StepIntro from "./stepIntro";
import StepPersonal from "./stepPersonal";
import StepQuestionsGroup from "./stepQuestionsGroup";
import StepFinal from "./stepFinal";
import StepTermo from "./stepTermo";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api"; 
import { AxiosError } from "axios";

import { 
  FaRegCircle, 
  FaRegDotCircle, 
  FaRegCheckCircle 
} from "react-icons/fa";

type IconWrapProps = {
  state: "done" | "active" | "idle";
};

const progressIconStyle = {
  width: "20px",
  height: "20px",
};

const IconWrap = ({ state }: IconWrapProps) => {
  switch (state) {
    case "done":
      return <FaRegCheckCircle style={progressIconStyle} />;
    case "active":
      return <FaRegDotCircle style={progressIconStyle} />;
    case "idle":
    default:
      return <FaRegCircle style={progressIconStyle} />;
  }
};

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
  
  // Preferências e Perguntas
  tipoMoradia: string;
  quintal: string;
  tipoMoradiaChoice?: string;
  portesAceitos?: string[]; 
  animaisAceitos?: string[];
  jaViuPet?: string;
  idAnimal?: string;
  qualTipoPet?: string[];
  preferenciaPet?: string;
  pessoasNoLar?: string;
  outrosAnimaisLocal?: {
    Quantidade: string;
    "Tipo de Animal": string;
  };
  alergia?: string;
  
  // Termo e Legado
  aceitaTermo?: boolean;
  quintalTelado?: string;
  janelasTeladas?: string;
  moradiaPropria?: string;
  todosConcordam?: string;
  criancasEmCasa?: string;
  horasSozinho?: string;
  rotinaPasseios?: string;
  quemCuidara?: string;
  teveAnimaisAntes?: string;
  temVeterinario?: string;
  cienteCustos?: string;
  motivoAdocao?: string;
  observacoes?: string;
};

export default function FormularioAdotar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth(); 

  const queryParams = new URLSearchParams(location.search);
  const animalId = location.state?.animalId || queryParams.get("animalId");

  const [sucessoOpen, setSucessoOpen] = useState(false);
  // O estado msgSucesso agora será usado!
  const [msgSucesso, setMsgSucesso] = useState("Operação realizada com sucesso!");

  const [majorStep, setMajorStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [canProceed, setCanProceed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // --- 1. CARREGAR DADOS E PREENCHER AUTOMATICAMENTE ---
  useEffect(() => {
    const fetchDadosCompletos = async () => {
      if (!user?.id) return;

      try {
        const response = await api.get(`/usuarios/${user.id}`);
        const dadosSalvos = response.data;

        const safeJsonParse = (valor: any) => {
            try {
                return Array.isArray(valor) ? valor : JSON.parse(valor);
            } catch {
                return []; 
            }
        };

        const safeObjParse = (valor: any) => {
            try {
                return typeof valor === 'object' ? valor : JSON.parse(valor);
            } catch {
                return { Quantidade: "0", "Tipo de Animal": "" };
            }
        };

        setData((prev) => ({
          ...prev,
          nome: dadosSalvos.nome || user.nome || "",
          email: dadosSalvos.email || user.email || "",
          telefone: dadosSalvos.telefone || user.telefone || "",
          cep: dadosSalvos.cep || user.cep || "",
          rua: dadosSalvos.rua || user.rua || "",
          numero: dadosSalvos.numero || user.numero || "",
          complemento: dadosSalvos.complemento || user.complemento || "",
          bairro: dadosSalvos.bairro || user.bairro || "",
          cidade: dadosSalvos.cidade || user.cidade || "",
          estado: dadosSalvos.estado || user.estado || "",

          tipoMoradia: dadosSalvos.tipoMoradia || prev.tipoMoradia,
          tipoMoradiaChoice: dadosSalvos.tipoMoradia || prev.tipoMoradiaChoice,
          quintal: dadosSalvos.possuiQuintal === 'sim' ? 'sim' : 'nao',
          
          portesAceitos: safeJsonParse(dadosSalvos.portesAceitos),
          animaisAceitos: safeJsonParse(dadosSalvos.animaisAceitos),
          qualTipoPet: safeJsonParse(dadosSalvos.tipoPetInteresse),
          
          preferenciaPet: dadosSalvos.preferenciaSexo || prev.preferenciaPet,
          jaViuPet: dadosSalvos.idAnimalInteresse ? "Sim, já vi" : "Não, quero achar um",
          idAnimal: dadosSalvos.idAnimalInteresse || "",
          
          pessoasNoLar: dadosSalvos.pessoasNaCasa || "",
          alergia: dadosSalvos.alergias === 'sim' ? 'sim' : 'nao',
          
          outrosAnimaisLocal: safeObjParse(dadosSalvos.historicoAnimais),
          
          quintalTelado: dadosSalvos.quintalTelado,
          janelasTeladas: dadosSalvos.janelasTeladas,
          moradiaPropria: dadosSalvos.moradiaPropria,
          todosConcordam: dadosSalvos.todosConcordam,
          criancasEmCasa: dadosSalvos.criancasEmCasa,
          horasSozinho: dadosSalvos.horasSozinho,
          rotinaPasseios: dadosSalvos.rotinaPasseios,
          quemCuidara: dadosSalvos.quemCuidara,
          teveAnimaisAntes: dadosSalvos.teveAnimaisAntes,
          temVeterinario: dadosSalvos.temVeterinario,
          cienteCustos: dadosSalvos.cienteCustos,
          motivoAdocao: dadosSalvos.motivoAdocao,
          observacoes: dadosSalvos.observacoes,
        }));
        
        if (dadosSalvos.tipoMoradia && dadosSalvos.pessoasNaCasa) {
            setCanProceed(true);
        }

      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      }
    };

    fetchDadosCompletos();
  }, [user?.id]); 


  const majorSteps = [
    { id: 0, title: "Introdução", pages: 1 },
    { id: 1, title: "Informações Pessoais", pages: 1 },
    { id: 2, title: "Sobre espaço", pages: 3 },
    { id: 3, title: "Preferências", pages: 2 },
    { id: 4, title: "Recursos & Lar", pages: 3 },
    { id: 5, title: "Termo de Responsabilidade", pages: 1 },
    { id: 6, title: "Concluído", pages: 1 },
  ];

  const update = (patch: Partial<FormData>) =>
    setData((d) => ({ ...d, ...patch }));

  const goNext = () => {
    if (!canProceed) return;

    const block = majorSteps[majorStep];
    
    if (majorStep === 6) {
        handleSubmit();
        return;
    }

    if (subStep < block.pages - 1) {
      setSubStep((s) => s + 1);
    } else {
      if (majorStep < majorSteps.length - 1) {
        setMajorStep((m) => m + 1);
        setSubStep(0);
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

  // --- 2. LÓGICA INTELIGENTE DE ENVIO ---
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!data.aceitaTermo) {
      alert("Você precisa aceitar o termo para finalizar.");
      return;
    }

    setIsSubmitting(true);

    try {
        if (user?.id) {
            const dadosAtualizados = {
                nome: data.nome,
                telefone: data.telefone,
                cep: data.cep,
                rua: data.rua,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                cidade: data.cidade,
                estado: data.estado,
            };

            await api.put(`/usuarios/${user.id}`, dadosAtualizados);
            setUser({ ...user, ...dadosAtualizados });
        }

        if (animalId) {
            const payload = {
                animalId: parseInt(animalId),
                respostasFormulario: {
                    tipoMoradia: data.tipoMoradiaChoice || data.tipoMoradia || "Não informado",
                    possuiQuintal: data.quintal === 'sim' ? 'sim' : 'nao', 
                    quintalTelado: data.quintalTelado || 'nao',
                    janelasTeladas: data.janelasTeladas || 'nao',
                    moradiaPropria: data.moradiaPropria || 'nao',
                    pessoasNaCasa: data.pessoasNoLar || "1",
                    todosConcordam: data.todosConcordam || 'sim',
                    criancasEmCasa: data.criancasEmCasa || 'nao',
                    alergias: data.alergia === 'sim' ? 'sim' : 'nao',
                    horasSozinho: data.horasSozinho || "0",
                    rotinaPasseios: data.rotinaPasseios || "Não informado",
                    quemCuidara: data.quemCuidara || "Eu mesmo",
                    possuiOutrosAnimais: data.outrosAnimaisLocal?.Quantidade !== "0" && data.outrosAnimaisLocal?.Quantidade !== undefined ? 'sim' : 'nao',
                    historicoAnimais: JSON.stringify(data.outrosAnimaisLocal),
                    teveAnimaisAntes: data.teveAnimaisAntes || 'nao',
                    temVeterinario: data.temVeterinario || 'nao',
                    cienteCustos: data.cienteCustos || 'sim',
                    motivoAdocao: data.motivoAdocao || "Interesse em adoção",
                    observacoes: data.observacoes || "",
                    
                    portesAceitos: JSON.stringify(data.portesAceitos),
                    animaisAceitos: JSON.stringify(data.animaisAceitos),
                    tipoPetInteresse: JSON.stringify(data.qualTipoPet),
                    preferenciaSexo: data.preferenciaPet,
                    idAnimalInteresse: data.idAnimal
                }
            };

            await api.post('/pedidos-adocao', payload);
            setMsgSucesso("Pedido de adoção enviado com sucesso!");
        } else {
            setMsgSucesso("Suas preferências foram salvas! Agora você pode escolher um pet.");
        }

        setSucessoOpen(true);

    } catch (error) {
        console.error("Erro no envio:", error);
        if (error instanceof AxiosError && error.response) {
            alert(error.response.data.error || "Erro ao processar.");
        } else {
            alert("Erro de conexão.");
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  const progressPercent = (majorStep / (majorSteps.length - 1)) * 100;

  const renderCurrent = () => {
    switch (majorStep) {
      case 0: 
        return <StepIntro onChange={update} setCanProceed={setCanProceed} />;
      case 1: 
        return <StepPersonal data={data} onChange={update} setCanProceed={setCanProceed} />;
      case 2: 
        return <StepQuestionsGroup groupId={2} subStep={subStep} onAnswer={update} data={data} setCanProceed={setCanProceed} />;
      case 3: 
        return <StepQuestionsGroup groupId={3} subStep={subStep} onAnswer={update} data={data} setCanProceed={setCanProceed} />;
      case 4: 
        return <StepQuestionsGroup groupId={4} subStep={subStep} onAnswer={update} data={data} setCanProceed={setCanProceed} />;
      case 5: 
        return <StepTermo data={data} onChange={update} setCanProceed={setCanProceed} />;
      case 6: 
        return <StepFinal data={data} />;
      default: 
        return null;
    }
  };

  const getButtonText = () => {
    if (isSubmitting) return "Enviando...";
    if (majorStep === 6) {
        return animalId ? "Confirmar Pedido" : "Salvar Preferências";
    }
    return "Próximo";
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
                const state = i < majorStep ? "done" : i === majorStep ? "active" : "idle";
                const stateClass = state === "done" ? styles.done : state === "active" ? styles.active : styles.idle;
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

        <main className={`${styles.conteudo} ${majorStep === 5 || majorStep === 6 ? styles.conteudoFullWidth : ""}`}>
          {majorStep === 0 && subStep === 0 && (
            <>
                <h1 className={styles.titulo}>Formulário de Interesse</h1>
                <p className={styles.introducaoFormulario}>
                {animalId 
                    ? "Preencha seus dados para enviar o pedido de adoção." 
                    : "Preencha seus dados para agilizar suas futuras adoções."}
                </p>
            </>
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
                    disabled={!canProceed || isSubmitting}
                    style={{ opacity: !canProceed ? 0.5 : 1, cursor: !canProceed ? 'not-allowed' : 'pointer' }}
                >
                    {getButtonText()}
                </button>
            </div>
          </form>
        </main>
      </div>
      
      {/* --- AQUI ESTÁ A CORREÇÃO: Passamos a mensagem para o componente Sucesso --- */}
      <Sucesso 
        isOpen={sucessoOpen}
        mensagem={msgSucesso} 
        onClose={() => { 
            setSucessoOpen(false); 
            navigate(animalId ? '/' : '/central-adocao'); 
        }} 
      />
    </Layout>
  );
}