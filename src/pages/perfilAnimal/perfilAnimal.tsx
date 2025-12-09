import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Layout from "../../components/layout";
import styles from "./perfilAnimal.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from '../../services/api';
import { FaWhatsapp, FaCheckCircle, FaHeart, FaRegHeart, FaEye, FaExclamationTriangle } from "react-icons/fa"; 
import Modal from "../../components/modal"; 

interface FichaTecnica {
  vacinado: boolean;
  vacinas?: string;
  vermifugado: boolean;
  castrado: boolean;
  temperamento: string;
  saude: string;
  observacoes: string;
}

interface AccountInfo {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  ong?: {
    cidade: string;
    estado: string;
  }
}

interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca: string | null;
  idade: string | null; // Agora é string para aceitar texto livre
  status: string; 
  porte: string | null;
  sexo: string | null;
  descricao: string | null;
  photoURL: string | null;
  corPredominante: string | null;
  createdAt: string;
  accountId: number;
  
  // Campos de Resgate
  data_resgate?: string;
  local_cidade?: string;
  local_estado?: string;
  local_atual?: string;
  
  account: AccountInfo; 
  ficha?: FichaTecnica; 
}

export default function PerfilAnimal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [pedidoExistente, setPedidoExistente] = useState<any>(null);
  const [isFavorito, setIsFavorito] = useState(false); 

  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "", msg: "", type: "success" as "success" | "error", redirect: "" as string | null
  });

  const showModal = (title: string, msg: string, type: "success" | "error", redirect: string | null = null) => {
    setModalConfig({ title, msg, type, redirect });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (modalConfig.redirect) navigate(modalConfig.redirect);
  };

  useEffect(() => {
    async function fetchAnimal() {
      if (!id) return;
      try {
        const response = await api.get(`/animais/${id}`);
        setAnimal(response.data);
      } catch (error) {
        console.error("Erro ao buscar animal:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnimal();
  }, [id]);

  useEffect(() => {
    if (user && animal && animal.id) {
        if (animal.status === 'DISPONIVEL') {
            api.get('/pedidos-adocao/meus-pedidos') 
            .then(res => {
                const pedido = res.data.find((p: any) => p.animalId === animal.id);
                if (pedido) setPedidoExistente(pedido);
            })
            .catch(console.error);
        }
        api.get('/favoritar/meus')
           .then(res => {
               setIsFavorito(res.data.some((fav: any) => fav.animalId === animal.id));
           })
           .catch(console.error);
    }
  }, [user, animal]);

  const handleToggleFavorito = async () => {
      if (!user) return showModal("Atenção", "Faça login para favoritar.", "error");
      if (!animal) return;
      
      const novoStatus = !isFavorito;
      setIsFavorito(novoStatus);
      try {
          await api.post(`/favoritar/${animal.id}`);
      } catch {
          setIsFavorito(!novoStatus); 
      }
  };

  const handleQueroAdotar = () => {
    if (!user) return showModal("Login", "Faça login para adotar.", "error", "/login");
    if (user.id === animal?.accountId) return showModal("Erro", "Você não pode adotar seu próprio animal.", "error");
    navigate(`/formulario-adotar?animalId=${animal?.id}`);
  };

  const handleReportarAvistamento = () => {
    if (!animal?.account?.telefone) return showModal("Contato", `Envie um e-mail para: ${animal?.account.email}`, "success");
    const phone = animal.account.telefone.replace(/\D/g, '');
    const mensagem = `Olá! Vi seu anúncio no PetResc sobre o animal "${animal.nome}" que está desaparecido. Tenho informações sobre ele.`;
    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const handleContatoGenerico = () => {
    if (!animal?.account?.telefone) return showModal("Contato", `E-mail: ${animal?.account.email}`, "success");
    const phone = animal.account.telefone.replace(/\D/g, '');
    window.open(`https://wa.me/55${phone}?text=Olá, vi o pet ${animal.nome} no site.`, '_blank');
  };

  const renderActionButton = () => {
      if (pedidoExistente) {
          return (
            <button className={styles.botaoAdotar} style={{ backgroundColor: '#6c757d' }} onClick={() => navigate('/')}>
                <FaCheckCircle style={{marginRight: 8}}/> JÁ SOLICITADO
            </button>
          );
      }
      if (animal?.status === 'DISPONIVEL' || animal?.status === 'LAR_TEMPORARIO') {
          return (
            <button className={styles.botaoAdotar} onClick={handleQueroAdotar}>
                {animal?.status === 'LAR_TEMPORARIO' ? 'OFERECER LAR TEMPORÁRIO' : 'QUERO ADOTAR!'}
            </button>
          );
      }
      if (animal?.status === 'PERDIDO') {
        return (
            <button className={styles.botaoReportar} onClick={handleReportarAvistamento}>
                <FaEye size={20} style={{ marginRight: 8 }} />
                VI ESTE ANIMAL / TENHO NOTÍCIAS
            </button>
        );
      }
      return (
        <button className={styles.botaoAdotar} style={{ backgroundColor: '#25D366' }} onClick={handleContatoGenerico}>
            <FaWhatsapp size={20} style={{ marginRight: 8 }} /> ENTRAR EM CONTATO
        </button>
      );
  };

  if (loading) return <Layout><div style={{textAlign: "center", padding: "4rem"}}>Carregando...</div></Layout>;
  if (!animal) return <Layout><div>Animal não encontrado</div></Layout>;
  
  const statusMap: Record<string, string> = {
      'DISPONIVEL': 'Para Adoção',
      'PERDIDO': 'DESAPARECIDO ⚠️',
      'ENCONTRADO': 'Encontrado',
      'ADOTADO': 'Adotado',
      'LAR_TEMPORARIO': 'Precisa de Lar',
      'EM_LAR_TEMPORARIO': 'Em Lar Temporário'
  };

  const statusText = statusMap[animal.status] || animal.status;
  const statusClass = animal.status === 'PERDIDO' ? styles.statusPerdido : styles.statusNormal;

  return (
    <Layout>
      <Modal isOpen={modalOpen} title={modalConfig.title} message={modalConfig.msg} type={modalConfig.type} onClose={handleCloseModal} />

      <main className={styles.container}>
        <div className={styles.profileWrapper}>
          
          <div className={styles.imagemContainer}>
            <div className={styles.imagem}>
              <img src={animal.photoURL || "https://placehold.co/400x400/f8f8f8/ccc?text=Sem+Foto"} alt={animal.nome} />
            </div>
          </div>

          <div className={styles.infoContainer}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 className={styles.nome}>{animal.nome}</h1>
                <button onClick={handleToggleFavorito} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    {isFavorito ? <FaHeart size={32} color="#FF3B30" /> : <FaRegHeart size={32} color="#2D68A6" />}
                </button>
            </div>
            
            <span className={`${styles.statusBadge} ${statusClass}`}>
               {statusText}
            </span>
            
            <section className={styles.dados}>
              <p className={styles.infoLine}>
                  <strong>{animal.sexo}</strong> 
                  
                  {/* --- MUDANÇA 1: PONTO NA IDADE --- */}
                  • {animal.idade ? (isNaN(Number(animal.idade)) ? animal.idade : `${animal.idade} anos`) : 'Idade não inf.'}
                  
                  • {animal.raca }
              </p>
              <p className={styles.infoLine}>Responsável: <strong>{animal.account.nome}</strong></p>
              
              <p className={styles.infoLine}>
                  Local: {animal.local_cidade ? `${animal.local_cidade}/${animal.local_estado}` : (animal.account.ong?.cidade || "Não informado")}
              </p>
            </section>

            {animal.status === 'PERDIDO' && (
                <div className={styles.boxAjuda}>
                    <FaExclamationTriangle size={24} color="#d32f2f" />
                    <div>
                        <strong>Este animal está desaparecido!</strong>
                        <p>O tutor está procurando. Se você o viu, clique no botão abaixo.</p>
                    </div>
                </div>
            )}

            <div style={{marginTop: 'auto'}}>
                {renderActionButton()}
            </div>
          </div>
        
          <div className={styles.comentarioContainer}>
            <h2>Sobre o {animal.nome}</h2>
            <p>{animal.descricao || "Sem descrição."}</p>
            
            {animal.ficha?.observacoes && (
                <p style={{marginTop: '10px', fontStyle: 'italic', color: '#555'}}>
                    Obs: {animal.ficha.observacoes}
                </p>
            )}
          </div>
        </div>

        <hr className={styles.divider} />
        
        <div className={styles.caracteristicasGrid}>
             
             {/* Coluna 1: Básico */}
             <div className={styles.caracteristicaColuna}>
                <h3>Perfil</h3>
                <ul>
                    <li>Espécie: {animal.especie}</li>
                    <li>Raça: {animal.raca || 'Não definida'}</li>
                    <li>Porte: {animal.porte || 'Não informado'}</li>
                    <li>Cor: {animal.corPredominante || 'Não informada'}</li>
                    {/* --- MUDANÇA 2: REMOVIDO CAMPO TEMPERAMENTO DAQUI --- */}
                </ul>
             </div>

             {/* Coluna 2: Saúde (Só aparece se tiver ficha) */}
             {animal.ficha && (
                 <div className={styles.caracteristicaColuna}>
                    <h3>Saúde</h3>
                    <ul>
                        <li>Castrado: {animal.ficha.castrado ? "Sim" : "Não"}</li>
                        <li>Vacinado: {animal.ficha.vacinado ? "Sim" : "Não"}</li>
                        <li>Vermifugado: {animal.ficha.vermifugado ? "Sim" : "Não"}</li>
                        {animal.ficha.vacinas && <li>Vacinas: {animal.ficha.vacinas}</li>}
                    </ul>
                 </div>
             )}

             {/* Coluna 3: Resgate (Só se tiver dados) */}
             {(animal.data_resgate || animal.local_atual) && (
                 <div className={styles.caracteristicaColuna}>
                    <h3>Resgate</h3>
                    <ul>
                        {animal.local_atual && <li>Local Atual: {animal.local_atual.replace('_', ' ')}</li>}
                        {animal.data_resgate && <li>Data: {new Date(animal.data_resgate).toLocaleDateString()}</li>}
                    </ul>
                 </div>
             )}

        </div>
      </main>
    </Layout>
  );
}