import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Layout from "../../components/layout";
import styles from "./perfilAnimal.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from '../../services/api';
// Adicione FaHeart (Cheio) e FaRegHeart (Vazio)
import { FaWhatsapp, FaCheckCircle, FaHeart, FaRegHeart } from "react-icons/fa"; 

// ... (Interfaces FichaTecnica, AccountInfo, Animal mantidas iguais) ...
interface FichaTecnica {
  vacinado: boolean;
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
  idade: number | null;
  status: string;
  porte: string | null;
  sexo: string | null;
  descricao: string | null;
  photoURL: string | null;
  corPredominante: string | null;
  createdAt: string;
  accountId: number;
  account: AccountInfo; 
  ficha?:  FichaTecnica; 
}

export default function PerfilAnimal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [pedidoExistente, setPedidoExistente] = useState<any>(null);
  
  // 🆕 ESTADO DO FAVORITO
  const [isFavorito, setIsFavorito] = useState(false); 

  // 1. Busca dados do Animal
  useEffect(() => {
    async function fetchAnimal() {
      if (!id || id === 'undefined') return;
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

  // 2. Verifica Pedidos E Favoritos
  useEffect(() => {
    if (user && animal && animal.id) {
        // Verifica Pedidos
        api.get('/pedidos-adocao/meus-pedidos') 
           .then(response => {
               const pedido = response.data.find((p: any) => p.animalId === animal.id);
               if (pedido) setPedidoExistente(pedido);
           })
           .catch(err => console.log("Erro pedidos:", err));

        // 🆕 Verifica se já é Favorito
        api.get('/favoritar/meus')
           .then(response => {
               // response.data é uma lista de favoritos. Verificamos se este animal está lá.
               const jaFavoritou = response.data.some((fav: any) => fav.animalId === animal.id);
               setIsFavorito(jaFavoritou);
           })
           .catch(err => console.log("Erro favoritos:", err));
    }
  }, [user, animal]);

  // 🆕 FUNÇÃO DE FAVORITAR
  const handleToggleFavorito = async () => {
      if (!user) {
          alert("Faça login para favoritar!");
          return;
      }
      if (!animal) return;

      // Mudança Otimista (Visual muda na hora)
      const novoStatus = !isFavorito;
      setIsFavorito(novoStatus);

      try {
          if (novoStatus) {
              await api.post(`/favoritar/${animal.id}`);
          } else {
              await api.delete(`/favoritar/${animal.id}`);
          }
      } catch (error) {
          console.error("Erro ao favoritar", error);
          setIsFavorito(!novoStatus); // Desfaz se der erro
      }
  };

  const handleQueroAdotar = () => {
    if (!user) {
      alert("Você precisa fazer login para adotar!");
      navigate("/login");
      return;
    }
    if (user.id === animal?.accountId) {
      alert("Você não pode adotar seu próprio animal.");
      return;
    }
    navigate(`/formulario-adotar?animalId=${animal?.id}`);
  };

  const handleEntrarEmContato = () => {
    if (!animal?.account?.telefone) {
        alert(`Contato: ${animal?.account.email}`);
        return;
    }
    const phone = animal.account.telefone.replace(/\D/g, '');
    window.open(`https://wa.me/55${phone}?text=Olá, vi o pet ${animal.nome} no site.`, '_blank');
  };

  if (loading) return <Layout><div style={{textAlign: "center", padding: "4rem"}}>Carregando...</div></Layout>;
  if (!animal) return <Layout><div>Animal não encontrado</div></Layout>;
  
  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.profileWrapper}>
          
          <div className={styles.imagemContainer}>
            <div className={styles.imagem}>
              <img
                src={animal.photoURL || "https://placehold.co/400x400/f8f8f8/ccc?text=Sem+Foto"}
                alt={animal.nome}
              />
            </div>
          </div>

          <div className={styles.infoContainer}>
            
            {/* Título + Coração na mesma linha */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 className={styles.nome}>{animal.nome}</h1>
                
                {/* 🆕 ÍCONE DE FAVORITO */}
                <button 
                    onClick={handleToggleFavorito}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                    {isFavorito ? (
                        <FaHeart size={32} color="#FF3B30" />
                    ) : (
                        <FaRegHeart size={32} color="#2D68A6" />
                    )}
                </button>
            </div>
            
            <p className={styles.status}>
               {animal.status === 'DISPONIVEL' ? 'Para Adoção' : 'Encontrado / Perdido'}
            </p>
            
            <section className={styles.dados}>
              <p className={styles.infoLine}>
                <strong>{animal.sexo === 'MACHO' ? 'Macho' : 'Fêmea'}</strong> • {animal.idade ? `${animal.idade} anos` : 'Idade?'} • {animal.raca || 'SRD'}
              </p>
              <p className={styles.infoLine}>
                Responsável: <strong>{animal.account.nome}</strong>
              </p>
            </section>

            {/* --- BOTÕES DE AÇÃO (MANTIDOS IGUAIS) --- */}
            {pedidoExistente ? (
                <button 
                    className={styles.botaoAdotar}
                    style={{ backgroundColor: '#6c757d', cursor: 'pointer' }} 
                    onClick={() => navigate('/')} 
                    title="Ver meus pedidos na página inicial"
                >
                    <FaCheckCircle style={{marginRight: 8}}/>
                    JÁ SOLICITADO ({pedidoExistente.status})
                </button>
            ) : animal.status === 'DISPONIVEL' ? (
                <button 
                    className={styles.botaoAdotar} 
                    onClick={handleQueroAdotar}
                >
                    QUERO ADOTAR!
                </button>
            ) : (
                <button 
                    className={styles.botaoAdotar} 
                    style={{ backgroundColor: '#25D366' }} 
                    onClick={handleEntrarEmContato}
                >
                    <FaWhatsapp size={20} style={{ marginRight: 8 }} />
                    ENTRAR EM CONTATO
                </button>
            )}

          </div>
        
          <div className={styles.comentarioContainer}>
            <h2>Sobre o {animal.nome}</h2>
            <p>{animal.descricao || "Sem descrição."}</p>
          </div>
        </div>

        <hr className={styles.divider} />
        <div className={styles.caracteristicasGrid}>
             <div className={styles.caracteristicaColuna}>
                <h3>Características</h3>
                <ul>
                    <li>Espécie: {animal.especie}</li>
                    <li>Raça: {animal.raca}</li>
                </ul>
             </div>
        </div>

      </main>
    </Layout>
  );
}