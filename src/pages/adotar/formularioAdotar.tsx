import React, { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./formularioAdotar.module.css";
import Layout from "../../components/layout"; 
import Sucesso from "../../components/sucesso";

// Importação dos passos do formulário
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

const progressIconStyle = { width: "20px", height: "20px" };

const IconWrap = ({ state }: IconWrapProps) => {
  switch (state) {
    case "done": return <FaRegCheckCircle style={progressIconStyle} />;
    case "active": return <FaRegDotCircle style={progressIconStyle} />;
    case "idle": default: return <FaRegCircle style={progressIconStyle} />;
  }
};

// --- TIPAGEM DOS DADOS ---
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
  
  // Campos extras para o backend
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
  const { user } = useAuth();

  // Tenta pegar o ID, mas não bloqueia se não achar agora
  const queryParams = new URLSearchParams(location.search);
  const animalId = location.state?.animalId || queryParams.get("animalId");

  const [sucessoOpen, setSucessoOpen] = useState(false);
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
    idAnimal: id || "", // Se tiver ID na URL, já começa preenchido
    jaViuPet: id ? "Sim, já vi" : "", // Se tem ID, a resposta é automaticamente Sim
  });

  // Preencher dados do usuário logado (Facilitador)
  useEffect(() => {
    if (user) {
      setData((prev) => ({
        ...prev,
        nome: user.nome || "",
        email: user.email || "",
        telefone: user.telefone || "",
      }));
    }
  }, [user]);

  

  const majorSteps = [
    { id: 0, title: "Introdução", pages: 1 },
    { id: 1, title: "Informações Pessoais", pages: 1 },
    { id: 2, title: "Sobre espaço", pages: 3 },
    { id: 3, title: "Preferências", pages: 3 },
    { id: 4, title: "Recursos & Lar", pages: 3 },
    { id: 5, title: "Termo de Responsabilidade", pages: 1 },
    { id: 6, title: "Concluído", pages: 1 },
  ];

  // --- BUSCA DADOS DO USUÁRIO (Autopreenchimento) ---
  useEffect(() => {
    async function carregarPerfil() {
      // Se não tiver usuário logado, para o loading e deixa o form vazio
      if (!user || !token) {
        setLoadingDados(false);
        return;
      }

      try {
        // Tenta buscar o perfil completo salvo no backend
        const response = await fetch("https://petresc.onrender.com/api/usuario/perfil-adocao", {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.ok) {
            const perfil = await response.json();
            // Mescla os dados salvos com o estado atual
            setData(prev => ({
                ...prev,
                nome: user.nome || prev.nome,
                email: user.email || prev.email,
                telefone: perfil.telefone || prev.telefone,
                cep: perfil.cep || prev.cep,
                rua: perfil.rua || prev.rua,
                numero: perfil.numero || prev.numero,
                complemento: perfil.complemento || prev.complemento,
                bairro: perfil.bairro || prev.bairro,
                cidade: perfil.cidade || prev.cidade,
                estado: perfil.estado || prev.estado,
                tipoMoradia: perfil.tipo_moradia || prev.tipoMoradia,
                quintal: perfil.quintal || prev.quintal,
                // Mantém o ID do animal que veio da URL ou do estado anterior
                idAnimal: id || prev.idAnimal
            }));
        } else {
            // Se não tem perfil salvo, preenche apenas o básico do login
            setData(prev => ({
                ...prev,
                nome: user.nome || "",
                email: user.email || "",
                idAnimal: id || prev.idAnimal
            }));
        }
      } catch (error) {
        console.log("Perfil não encontrado ou erro, seguindo com dados básicos.");
        setData(prev => ({
            ...prev,
            nome: user.nome || "",
            email: user.email || "",
            idAnimal: id || prev.idAnimal
        }));
      } finally {
        setLoadingDados(false);
      }
    }

    carregarPerfil();
  }, [user, token, id]); // Executa quando o usuário muda ou o ID da URL muda

  const update = (patch: Partial<FormData>) =>
    setData((d) => ({ ...d, ...patch }));

  const goNext = () => {
    if (!canProceed) return;
    const block = majorSteps[majorStep];
    
    // REMOVA OU COMENTE ESTE BLOCO ANTIGO:
    /* if (majorStep === majorSteps.length - 2 && subStep === block.pages - 1) {
        handleSubmit();
        return;
    } 
    */

    // LÓGICA PADRÃO (Apenas avança, o submit será chamado pelo botão no JSX)
    if (subStep < block.pages - 1) {
      setSubStep((s) => s + 1);
    } else {
      if (majorStep < majorSteps.length - 1) {
        setMajorStep((m) => m + 1);
        setSubStep(0);
      } else {
         // Se estivermos na ÚLTIMA etapa (StepFinal), aí sim envia
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

  // ENVIO DE DADOS PARA O BACKEND
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!data.aceitaTermo) {
      alert("Você precisa aceitar o termo para finalizar.");
      return;
    }

    // AQUI verificamos se temos o animalId. 
    // Como é um pedido de adoção, precisamos saber QUAL animal o usuário quer.
    if (!animalId) {
        alert("Erro: O sistema não identificou qual animal você quer adotar. Por favor, volte ao perfil do animal e clique em 'Quero Adotar' novamente.");
        return;
    }

    setIsSubmitting(true);

    try {
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
                observacoes: data.observacoes || ""
            }
        };

        console.log("Enviando pedido com dados do usuário:", payload);
        
        await api.post('/pedidos-adocao', payload);

        setSucessoOpen(true);
        // Avança visualmente para a etapa de "Concluído"
        setMajorStep(6); 
        setSubStep(0);

    } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        if (error instanceof AxiosError && error.response) {
            alert(error.response.data.error || "Erro ao processar pedido.");
        } else {
            alert("Erro de conexão ao enviar formulário.");
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  const progressPercent = (majorStep / (majorSteps.length - 1)) * 100;

  const renderCurrent = () => {
    switch (majorStep) {
      case 0:
        return <StepIntro data={data} onChange={update} setCanProceed={setCanProceed} />;
      case 1:
        return <StepPersonal data={data} onChange={update} setCanProceed={setCanProceed} />;
      case 2:
        return <StepQuestionsGroup groupId={2} subStep={subStep} onAnswer={update} data={data} />;
      case 3:
        return <StepQuestionsGroup groupId={3} subStep={subStep} onAnswer={update} data={data} />;
      case 4:
        return <StepQuestionsGroup groupId={4} subStep={subStep} onAnswer={update} data={data} />;
      case 5:
        return <StepTermo data={data} onChange={update} setCanProceed={setCanProceed} />;
      case 6:
        return <StepFinal data={data} />;
      default:
        return null;
    }
  };

  if (loadingDados) {
      return (
          <Layout>
              <div style={{ padding: '80px', textAlign: 'center', color: '#666' }}>
                  <h3>Carregando suas informações...</h3>
                  <p>Estamos buscando seu perfil para agilizar o processo.</p>
              </div>
          </Layout>
      );
  }

  return (
    <Layout>
      <div className={styles.pageFormulario}>
        
        {/* BANNER CONDICIONAL: Avisa o usuário o que ele está fazendo */}
        <div style={{
            backgroundColor: id ? '#e3f2fd' : '#fef9e7', // Azul se tem animal, Amarelo se é geral
            padding: '12px', 
            textAlign: 'center', 
            color: id ? '#2b6b99' : '#b58900',
            borderBottom: '1px solid #ddd',
            fontSize: '0.95rem',
            fontWeight: 600
        }}>
            {id ? (
                <>🐾 Você está solicitando a adoção para o animal <strong>#{id}</strong></>
            ) : (
                <>📋 Formulário de Cadastro Geral (Banco de Adotantes)</>
            )}
        </div>

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
                const stateClass =
                  state === "done" ? styles.done : state === "active" ? styles.active : styles.idle;
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

        <main className={`${styles.conteudo} ${majorStep === 6 ? styles.conteudoFullWidth : ""}`}>
          {majorStep === 0 && subStep === 0 && (
            <h1 className={styles.titulo}>
                {id ? "Finalizar Pedido de Adoção" : "Cadastro de Interesse em Adoção"}
            </h1>
          )}
          
          {majorStep === 0 && subStep === 0 && (
            <p className={styles.introducaoFormulario}>
              Bem-vindo(a) ao nosso Formulário de Interesse. Ficamos muito
              felizes por você ter dado o primeiro passo para adotar um pet...
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
            
            {/* CONTROLES (BOTÕES) */}
            {majorStep < 6 && ( // Esconde botões na etapa Final (Concluído)
                <div className={styles.controls}>
                <button
                    type="button"
                    onClick={goPrev}
                    disabled={majorStep === 0 && subStep === 0}
                    className={styles.botoesVoltar}
                >
                    Voltar
                </button>
                
                {/* Botão Próximo / Enviar */}
                <button
                    type="button"
                    onClick={goNext}
                    className={styles.botoesAvancar}
                    disabled={!canProceed || isSubmitting}
                >
                    {isSubmitting ? "Enviando..." : (
                        majorStep === 5 ? "Enviar" : "Próximo"
                    )}
                </button>
                </div>
            )}
          </form>
        </main>
      </div>
      
      <Sucesso 
        isOpen={sucessoOpen} 
        onClose={() => { 
            setSucessoOpen(false); 
            navigate('/central-adocao'); 
        }} 
      />
    </Layout>
  );
}