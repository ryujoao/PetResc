import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaWhatsapp } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./gerenciar.module.css"; 
import Layout from "../../components/layout";
import api from "../../services/api";

// --- TIPAGEM REAL (Vinda do Backend) ---
interface Formulario {
  id: number;
  tipoMoradia: string;
  possuiQuintal: boolean;
  pessoasNaCasa: number;
  outrosAnimais: boolean; 
  historicoAnimais: string;
  
  // O Backend retorna o endereço aqui dentro (FLAT), não num objeto 'endereco'
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface Candidato {
  id: number;
  status: string; // PENDENTE, APROVADO, RECUSADO
  dataPedido: string;
  account: {
    nome: string;
    email: string;
    telefone: string;
    cpf?: string;
  };
  formulario: Formulario;
}

interface Animal {
  id: number;
  nome: string;
  photoURL: string | null;
  status: string;
  codigo?: string;
  updatedAt: string;
}

export default function GerenciarAdocao() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [candidatoSelecionado, setCandidatoSelecionado] = useState<Candidato | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. CARREGAR DADOS DA API
  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        // Busca Animal
        const resAnimal = await api.get(`/animais/${id}`);
        setAnimal(resAnimal.data);

        // Busca Candidatos (Pedidos)
        const resPedidos = await api.get(`/pedidos-adocao/animal/${id}`);
        
        // Mapeamento de segurança
        const listaMapeada = resPedidos.data.map((p: any) => ({
            ...p,
            formulario: p.formulario || {}, // Garante que não quebre se vier null
            account: p.account || {}
        }));

        setCandidatos(listaMapeada);

