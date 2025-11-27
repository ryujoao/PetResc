import { Link, useNavigate } from "react-router-dom";
import styles from "./perfil.module.css";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";
import { TbSettingsFilled } from "react-icons/tb";
import { BsFillPersonFill, BsHeart, BsHeartFill, BsPlus } from "react-icons/bs";

// Tipagem baseada no que sua API retorna
interface Pet {
  id: number;
  nome: string;
  raca: string | null;
  sexo: string | null;
  photoURL: string | null;
  favorito?: boolean; 
}

// --- CORREÇÃO AQUI ---
// Adicionamos 'isOwned: boolean' na definição do tipo das props
const PetCard = ({ pet, onToggle, onClickCard, isOwned }: 
    { 
        pet: Pet; 
        onToggle: (id: number) => void; 
        onClickCard: (id: number, isOwned: boolean) => void;
        isOwned: boolean; // <--- O ERRO ESTAVA FALTANDO ESSA LINHA
    }) => (
  <div className={styles.petCard}>
    {/* Clique na imagem navega para o detalhe */}
    <img 
        src={pet.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto"} 
        alt={pet.nome} 
        className={styles.petImage} 
        onClick={() => onClickCard(pet.id, isOwned)} 
        style={{ cursor: 'pointer' }}
    />
    <p className={styles.petNome}>{pet.nome}</p>
    <p className={styles.petRaca}>{pet.raca || "SRD"}</p>
    <p className={styles.petSexo}>{pet.sexo === 'MACHO' ? 'Macho' : (pet.sexo === 'FEMEA' ? 'Fêmea' : '?')}</p>

    {/* Botão de Favoritar */}
    {pet.favorito ? (
      <BsHeartFill className={styles.favorite} onClick={() => onToggle(pet.id)} />
    ) : (
      <BsHeart className={styles.nonFavorite} onClick={() => onToggle(pet.id)} />
    )}
  </div>
);

const UserInfo = ({ email, telefone, nome, local }: any) => (
  <div className={styles.infoContainer}>
    <div className={`${styles.infoBox} ${styles.alignLeft}`}>
      <p>{email || "Email não disponível"}</p>
      <p>{telefone || "Telefone não disponível"}</p>
    </div>
    <div className={`${styles.infoBox} ${styles.alignCenter}`}>
      <p className={styles.username}>{nome || "Username"}</p>
    </div>
    <div className={`${styles.infoBox} ${styles.alignRight}`}>
      <p>Localização</p>
      <p>{local || "SP, Brasil"}</p>
    </div>
  </div>
);

export default function Perfil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [meusPets, setMeusPets] = useState<Pet[]>([]);
  const [outrosSalvos, setOutrosSalvos] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeView, setActiveView] = useState<"todos" | "salvos">("todos");

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
        setLoading(true);
        try {
            // Busca animais que o usuário/ONG cadastrou
            const resMeus = await api.get("/animais/gerenciar/lista");
            const meusFormatados = resMeus.data.map((p: any) => ({ ...p, favorito: false })); 
            setMeusPets(meusFormatados);

            // Busca favoritos
            try {
                const resSalvos = await api.get("/favoritos/meus"); 
                const salvosFormatados = resSalvos.data.map((item: any) => ({
                    ...item.animal, 
                    favorito: true
                }));
                setOutrosSalvos(salvosFormatados);
            } catch (err) {
                console.log("Erro ao buscar favoritos ou rota inexistente", err);
                setOutrosSalvos([]);
            }

        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        } finally {
            setLoading(false);
        }
    }

    fetchData();
  }, [user]);

  const toggleFavorito = async (id: number) => {
    try {
        const isFavoritoNow = outrosSalvos.some(p => p.id === id);
        
        if (isFavoritoNow) {
            await api.delete(`/animais/${id}/desfavoritar`);
            setOutrosSalvos(prev => prev.filter(p => p.id !== id));
        } else {
            await api.post(`/animais/${id}/favoritar`);
        }
    } catch (error) {
        console.error("Erro ao favoritar", error);
        alert("Erro ao atualizar favorito.");
    }
  };

  const handleCardClick = (id: number, isOwned: boolean) => {
    if (isOwned) {
        navigate(`/gerenciar-adocao/${id}`);
    } else {
        navigate(`/animal/${id}`);
    }
  };

  const petsExibidos = activeView === "todos" ? meusPets : outrosSalvos;

  const displayNome = user?.role === "ONG" && user?.nomeOng ? user.nomeOng : user?.nome;
  const userCity = user?.cep ? "Cidade/UF" : "Brasil"; 

  if (!user) return <Layout><div style={{textAlign:'center', padding: '4rem'}}>Faça login para ver seu perfil.</div></Layout>;

  return (
    <Layout>
      <div className={styles.perfilContainer}>
        
        <div className={styles.banner}>
          <Link to="/config" className={styles.configIcon}>
            <TbSettingsFilled />
          </Link>
        </div>

        <div className={styles.avatar}>
          <div className={styles.avatarLabel}>
            <BsFillPersonFill className={styles.avatarIcon} />
          </div>
        </div>

        <UserInfo 
          email={user.email} 
          telefone={user.telefone} 
          nome={displayNome} 
          local={userCity}
        />

        <div className={styles.btnContainer}>
          <button
            className={activeView === "todos" ? styles.tabUm : styles.tabDois}
            onClick={() => setActiveView("todos")}
          >
            Meus Pets ({meusPets.length})
          </button>
          <button
            className={activeView === "salvos" ? styles.tabUm : styles.tabDois}
            onClick={() => setActiveView("salvos")}
          >
            Salvos ({outrosSalvos.length})
          </button>
        </div>

        <div className={styles.petsHeader}>
          <h2 className={styles.petsTitulo}>
            {activeView === "todos" ? "Meus Animais" : "Meus Favoritos"}
          </h2>
          {activeView === "todos" && (
            <Link to="/registrar-animal" className={styles.addIcon}>
              <BsPlus />
            </Link>
          )}
        </div>

        <div className={styles.petsContainer}>
          {loading ? (
              <p>Carregando...</p>
          ) : petsExibidos.length > 0 ? (
            petsExibidos.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onToggle={toggleFavorito}
                onClickCard={handleCardClick}
                isOwned={activeView === "todos"}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%", color: "#666", marginTop: "2rem" }}>
              {activeView === "todos" 
                ? "Você ainda não cadastrou nenhum animal." 
                : "Você ainda não favoritou nenhum animal."}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}