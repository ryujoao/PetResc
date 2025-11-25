import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Layout from "../../components/layout";
import styles from "./perfilAnimal.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";
import { AxiosError } from "axios";

// --- TIPAGEM ---
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
  const [loadingAdocao, setLoadingAdocao] = useState(false);

  useEffect(() => {
    async function fetchAnimal() {
      if (!id || id === 'undefined') return;

      try {
        const response = await api.get(`/api/animais/${id}`);
        setAnimal(response.data);
      } catch (error) {
        console.error("Erro ao buscar animal:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimal();
  }, [id]);

  // 2. PEDIR ADOÇÃO
  const handleQueroAdotar = async () => {
    if (!user) {
      alert("Você precisa fazer login para adotar!");
      navigate("/login");
      return;
    }

    if (user.id === animal?.accountId) {
      alert("Você não pode adotar seu próprio animal.");
      return;
    }

    if (!confirm(`Deseja confirmar interesse em adotar o(a) ${animal?.nome}?`)) return;

    setLoadingAdocao(true);
    try {
      await api.post("/api/pedidos-adocao", {
        animalId: animal?.id
      });

      // ALERTA DE SUCESSO
      alert(`Pedido enviado com sucesso! \n\nO responsável (${animal?.account.nome}) entrará em contato com você.`);
      
      // REDIRECIONAMENTO PARA O FEED
      navigate("/central-adocao"); 

    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        alert(error.response.data.error || "Erro ao solicitar adoção.");
      } else {
        alert("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoadingAdocao(false);
    }
  };

  // --- ESTADOS DE CARREGAMENTO E ERRO ---
  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "4rem", color: "#666" }}>
          <h2>Carregando perfil do pet...</h2>
        </div>
      </Layout>
    );
  }

  if (!animal) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h1 style={{ color: "#2b6b99" }}>Animal não encontrado</h1>
          <button onClick={() => navigate('/central-adocao')} style={{ marginTop: 20, padding: 10, cursor: 'pointer' }}>
            Voltar para o Feed
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <main className={styles.container}>
        
        <div className={styles.profileWrapper}>
          
          {/* FOTO */}
          <div className={styles.imagemContainer}>
            <div className={styles.imagem}>
              <img
                src={animal.photoURL || "https://placehold.co/400x400/f8f8f8/ccc?text=Sem+Foto"}
                alt={animal.nome}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = "https://placehold.co/400x400/f8f8f8/ccc?text=Erro+Imagem";
                }}
              />
            </div>
          </div>

          {/* INFORMAÇÕES PRINCIPAIS */}
          <div className={styles.infoContainer}>
            <h1 className={styles.nome}>{animal.nome}</h1>
            <p className={styles.status}>
               {animal.status === 'DISPONIVEL' ? 'Para Adoção' : animal.status}
            </p>
            
            <section className={styles.dados}>
              <p className={styles.infoLine}>
                <strong>{animal.sexo === 'MACHO' ? 'Macho' : 'Fêmea'}</strong> • {animal.idade ? `${animal.idade} anos` : 'Idade desconhecida'} • {animal.raca || 'SRD'}
              </p>
              <p className={styles.infoLine}>
                Responsável: <strong>{animal.account.nome}</strong>
                {animal.account.ong && (
                   <span> ({animal.account.ong.cidade} - {animal.account.ong.estado})</span>
                )}
              </p>
            </section>

            {/* BOTÃO */}
            {animal.status === 'DISPONIVEL' ? (
                <button 
                    className={styles.botaoAdotar} 
                    onClick={handleQueroAdotar}
                    disabled={loadingAdocao}
                >
                    {loadingAdocao ? "ENVIANDO..." : `QUERO ADOTAR ${animal.nome.toUpperCase()}!`}
                </button>
            ) : (
                <button className={styles.botaoAdotar} disabled style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}>
                    {animal.status}
                </button>
            )}
          </div>
        
          {/* DESCRIÇÃO */}
          <div className={styles.comentarioContainer}>
            <h2>Sobre o {animal.nome}</h2>
            <p>{animal.descricao || "O responsável não forneceu uma descrição detalhada."}</p>
            {animal.ficha?.observacoes && (
                <p style={{marginTop: 10}}><strong>Obs:</strong> {animal.ficha.observacoes}</p>
            )}
          </div>
        </div>

        <hr className={styles.divider} />

        {/* CARACTERÍSTICAS E SAÚDE */}
        <div className={styles.caracteristicasGrid}>
          
          <div className={styles.caracteristicaColuna}>
            <h3>Características</h3>
            <ul>
              <li><strong>Espécie:</strong> {animal.especie}</li>
              <li><strong>Raça:</strong> {animal.raca || "SRD"}</li>
              <li><strong>Porte:</strong> {animal.porte}</li>
              <li><strong>Cor:</strong> {animal.corPredominante || "Não informada"}</li>
            </ul>
          </div>

          <div className={styles.caracteristicaColuna}>
            <h3>Cuidados Veterinários</h3>
            <ul className={styles.tagsList}>
              {animal.ficha ? (
                  <>
                    <li>{animal.ficha.vacinado ? "✅ Vacinado" : "❌ Não Vacinado"}</li>
                    <li>{animal.ficha.castrado ? "✅ Castrado" : "❌ Não Castrado"}</li>
                    <li>{animal.ficha.vermifugado ? "✅ Vermifugado" : "❌ Não Vermifugado"}</li>
                  </>
              ) : (
                  <li>Informações não cadastradas</li>
              )}
            </ul>
          </div>

          <div className={styles.caracteristicaColuna}>
            <h3>Temperamento</h3>
            <ul className={styles.tagsList}>
               {animal.ficha?.temperamento ? (
                   <li>{animal.ficha.temperamento}</li>
               ) : (
                   <li>Não informado</li>
               )}
            </ul>
          </div>

          <div className={styles.caracteristicaColuna}>
            <h3>Saúde Geral</h3>
            <ul className={styles.tagsList}>
                {animal.ficha?.saude ? (
                    <li>{animal.ficha.saude}</li>
                ) : (
                    <li>Sem histórico médico detalhado</li>
                )}
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}