        // Seleciona o primeiro da lista
        if (listaMapeada.length > 0) {
            setCandidatoSelecionado(listaMapeada[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // 2. AÇÕES (APROVAR/REPROVAR)
  const handleStatusChange = async (novoStatus: 'APROVADO' | 'RECUSADO') => {
      if (!candidatoSelecionado) return;
      
      const texto = novoStatus === 'APROVADO' ? 'APROVAR a adoção' : 'REPROVAR a solicitação';
      if (!window.confirm(`Tem certeza que deseja ${texto}?`)) return;

      try {
          await api.patch(`/pedidos-adocao/${candidatoSelecionado.id}/status`, { status: novoStatus });
          alert(`Sucesso! Pedido ${novoStatus}.`);

          // Atualiza lista localmente
          const novaLista = candidatos.map(c => 
              c.id === candidatoSelecionado.id ? { ...c, status: novoStatus } : c
          );
          setCandidatos(novaLista);
          setCandidatoSelecionado({ ...candidatoSelecionado, status: novoStatus });

          // Se aprovou, muda status do animal visualmente
          if (novoStatus === 'APROVADO' && animal) {
              setAnimal({ ...animal, status: 'ADOTADO' });
          }

      } catch (error) {
          alert("Erro ao atualizar status.");
      }
  };

  const abrirWhatsApp = () => {
      if(!candidatoSelecionado) return;
      const tel = candidatoSelecionado.account.telefone.replace(/\D/g, '');
      const msg = `Olá ${candidatoSelecionado.account.nome}, falo sobre a adoção do ${animal?.nome}.`;
      window.open(`https://wa.me/55${tel}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (loading) return <Layout><div className={styles.container}><p>Carregando...</p></div></Layout>;
  if (!animal) return <Layout><div className={styles.container}><p>Animal não encontrado.</p></div></Layout>;

  // Variáveis para facilitar o render (Correção do endereço)
  const form = candidatoSelecionado?.formulario;
  const usuario = candidatoSelecionado?.account;

  return (
    <Layout>
      <div className={styles.container}>
        
        {/* BOTÃO VOLTAR */}
        <button className={styles.btnVoltar} onClick={() => navigate(-1)}>
          <FaArrowLeft size={20} /> Voltar
        </button>

        {/* --- CABEÇALHO --- */}
        <div className={styles.secaoCabecalho}>
          <div className={styles.moldeFoto}>
            <img 
              src={animal.photoURL || "https://placehold.co/300"} 
              alt={animal.nome} 
              className={styles.fotoAnimal} 
            />
          </div>

          <div className={styles.painelInfoPrincipal}>
            <h1 className={styles.nomeAnimal}>{animal.nome}</h1>
            <div className={styles.linhaStatus}>
              Status: <strong>{animal.status}</strong>
              <br />
              Atualizado em: {new Date(animal.updatedAt).toLocaleDateString()}
            </div>
            
            <button className={styles.btnMudarStatus}>Mudar Status</button>
            <span className={styles.codigoAnimal}>ID: #{animal.id}</span>
          </div>
        </div>

        {/* --- TÍTULO PRINCIPAL --- */}
        <h2 className={styles.tituloSecao}>Informações dos Candidatos à Adoção</h2>
        <div className={styles.divisorAzul}></div>

        {/* --- ÁREA MESTRE-DETALHE --- */}
        <div className={styles.layoutCandidatos}>
          
          {/* LADO ESQUERDO: LISTA DE CANDIDATOS */}
          <div className={styles.listaLateral}>
            {candidatos.length === 0 && <p style={{padding:15}}>Sem candidatos.</p>}
            
            {candidatos.map((candidato) => (
              <div 
                key={candidato.id}
                className={`${styles.cardCandidato} ${candidatoSelecionado?.id === candidato.id ? styles.cardAtivo : ''}`}
                onClick={() => setCandidatoSelecionado(candidato)}
              >
                <span className={styles.nomeCandidatoLista}>{candidato.account.nome}</span>
                <span className={styles.resumoCandidato}>
                    {/* Status e Data */}
                    {candidato.status} • {new Date(candidato.dataPedido).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>

          {/* LADO DIREITO: DETALHES DO CANDIDATO */}
          {candidatoSelecionado && usuario && form ? (
            <div className={styles.painelDetalhes}>
                
                {/* Bloco: Info Pessoal */}
                <h3 className={styles.subtituloDetalhes}>Informações Pessoais</h3>
                <div className={styles.gridDetalhes}>
                  <div className={styles.blocoDado}>
                    <span className={styles.rotulo}>Nome Completo</span>
                    <p className={styles.valor}>{usuario.nome}</p>
                  </div>
                  <div className={styles.blocoDado}>
                    <span className={styles.rotulo}>CPF</span>
                    <p className={styles.valor}>{usuario.cpf || "---"}</p>
                  </div>
                  <div className={styles.blocoDado}>
                    <span className={styles.rotulo}>Telefone</span>
                    <p className={styles.valor} style={{display:'flex', alignItems:'center', gap:5}}>
                        {usuario.telefone}
                        <FaWhatsapp onClick={abrirWhatsApp} style={{cursor:'pointer', color:'green', marginLeft: 5}}/>
                    </p>
                  </div>
                  <div className={styles.blocoDado}>
                    <span className={styles.rotulo}>E-mail</span>
                    <p className={styles.valor}>{usuario.email}</p>
                  </div>
                </div>

                {/* Bloco: Endereço & Moradia */}
                <div className={styles.gridDetalhes}>
                  {/* Coluna 1: Endereço (CORRIGIDO AQUI: Lendo direto de 'form') */}
                  <div>
                    <h3 className={styles.subtituloDetalhes}>Endereço</h3>
                    <div className={styles.blocoDado}>
                      <span className={styles.rotulo}>CEP</span>
                      <p className={styles.valor}>{form.cep}</p>
                    </div>
                    <div className={styles.blocoDado}>
                      <span className={styles.rotulo}>Rua</span>
                      <p className={styles.valor}>{form.rua}</p>
                    </div>
                    <div className={styles.blocoDado}>
                      <span className={styles.rotulo}>Número</span>
                      <p className={styles.valor}>{form.numero}</p>
                    </div>
                    <div className={styles.blocoDado}>
                      <span className={styles.rotulo}>Complemento</span>
                      <p className={styles.valor}>{form.complemento || "-"}</p>
                    </div>
                    <div className={styles.blocoDado}>
                      <span className={styles.rotulo}>Bairro</span>
                      <p className={styles.valor}>{form.bairro}</p>
                    </div>
                    <div className={styles.blocoDado}>
                      <span className={styles.rotulo}>Cidade / Estado</span>
                      <p className={styles.valor}>{form.cidade} - {form.estado}</p>
                    </div>
                  </div>

                  {/* Coluna 2: Moradia */}
                  <div>
                    <h3 className={styles.subtituloDetalhes}>Moradia</h3>
                    <div className={styles.blocoDado}>
                      <span className={styles.rotulo}>Tipo de Imóvel</span>
                      <p className={styles.valor}>{form.tipoMoradia}</p>
                    </div>
                    <div className={styles.blocoDado}>
                      <span className={styles.rotulo}>Outros Animais</span>
                      <p className={styles.valor}>{form.outrosAnimais ? "Sim" : "Não"}</p>
                    </div>
                    <div className={styles.blocoDado}>
                      <span className={styles.rotulo}>Residentes</span>
                      <p className={styles.valor}>{form.pessoasNaCasa} pessoa(s)</p>
                    </div>
                    <div className={styles.blocoDado}>
                        <span className={styles.rotulo}>Histórico</span>
                        <p className={styles.valor} style={{fontSize:'0.8rem'}}>{form.historicoAnimais || "-"}</p>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className={styles.rodapeAcoes}>
                  {candidatoSelecionado.status === 'PENDENTE' ? (
                      <>
                        <button 
                            className={`${styles.btnAcao} ${styles.negativo}`}
                            onClick={() => handleStatusChange('RECUSADO')}
                        >
                            Reprovar
                        </button>
                        <button 
                            className={`${styles.btnAcao} ${styles.positivo}`}
                            onClick={() => handleStatusChange('APROVADO')}
                        >
                            Aprovar Adoção
                        </button>
                      </>
                  ) : (
                      <div style={{padding:10, fontWeight:'bold', color:'#555'}}>
                          Pedido já {candidatoSelecionado.status.toLowerCase()}.
                      </div>
                  )}
                </div>

            </div>
          ) : (
            <div className={styles.painelDetalhes} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <p>Selecione um candidato para ver os detalhes.</p>
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
}