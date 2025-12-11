import { Link, useNavigate } from "react-router-dom";
import styles from "./perfil.module.css";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";
import { TbSettingsFilled } from "react-icons/tb";
import { BsFillPersonFill, BsHeart, BsHeartFill, BsPlus } from "react-icons/bs";
import { useRef } from "react";

// Tipagem
interface Pet {
  id: number;
  nome: string;
  raca: string | null;
  sexo: string | null;
  photoURL: string | null;
  favorito?: boolean;
  status?: string;
  codigo?: string;
  dataAdocao?: string;
}

// --- CARD VERTICAL (USUÁRIO COMUM) ---
const PetCard = ({
  pet,
  onToggle,
  onClickCard,
  isOwned,
}: {
  pet: Pet;
  onToggle: (id: number) => void;
  onClickCard: (id: number, isOwned: boolean) => void;
  isOwned: boolean;
}) => (
  <div className={styles.petCard}>
    <img
      src={
        pet.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto"
      }
      alt={pet.nome}
      className={styles.petImage}
      onClick={() => onClickCard(pet.id, isOwned)}
      style={{ cursor: "pointer" }}
    />
    <p className={styles.petNome}>{pet.nome}</p>
    <p className={styles.petRaca}>{pet.raca}</p>
    <p className={styles.petSexo}>
      {pet.sexo === "MACHO" ? "Macho" : pet.sexo === "FEMEA" ? "Fêmea" : "?"}
    </p>

    {pet.favorito !== undefined &&
      (pet.favorito ? (
        <BsHeartFill
          className={styles.favorite}
          onClick={() => onToggle(pet.id)}
        />
      ) : (
        <BsHeart
          className={styles.nonFavorite}
          onClick={() => onToggle(pet.id)}
        />
      ))}
  </div>
);

// --- CARD HORIZONTAL (ONG) ---
const OngPetRow = ({
  pet,
  onClickCard,
}: {
  pet: Pet;
  onClickCard: (id: number) => void;
}) => {
  return (
    <div className={styles.ongCard}>
      <img
        src={
          pet.photoURL ||
          "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto"
        }
        alt={pet.nome}
        className={styles.ongCardImage}
        onClick={() => onClickCard(pet.id)}
      />
      <div className={styles.ongCardContent}>
        <p className={styles.ongCardName}>
          {pet.nome},{pet.raca}
        </p>

        <div className={styles.ongCardInfo}>
          <span>{pet.raca}</span>
          {/* Mostra código mockado ou ID real */}
          <span className={styles.ongCode}>{pet.codigo || `#${pet.id}`}</span>
          <br />
          <span> {pet.raca}</span>
        </div>
      </div>
      <div className={styles.ongCardActions}>
        <span className={styles.ongStatusText}>
          Status: {pet.status || "Disponível"}
          {/* Se estiver adotado, mostra a data (mockada ou real) */}
          {(pet.status === "Adotado" || pet.status === "ADOTADO") && (
            <>
              <br />
              <span style={{ fontWeight: 400, fontSize: "0.8rem" }}>
                Adotado dia: {pet.dataAdocao || "--/--/----"}
              </span>
            </>
          )}
        </span>
        <span className={styles.ongLink} onClick={() => onClickCard(pet.id)}>
          Ver informações
        </span>
      </div>
    </div>
  );
};

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

// --- CONTEÚDO DA ABA DOAÇÕES (Mantido COMPLETO) ---
const DonationsContent = () => {
  return (
    <div className={styles.donationContainer}>
      <div className={styles.donationBox}>
        Todos os meses, nossa ONG se dedica incansavelmente a resgatar cães e
        gatos abandonados das ruas, oferecendo a cada um deles não apenas
        abrigo, alimentação e cuidados veterinários, mas também a chance de
        recomeçar em um lar cheio de amor e segurança. Com sua ajuda, podemos
        ampliar ainda mais nossas ações, alcançar novos resgates, garantir
        tratamentos de qualidade e multiplicar histórias de superação que
        inspiram e emocionam quem acredita no poder da empatia.
      </div>

      <h3 className={styles.donationTitle}>Nosso progresso</h3>

      <ul className={styles.donationList}>
        <li className={styles.donationItem}>R$ 12.850 arrecadados</li>
        <li className={styles.donationItem}>198 doadores</li>
        <li className={styles.donationItem}>Meta: R$ 20.000</li>
      </ul>

      <Link to="/instituto/suipa" className={styles.btnBlue}>
        DOE AGORA
      </Link>
    </div>
  );
};

// --- DADOS DOS GRÁFICOS (MANTIDOS COMPLETOS) ---
const dataMonths = [
  { name: "Ago", val: 5, color: "#103f6e" },
  { name: "Set", val: 14, color: "#103f6e" },
  { name: "Out", val: 11, color: "#103f6e" },
  { name: "Nov", val: 13, color: "#103f6e" },
  { name: "Dez", val: 4, color: "#9abddf" },
];

