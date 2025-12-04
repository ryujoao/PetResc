import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./gerenciar.module.css";
import Layout from "../../components/layout";
import api from "../../services/api"; 
import { FaCheck, FaTimes, FaPaw, FaMapMarkerAlt, FaWhatsapp, FaArrowLeft } from "react-icons/fa";

// --- TIPAGEM DO QUE VEM DO BACKEND ---
export interface Formulario {
  id: number;
  pedidoAdocaoId: number;

  tipoMoradia: string;
  possuiQuintal: boolean;
  quintalTelado?: boolean;
  janelasTeladas?: boolean;
  moradiaPropria: boolean;

  pessoasNaCasa: number;
  todosConcordam: boolean;
  criancasEmCasa: boolean;
  alergias: boolean;

  horasSozinho: number;
  rotinaPasseios?: string;
  quemCuidara: string;

  possuiOutrosAnimais: boolean;
  historicoAnimais?: string;

  teveAnimaisAntes: boolean;
  temVeterinario?: boolean;

  cienteCustos: boolean;

  motivoAdocao: string;
  observacoes?: string;

 

  createdAt: string;
}

interface Candidato {
  id: number;
  status: string;
  dataPedido: string;
  account: {
    nome: string;
    email: string;
    telefone: string;

    // Endereço do usuário
    cep?: string;
    rua?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
  };
  formulario: Formulario | null;
}
interface Animal {
  id: number;
  nome: string;
  photoURL: string | null;
  status: string;
  raca: string;
  idade: number | null;
  sexo: string;
  porte: string;
  corPredominante: string;
  descricao: string;
  local_cidade?: string;
  local_estado?: string;
}

