import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./gerenciarAdocao.module.css";
import Layout from "../../components/layout";
import api from "../../services/api"; 
import { FaCheck, FaTimes, FaPaw, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

// --- TIPAGEM DO QUE VEM DO BACKEND ---
interface Formulario {
  id: number;
  tipoMoradia: string;
  possuiQuintal: boolean; // No banco é boolean
  pessoasNaCasa: number;
  outrosAnimaisLocal: boolean;
  historicoAnimais: string; // JSON String guardada no banco
  alergia: boolean;
  aceitaTermo: boolean;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  // Adicione outros campos se necessário
}

interface Candidato {
  id: number; // ID do Pedido
  status: string; // PENDENTE, APROVADO, RECUSADO
  dataPedido: string;
  account: {
    nome: string;
    email: string;
    telefone: string;
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
  const { id } = useParams<{ id: string }>(); // ID do Animal na URL
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [selecionado, setSelecionado] = useState<Candidato | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. BUSCAR DADOS (ANIMAL E CANDIDATOS)
  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        // Busca detalhes do animal
        const resAnimal = await api.get(`/animais/${id}`);
        setAnimal(resAnimal.data);

        // Busca pedidos para este animal
        const resCandidatos = await api.get(`/pedidos-adocao/animal/${id}`);
        setCandidatos(resCandidatos.data);
        
        // Seleciona o primeiro da lista automaticamente
        if (resCandidatos.data.length > 0) {
            setSelecionado(resCandidatos.data[0]);
        }

      } catch (error) {
        console.error("Erro ao carregar gerenciamento:", error);
        alert("Erro ao carregar dados. Verifique se você é o dono deste animal.");
        navigate('/'); // Volta para home se der erro
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, navigate]);

  // 2. FUNÇÃO DE APROVAR
  const handleAprovar = async () => {
    if (!selecionado) return;
    if (window.confirm(`Tem certeza que deseja APROVAR a adoção para ${selecionado.account.nome}? O animal ficará indisponível para outros.`)) {
      try {
        await api.patch(`/pedidos-adocao/${selecionado.id}/status`, { status: 'APROVADO' });
        alert("Adoção Aprovada com Sucesso!");
        
        // Atualiza a lista e o animal localmente
        setCandidatos(prev => prev.map(c => c.id === selecionado.id ? {...c, status: 'APROVADO'} : c));
        setSelecionado({...selecionado, status: 'APROVADO'});
        if(animal) setAnimal({...animal, status: 'ADOTADO'});

      } catch (err) {
        alert("Erro ao aprovar pedido.");
      }
    }
  };

  // 3. FUNÇÃO DE RECUSAR
  const handleRecusar = async () => {
    if (!selecionado) return;
    if (window.confirm(`Deseja recusar esta solicitação de ${selecionado.account.nome}?`)) {
      try {
        await api.patch(`/pedidos-adocao/${selecionado.id}/status`, { status: 'RECUSADO' });
        alert("Solicitação recusada.");
        
        // Atualiza a lista localmente
        setCandidatos(prev => prev.map(c => c.id === selecionado.id ? {...c, status: 'RECUSADO'} : c));
        setSelecionado({...selecionado, status: 'RECUSADO'});

      } catch (err) {
        alert("Erro ao recusar pedido.");
      }
    }
  };

  // 4. FUNÇÃO DO WHATSAPP
  const handleWhatsApp = () => {
    if (!selecionado || !animal) return;
    
    const telefoneLimpo = selecionado.account.telefone.replace(/\D/g, '');
    const nomeCandidato = selecionado.account.nome;
    const nomePet = animal.nome;
    const texto = `Olá ${nomeCandidato}! Sou responsável pelo pet "${nomePet}" no PetResc. Analisei seu formulário e gostaria de conversar.`;
    
    // Adiciona DDI 55 se não tiver
    const numeroFinal = telefoneLimpo.length <= 11 ? `55${telefoneLimpo}` : telefoneLimpo;
    
    window.open(`https://api.whatsapp.com/send?phone=${numeroFinal}&text=${encodeURIComponent(texto)}`, '_blank');
  };

  // Helper para formatar o JSON de animais
  const formatOutrosAnimais = (jsonString: string) => {
      try {
          const obj = JSON.parse(jsonString);
          if (obj && obj.Quantidade && obj.Quantidade !== "0") {
              return `${obj.Quantidade} - ${obj["Tipo de Animal"]}`;
          }
          return "Não possui";
      } catch (e) { return "Não informado"; }
  };

  if (loading) return <Layout><div style={{padding: '4rem', textAlign: 'center'}}>Carregando gerenciamento...</div></Layout>;
  if (!animal) return <Layout><div>Animal não encontrado.</div></Layout>;

  // Atalhos para renderizar
  const form = selecionado?.formulario;
  const usuario = selecionado?.account;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        
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
              {/* Badge de Status do Animal */}
              <button className={styles.btnStatus} style={{
                  backgroundColor: animal.status === 'ADOTADO' ? '#28a745' : '#007bff'
              }}>
                  {animal.status}
              </button>
            </div>
            
            <div className={styles.animalTags}>
              <span><FaPaw /> {animal.raca || "SRD"}</span>
              <span>• {animal.idade ? `${animal.idade} anos` : "?"}</span>
              <span>• {animal.sexo}</span>
              <span>• {animal.porte}</span>
            </div>
            
            <p className={styles.animalStory}>{animal.descricao || "Sem descrição."}</p>
            
            <div className={styles.animalLocation}>
              <FaMapMarkerAlt color="#d9534f" /> {animal.local_cidade} - {animal.local_estado}
            </div>
          </div>
        </section>

        <h2 className={styles.sectionTitle}>Candidatos à Adoção ({candidatos.length})</h2>

        <div className={styles.mainGrid}>
          
          {/* COLUNA ESQUERDA: LISTA DE CANDIDATOS */}
          <aside className={styles.candidatesList}>
            {candidatos.length === 0 && (
                <div style={{padding: '2rem', textAlign: 'center', color: '#666', background: '#fff', borderRadius: '8px'}}>
                    Nenhum pedido de adoção recebido ainda.
                </div>
            )}

            {candidatos.map((cand) => (
              <div 
                key={cand.id}
                className={`${styles.candidateCard} ${selecionado?.id === cand.id ? styles.active : ''}`}
                onClick={() => setSelecionado(cand)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardName}>{cand.account.nome}</span>
                  {/* Badge de Status do Pedido */}
                  <span style={{
                      fontSize: '0.75rem', 
                      padding: '2px 8px', 
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      backgroundColor: cand.status === 'APROVADO' ? '#d4edda' : (cand.status === 'RECUSADO' ? '#f8d7da' : '#fff3cd'),
                      color: cand.status === 'APROVADO' ? '#155724' : (cand.status === 'RECUSADO' ? '#721c24' : '#856404')
                  }}>
                      {cand.status}
                  </span>
                </div>
                <div className={styles.cardSummary}>
                  <p style={{fontSize: '0.85rem', color: '#666', marginBottom: '4px'}}>
                     Recebido em: {new Date(cand.dataPedido).toLocaleDateString()}
                  </p>
                  <p style={{fontSize: '0.9rem', color: '#555'}}>
                    {cand.formulario?.tipoMoradia || "Formulário incompleto"}
                  </p>
                </div>
              </div>
            ))}
          </aside>

          {/* COLUNA DIREITA: DETALHES */}
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
                  {/* Coluna 1 */}
                  <div className={styles.dataColumn}>
                    <h4 className={styles.columnTitle}>Endereço & Moradia</h4>
                    
                    <div className={styles.dataItem}>
                      <label>Localização:</label>
                      <p>{form.cidade} - {form.estado}</p>
                      <p>{form.bairro}</p>
                    </div>

                    <div className={styles.dataItem}>
                      <label>Moradia:</label>
                      <p>{form.tipoMoradia}</p>
                    </div>

                    <div className={styles.dataItem}>
                      <label>Possui Quintal?</label>
                      {/* O banco retorna true/false, ajustamos para visualização */}
                      <p>{form.possuiQuintal ? "Sim" : "Não"}</p>
                    </div>
                  </div>

                  {/* Coluna 2 */}
                  <div className={styles.dataColumn}>
                    <h4 className={styles.columnTitle}>Detalhes do Lar</h4>
                    
                    <div className={styles.dataItem}>
                      <label>Pessoas no Lar:</label>
                      <p>{form.pessoasNaCasa}</p>
                    </div>

                    <div className={styles.dataItem}>
                      <label>Outros Animais:</label>
                      <p>{formatOutrosAnimais(form.historicoAnimais)}</p>
                    </div>

                    <div className={styles.dataItem}>
                      <label>Alergias:</label>
                      <p className={form.alergia ? styles.alertText : ""}>
                        {form.alergia ? "Sim" : "Não"}
                      </p>
                    </div>

                    <div className={styles.dataItem}>
                      <label>Termo Aceito:</label>
                      <p style={{color: 'green'}}>Sim</p>
                    </div>
                  </div>
                </div>

                {/* BARRA DE AÇÕES */}
                <div className={styles.actionButtons}>
                  
                  <button className={styles.btnWhatsapp} onClick={handleWhatsApp}>
                    <FaWhatsapp size={20} /> Conversar
                  </button>

                  <div className={styles.dividerVertical}></div>

                  {/* Só mostra Aprovar/Recusar se estiver PENDENTE */}
                  {selecionado.status === 'PENDENTE' && (
                      <>
                        <button className={styles.btnReject} onClick={handleRecusar}>
                            <FaTimes /> Recusar
                        </button>
                        
                        <button className={styles.btnApprove} onClick={handleAprovar}>
                            <FaCheck /> Aprovar Adoção
                        </button>
                      </>
                  )}
                  
                  {/* Mensagem se já foi finalizado */}
                  {selecionado.status !== 'PENDENTE' && (
                      <span style={{fontStyle: 'italic', color: '#666', marginLeft: '10px'}}>
                          Pedido já {selecionado.status.toLowerCase()}.
                      </span>
                  )}
                </div>

            </section>
          ) : (
             // Estado vazio (se não tiver candidato selecionado ou lista vazia)
             <div className={styles.detailsPanel} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px'}}>
                 <p style={{color: '#999'}}>
                    {candidatos.length === 0 ? "Aguardando interessados..." : "Selecione um candidato ao lado."}
                 </p>
             </div>
          )}
        </div>
      </div>
    </Layout>
  );
}