const dataWeek = [
  { name: "Dom", val: 1, color: "#103f6e" },
  { name: "Seg", val: 0, color: "#103f6e" },
  { name: "Ter", val: 1, color: "#103f6e" },
  { name: "Qua", val: 1, color: "#103f6e" },
  { name: "Qui", val: 2, color: "#9abddf" },
  { name: "Sex", val: 3, color: "#103f6e" },
  { name: "Sáb", val: 1, color: "#103f6e" },
];

const dataEntradas = [
  { name: "Ago", val: 5, color: "#103f6e" },
  { name: "Set", val: 12, color: "#103f6e" },
  { name: "Out", val: 16, color: "#103f6e" },
  { name: "Nov", val: 8, color: "#103f6e" },
  { name: "Dez", val: 3, color: "#9abddf" },
];

const dataSaidas = [
  { name: "Ago", val: 5, color: "#103f6e" },
  { name: "Set", val: 10, color: "#103f6e" },
  { name: "Out", val: 12, color: "#103f6e" },
  { name: "Nov", val: 14, color: "#103f6e" },
  { name: "Dez", val: 2, color: "#9abddf" },
];
// --- COMPONENTES DOS GRÁFICOS ---
const SimpleBarChart = ({ data }: { data: any[] }) => {
  const maxVal = Math.max(...data.map((d) => d.val)) || 1;

  return (
    <div className={styles.chartContent}>
      {data.map((item, index) => {
        const heightPercentage = (item.val / maxVal) * 80;

        return (
          <div key={index} className={styles.barColumn}>
            <span className={styles.barValue}>
              {item.val > 0 ? item.val : ""}
            </span>
            <div
              className={styles.barFill}
              style={{
                height: `${heightPercentage}%`,
                backgroundColor: item.color,
              }}
            />
            <span className={styles.barLabel}>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const OngCharts = ({ activeView }: { activeView: string }) => {
  if (activeView !== "adotados" && activeView !== "registrados") return null;

  return (
    <div className={styles.chartsSection}>
      {activeView === "adotados" && (
        <>
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Processos de adoção (5 meses)</h3>
            <SimpleBarChart data={dataMonths} />
          </div>
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>
              Processos de adoção (1 semana)
            </h3>
            <SimpleBarChart data={dataWeek} />
          </div>
        </>
      )}

      {activeView === "registrados" && (
        <>
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Entradas de animais (5 meses)</h3>
            <SimpleBarChart data={dataEntradas} />
          </div>
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Saída de animais (5 meses)</h3>
            <SimpleBarChart data={dataSaidas} />
          </div>
        </>
      )}
    </div>
  );
};

export default function Perfil() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Controle de upload do avatar
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Ao clicar no avatar
  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Quando seleciona arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const [meusPets, setMeusPets] = useState<Pet[]>([]);
  const [outrosSalvos, setOutrosSalvos] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  // Tabs
  const [activeView, setActiveView] = useState<string>("todos");

  const isOng = user?.role === "ONG";

  // Ajusta a view inicial
  useEffect(() => {
    if (isOng)
      setActiveView("registrados"); // Alterado para começar em Registrados
    else setActiveView("todos");
  }, [isOng]);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoading(true);
      try {
        const resMeus = await api.get("/animais/gerenciar/lista");

        const meusFormatados = resMeus.data.map((p: any, index: number) => {
          let statusFinal = p.status;

          if (!statusFinal || statusFinal === "DISPONIVEL") {
            if (index % 2 !== 0) statusFinal = "Adotado";
            else statusFinal = "Disponível";
          }

          return {
            ...p,
            favorito: false,
            status: statusFinal,
            codigo: index % 2 === 0 ? "AD." : "FI.",
            dataAdocao: statusFinal === "Adotado" ? "10/10/2025" : null,
          };
        });

        setMeusPets(meusFormatados);

        // Se não for ONG, busca favoritos
        if (!isOng) {
          try {
            const resSalvos = await api.get("favoritar/meus");
            const salvosFormatados = resSalvos.data.map((item: any) => ({
              ...item.animal,
              favorito: true,
            }));
            setOutrosSalvos(salvosFormatados);
          } catch (err) {
            setOutrosSalvos([]);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user, isOng]);

  const toggleFavorito = async (id: number) => {
    try {
      const isFavoritoNow = outrosSalvos.some((p) => p.id === id);
      if (isFavoritoNow) {
        await api.delete(`/favoritar/${id}`);
        setOutrosSalvos((prev) => prev.filter((p) => p.id !== id));
      } else {
        await api.post(`/favoritar/${id}`);
      }
    } catch (error) {
      alert("Erro ao atualizar favorito.");
    }
  };

  const handleCardClick = (id: number, isOwned: boolean = true) => {
    if (isOwned || isOng) {
      navigate(`/gerenciar-adocao/${id}`);
    } else {
      navigate(`/animal/${id}`);
    }
  };

  const getDisplayedPets = () => {
    if (!isOng) {
      return activeView === "todos" ? meusPets : outrosSalvos;
    }

    // Lógica da ONG
    switch (activeView) {
      case "adotados":
        return meusPets.filter(
          (p) => p.status === "Adotado" || p.status === "ADOTADO"
        );
      case "registrados":
        // Filtra os disponíveis
        return meusPets.filter(
          (p) =>
            p.status === "Disponível" ||
            p.status === "DISPONIVEL" ||
            p.status === "Visita Agendada"
        );
      case "lartemporario":
        // Mantive sua lógica original
        return meusPets.filter(
          (p) => p.status === "Lar Temporário" || p.status === "LAR_TEMPORARIO"
        );
      case "doacoes":
        return []; // Renderiza componente separado
      default:
        return meusPets;
    }
  };

  const petsExibidos = getDisplayedPets();

  const displayNome =
  user?.role === "ONG" 
    ? user?.ong?.nome || user?.nome   
    : user?.nome;

  const userCity =
    user?.cidade && user?.estado
      ? `${user.cidade}, ${user.estado}`
      : user?.cidade
      ? user.cidade
      : "Localização não definida";

  if (!user)
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "4rem" }}>Faça login.</div>
      </Layout>
    );

  return (
    <Layout>
      <div className={styles.perfilContainer}>
        <div className={styles.banner}>
          <Link to="/config" className={styles.configIcon}>
            <TbSettingsFilled />
          </Link>
        </div>

        <div
          className={styles.avatar}
          onClick={handleAvatarClick}
          style={{ cursor: "pointer" }}
        >
          {preview || user?.photoURL ? (
            <img
              src={preview || user.photoURL}
              alt="Foto de perfil"
              className={styles.avatarImage}
            />
          ) : (
            <div className={styles.avatarLabel}>
              <BsFillPersonFill className={styles.avatarIcon} />
            </div>
          )}

          {/* Input real, totalmente invisível */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <UserInfo
          email={user.email}
          telefone={user.telefone}
          nome={displayNome}
          local={userCity}
        />

        {/* ABAS */}
        {isOng ? (
          <div className={styles.btnContainerWide}>
            {["adotados", "registrados", "lartemporario", "doacoes"].map(
              (tab) => {
                const labels: { [key: string]: string } = {
                  adotados: "Adotados",
                  registrados: "Registrados",
                  lartemporario: "Lar temporário",
                  doacoes: "Doações",
                };
                return (
                  <button
                    key={tab}
                    className={
                      activeView === tab ? styles.tabUm : styles.tabDois
                    }
                    onClick={() => setActiveView(tab)}
                  >
                    {labels[tab]}
                  </button>
                );
              }
            )}
          </div>
        ) : (
          <div className={styles.btnContainer}>
            <button
              className={activeView === "todos" ? styles.tabUm : styles.tabDois}
              onClick={() => setActiveView("todos")}
            >
              Meus Pets ({meusPets.length})
            </button>
            <button
              className={
                activeView === "salvos" ? styles.tabUm : styles.tabDois
              }
              onClick={() => setActiveView("salvos")}
            >
              Salvos ({outrosSalvos.length})
            </button>
          </div>
        )}

        <div className={styles.petsHeader}>
          {!isOng && (
            <h2 className={styles.petsTitulo}>
              {activeView === "todos" ? "Meus Animais" : "Meus Favoritos"}
            </h2>
          )}

          {activeView === "todos" && (
            <Link
              to="/registrar-animal"
              className={styles.addIcon}
              style={isOng ? { marginLeft: "auto" } : {}}
            >
              <BsPlus />
            </Link>
          )}
        </div>

        {/* FILTROS VISUAIS DA ONG (MANTIDOS) */}
        {isOng &&
          activeView !== "doacoes" &&
          activeView !== "lartemporario" && (
            <div className={styles.filterContainer}>
              {activeView === "adotados" ? (
                <>
                  <button className={styles.filterBadge}>Última semana</button>
                  <button className={styles.filterBadge}>Último mês</button>
                </>
              ) : (
                <>
                  <button className={styles.filterBadge}>Última semana</button>
                  <button className={styles.filterBadge}>Último mês</button>
                </>
              )}
            </div>
          )}

        {/* LISTAGEM */}
        <div
          className={styles.petsContainer}
          style={isOng ? { flexDirection: "column", alignItems: "center" } : {}}
        >
          {activeView === "doacoes" ? (
            <DonationsContent />
          ) : loading ? (
            <p>Carregando...</p>
          ) : petsExibidos.length > 0 ? (
            petsExibidos.map((pet) =>
              isOng ? (
                <OngPetRow
                  key={pet.id}
                  pet={pet}
                  onClickCard={(id) => handleCardClick(id, true)}
                />
              ) : (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onToggle={toggleFavorito}
                  onClickCard={handleCardClick}
                  isOwned={activeView === "todos"}
                />
              )
            )
          ) : (
            <p className={styles.emptyMessage}>
              Nenhum item encontrado nesta categoria.
            </p>
          )}
        </div>

        {isOng && <OngCharts activeView={activeView} />}
      </div>
    </Layout>
  );
}