export default function GerenciarAdocao() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [selecionado, setSelecionado] = useState<Candidato | null>(null);
  const [loading, setLoading] = useState(true);

  // BUSCAR DADOS
  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        const resAnimal = await api.get(`/animais/${id}`);
        setAnimal(resAnimal.data);

        const resCandidatos = await api.get(`/pedidos-adocao/animal/${id}`);
        setCandidatos(resCandidatos.data);

        if (resCandidatos.data.length > 0) {
          setSelecionado(resCandidatos.data[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar gerenciamento:", error);
        alert("Erro ao carregar dados. Verifique se você é o dono deste animal.");
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, navigate]);

  // APROVAR
  const handleAprovar = async () => {
    if (!selecionado) return;

    if (window.confirm(`Tem certeza que deseja APROVAR a adoção para ${selecionado.account.nome}?`)) {
      try {
        await api.patch(`/pedidos-adocao/${selecionado.id}/status`, { status: 'APROVADO' });

        alert("Adoção Aprovada!");

        setCandidatos(prev =>
          prev.map(c => c.id === selecionado.id ? { ...c, status: 'APROVADO' } : c)
        );

        setSelecionado({ ...selecionado, status: 'APROVADO' });

        if (animal) setAnimal({ ...animal, status: 'ADOTADO' });

      } catch {
        alert("Erro ao aprovar pedido.");
      }
    }
  };

  // RECUSAR
  const handleRecusar = async () => {
    if (!selecionado) return;

    if (window.confirm(`Deseja recusar esta solicitação de ${selecionado.account.nome}?`)) {
      try {
        await api.patch(`/pedidos-adocao/${selecionado.id}/status`, { status: 'RECUSADO' });

        alert("Solicitação recusada.");

        setCandidatos(prev =>
          prev.map(c => c.id === selecionado.id ? { ...c, status: 'RECUSADO' } : c)
        );

        setSelecionado({ ...selecionado, status: 'RECUSADO' });

      } catch {
        alert("Erro ao recusar pedido.");
      }
    }
  };

  // WHATSAPP
  const handleWhatsApp = () => {
    if (!selecionado || !animal) return;

    const telefoneLimpo = selecionado.account.telefone.replace(/\D/g, '');
    const nomeCandidato = selecionado.account.nome;
    const nomePet = animal.nome;

    const texto = `Olá ${nomeCandidato}! Sou responsável pelo pet "${nomePet}" no PetResc.`;

    const numeroFinal = telefoneLimpo.length <= 11 ? `55${telefoneLimpo}` : telefoneLimpo;

    window.open(`https://api.whatsapp.com/send?phone=${numeroFinal}&text=${encodeURIComponent(texto)}`, '_blank');
  };

  // PARSE DE OUTROS ANIMAIS
  const formatOutrosAnimais = (jsonString?: string) => {
    if (!jsonString) return "Não informado";

    try {
      const obj = JSON.parse(jsonString);
      if (obj?.Quantidade && obj.Quantidade !== "0") {
        return `${obj.Quantidade} - ${obj["Tipo de Animal"]}`;
      }
      return "Não possui";
    } catch {
      return "Não informado";
    }
  };

  if (loading)
    return (
      <Layout>
        <div style={{ padding: "4rem", textAlign: "center" }}>
          Carregando gerenciamento...
        </div>
      </Layout>
    );

  if (!animal)
    return (
      <Layout>
        <div>Animal não encontrado.</div>
      </Layout>
    );

  const form = selecionado?.formulario;
  const usuario = selecionado?.account;

  return (
    <Layout>
      <div className={styles.pageContainer}>

        {/* Botão Voltar */}
        <button onClick={() => navigate(-1)} className={styles.btnVoltar}>
          <FaArrowLeft /> Voltar para lista
        </button>

        {/* CABEÇALHO DO ANIMAL */}
        <section className={styles.animalHeader}>
          <div className={styles.animalImageWrapper}>
            <img
              src={animal.photoURL || "https://placehold.co/300"}
              alt={animal.nome}
              className={styles.animalImg}
            />
          </div>

          <div className={styles.animalContent}>
            <div className={styles.animalTitleRow}>
              <h1 className={styles.animalName}>{animal.nome}</h1>

              <button
                className={styles.btnStatus}
                style={{
                  backgroundColor: animal.status === "ADOTADO" ? "#28a745" : "#007bff"
                }}
              >
                {animal.status}
              </button>
            </div>

            <div className={styles.animalTags}>
              <span><FaPaw /> {animal.raca || "SRD"}</span>
              <span>• {animal.idade ? `${animal.idade} anos` : "?"}</span>
              <span>• {animal.sexo}</span>
              <span>• {animal.porte}</span>
            </div>

            <p className={styles.animalStory}>
              {animal.descricao || "Sem descrição."}
            </p>

            <div className={styles.animalLocation}>
              <FaMapMarkerAlt color="#d9534f" /> {animal.local_cidade} - {animal.local_estado}
            </div>
          </div>
        </section>

        <h2 className={styles.sectionTitle}>
          Candidatos à Adoção ({candidatos.length})
        </h2>

        <div className={styles.mainGrid}>

          {/* LISTA DE CANDIDATOS */}
          <aside className={styles.candidatesList}>
            {candidatos.length === 0 && (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "#666",
                  background: "#fff",
                  borderRadius: "8px"
                }}
              >
                Nenhum pedido de adoção recebido ainda.
              </div>
            )}

            {candidatos.map(cand => (
              <div
                key={cand.id}
                className={`${styles.candidateCard} ${
                  selecionado?.id === cand.id ? styles.active : ""
                }`}
                onClick={() => setSelecionado(cand)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardName}>{cand.account.nome}</span>

                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontWeight: "bold",
                      backgroundColor:
                        cand.status === "APROVADO"
                          ? "#d4edda"
                          : cand.status === "RECUSADO"
                          ? "#f8d7da"
                          : "#fff3cd",
                      color:
                        cand.status === "APROVADO"
                          ? "#155724"
                          : cand.status === "RECUSADO"
                          ? "#721c24"
                          : "#856404"
                    }}
                  >
                    {cand.status}
                  </span>
                </div>

                <div className={styles.cardSummary}>
                  <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "4px" }}>
                    Recebido em: {new Date(cand.dataPedido).toLocaleDateString()}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#555" }}>
                    {cand.formulario?.tipoMoradia || "Formulário incompleto"}
                  </p>
                </div>
              </div>
            ))}
          </aside>

          {/* DETALHES DO USUÁRIO */}
          {selecionado && form && usuario ? (
            <section className={styles.detailsPanel}>

              <div className={styles.detailsHeader}>
                <div className={styles.headerTitleBlock}>
                  <h3>{usuario.nome}</h3>
                  <p className={styles.subInfo}>E-mail: {usuario.email}</p>
                  <p className={styles.subInfo}>Telefone: {usuario.telefone}</p>
                </div>
              </div>

              <div className={styles.dataGrid}>

                {/* COLUNA 1 */}
                <div className={styles.dataColumn}>
                  <h4 className={styles.columnTitle}>Endereço & Moradia</h4>


                  {usuario?.rua && (
                   <div className={styles.infoBloco}>
                     <p>{usuario.rua}, {usuario.numero} {usuario.complemento && `- ${usuario.complemento}`}</p>
                     <p>{usuario.bairro} - {usuario.cidade}/{usuario.estado}</p>
                     <p>CEP: {usuario.cep}</p>
                   </div>
                    )}

                  <div className={styles.dataItem}>
                    <label>Moradia:</label>
                    <p>{form?.tipoMoradia}</p>
                  </div>

                  <div className={styles.dataItem}>
                    <label>Possui Quintal?</label>
                    <p>{form?.possuiQuintal ? "Sim" : "Não"}</p>
                  </div>
                </div>

                {/* COLUNA 2 */}
                <div className={styles.dataColumn}>
                  <h4 className={styles.columnTitle}>Detalhes do Lar</h4>

                  <div className={styles.dataItem}>
                    <label>Pessoas no Lar:</label>
                    <p>{form?.pessoasNaCasa}</p>
                  </div>

                  <div className={styles.dataItem}>
                    <label>Outros Animais:</label>
                    <p>{formatOutrosAnimais(form?.historicoAnimais)}</p>
                  </div>

                  <div className={styles.dataItem}>
                    <label>Alergias:</label>
                    <p className={form?.alergias ? styles.alertText : ""}>
                      {form?.alergias ? "Sim" : "Não"}
                    </p>
                  </div>

                  <div className={styles.dataItem}>
                    <label>Termo Aceito:</label>
                    <p style={{ color: "green" }}>Sim</p>
                  </div>
                </div>
              </div>

              {/* AÇÕES */}
              <div className={styles.actionButtons}>
                <button className={styles.btnWhatsapp} onClick={handleWhatsApp}>
                  <FaWhatsapp size={20} /> Conversar
                </button>

                <div className={styles.dividerVertical}></div>

                {selecionado.status === "PENDENTE" ? (
                  <>
                    <button className={styles.btnReject} onClick={handleRecusar}>
                      <FaTimes /> Recusar
                    </button>

                    <button className={styles.btnApprove} onClick={handleAprovar}>
                      <FaCheck /> Aprovar Adoção
                    </button>
                  </>
                ) : (
                  <span style={{ fontStyle: "italic", color: "#666", marginLeft: "10px" }}>
                    Pedido já {selecionado.status.toLowerCase()}.
                  </span>
                )}
              </div>

            </section>
          ) : (
            <div
              className={styles.detailsPanel}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px"
              }}
            >
              <p style={{ color: "#999" }}>
                {candidatos.length === 0
                  ? "Aguardando interessados..."
                  : "Selecione um candidato ao lado."}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
