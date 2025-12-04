import { Link, useNavigate } from "react-router-dom";
import styles from "./perfil.module.css";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";
import { TbSettingsFilled } from "react-icons/tb";
import { BsFillPersonFill, BsHeart, BsHeartFill, BsPlus } from "react-icons/bs";

// Tipagem atualizada
interface Pet {
  id: number;
  nome: string;
  raca: string | null;
  sexo: string | null;
  photoURL: string | null;
  favorito?: boolean;
  // Propriedades extras para simular o layout da ONG
  status?: string;
  codigo?: string; // Ex: AD, FI
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
    <p className={styles.petRaca}>{pet.raca || "SRD"}</p>
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

// --- NOVO: CARD HORIZONTAL (ONG) ---
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
        <p className={styles.ongCardName}>{pet.nome}</p>
        <div className={styles.ongCardInfo}>
          <span>{pet.raca || "Sem raça definida (SRD)"}</span>
          <span className={styles.ongCode}>{pet.codigo || "AD."}</span>
          <br />
          <span>(SRD)</span>
        </div>
      </div>
      <div className={styles.ongCardActions}>
        <span className={styles.ongStatusText}>
          Status: {pet.status || "Disponível"}
          {pet.status === "Adotado" && pet.dataAdocao && (
            <>
              <br />
              <span style={{ fontWeight: 400, fontSize: "0.8rem" }}>
                Adotado dia: {pet.dataAdocao}
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

// --- NOVO: CONTEÚDO DA ABA DOAÇÕES ---
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

// --- DADOS DOS GRÁFICOS (MOCK) ---
const dataMonths = [
  { name: "Mai", val: 23, color: "#103f6e" },
  { name: "Jun", val: 13, color: "#103f6e" },
  { name: "Jul", val: 27, color: "#9abddf" },
  { name: "Ago", val: 18, color: "#103f6e" },
  { name: "Set", val: 22, color: "#103f6e" },
  { name: "Out", val: 7, color: "#9abddf" },
];

const dataWeek = [
  { name: "Dom", val: 1, color: "#103f6e" },
  { name: "Seg", val: 0, color: "#103f6e" },
  { name: "Ter", val: 0, color: "#103f6e" },
  { name: "Qua", val: 1, color: "#103f6e" },
  { name: "Qui", val: 1, color: "#103f6e" },
  { name: "Sex", val: 3, color: "#9abddf" },
  { name: "Sáb", val: 1, color: "#103f6e" },
];

const dataEntradas = [
  { name: "Mai", val: 23, color: "#103f6e" },
  { name: "Jun", val: 13, color: "#103f6e" },
  { name: "Jul", val: 27, color: "#9abddf" }, // Destaque
  { name: "Ago", val: 18, color: "#103f6e" },
  { name: "Set", val: 22, color: "#103f6e" },
  { name: "Out", val: 7, color: "#9abddf" },
];

const dataSaidas = [
  { name: "Mai", val: 22, color: "#103f6e" },
  { name: "Jun", val: 13, color: "#103f6e" },
  { name: "Jul", val: 27, color: "#9abddf" },
  { name: "Ago", val: 18, color: "#103f6e" },
  { name: "Set", val: 22, color: "#103f6e" },
  { name: "Out", val: 7, color: "#9abddf" },
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

// Componente Charts atualizado para receber a Tab ativa
const OngCharts = ({ activeView }: { activeView: string }) => {
  // Se não for uma das tabs que tem gráfico, não retorna nada
  if (activeView !== "adotados" && activeView !== "registrados") return null;

  return (
    <div className={styles.chartsSection}>
      {/* --- GRÁFICOS DA ABA ADOTADOS --- */}
      {activeView === "adotados" && (
        <>
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Processos de adoção (6 meses)</h3>
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

      {/* --- GRÁFICOS DA ABA REGISTRADOS --- */}
      {activeView === "registrados" && (
        <>
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Entradas de animais (6 meses)</h3>
            <SimpleBarChart data={dataEntradas} />
          </div>
          <div className={styles.chartBox}>
            <h3 className={styles.chartTitle}>Saída de animais (6 meses)</h3>
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

  const [meusPets, setMeusPets] = useState<Pet[]>([]);
  const [outrosSalvos, setOutrosSalvos] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  // Tabs para Usuário: 'todos' | 'salvos'
  // Tabs para ONG: 'adotados' | 'registrados' | 'lartemporario' | 'doacoes'
  const [activeView, setActiveView] = useState<string>("todos");

  const isOng = user?.role === "ONG";

  // Ajusta a view inicial dependendo do tipo de usuário
  useEffect(() => {
    if (isOng) setActiveView("adotados");
    else setActiveView("todos");
  }, [isOng]);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      setLoading(true);
      try {
        // Busca animais cadastrados (seja User ou ONG)
        const resMeus = await api.get("/animais/gerenciar/lista");
        // Adiciona status mockados se a API não retornar
        const meusFormatados = resMeus.data.map((p: any, index: number) => ({
          ...p,
          favorito: false,
          // Lógica MOCK para distribuir nas abas da ONG
          status: p.status || (index % 2 === 0 ? "Visita Agendada" : "Adotado"),
          codigo: index % 2 === 0 ? "AD." : "FI.",
          dataAdocao: p.status === "Adotado" ? "10/10/2025" : null,
        }));
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
        await api.delete(`/animais/${id}/desfavoritar`);
        setOutrosSalvos((prev) => prev.filter((p) => p.id !== id));
      } else {
        await api.post(`/animais/${id}/favoritar`);
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

  // Filtra os pets com base na Tab selecionada
  const getDisplayedPets = () => {
    if (!isOng) {
      return activeView === "todos" ? meusPets : outrosSalvos;
    }

    // Lógica de filtro da ONG
    switch (activeView) {
      case "adotados":
        return meusPets;
      case "registrados":
        return meusPets.filter((p) => p.status === "Disponível");
      case "lartemporario":
        return meusPets.filter((p) => p.status === "Lar Temporário");
      case "doacoes":
        return []; // A renderização será tratada via componente DonationsContent
      default:
        return meusPets;
    }
  };

  const petsExibidos = getDisplayedPets();
  const displayNome =
    user?.role === "ONG" && user?.nomeOng ? user.nomeOng : user?.nome;
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

        {/* RENDERIZAÇÃO CONDICIONAL DAS ABAS */}
        {isOng ? (
          // Abas da ONG (4 itens)
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
          // Abas do Usuário (2 itens)
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

        {/* Header e Filtros extras para ONG */}
        <div className={styles.petsHeader}>
          {!isOng && (
            <h2 className={styles.petsTitulo}>
              {activeView === "todos" ? "Meus Animais" : "Meus Favoritos"}
            </h2>
          )}

          {/* Botão de Adicionar (apenas nas tabs principais de gestão) */}
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

        {/* --- FILTROS DINÂMICOS (Baseado na Tab Ativa) --- */}
        {isOng && (
          <div className={styles.filterContainer}>
            {/* Filtros para ADOTADOS e DOAÇÕES */}
            {activeView === "adotados" && (
              <>
                <button className={styles.filterBadge}>Última semana</button>
                <button className={styles.filterBadge}>Último mês</button>
              </>
            )}

            {/* Filtros para REGISTRADOS */}
            {activeView === "registrados" && (
              <>
                <button className={styles.filterBadge}>Reg. ONG</button>
                <button className={styles.filterBadge}>Reg. site</button>
                <button className={styles.filterBadge}>Ambos</button>
              </>
            )}
          </div>
        )}

        {/* CONTAINER DE LISTAGEM */}
        <div
          className={styles.petsContainer}
          style={isOng ? { flexDirection: "column", alignItems: "center" } : {}}
        >
          {/* SE ESTIVER NA ABA DOAÇÕES, MOSTRA O CONTEÚDO NOVO */}
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

        {/* CHAMADA DOS GRÁFICOS */}
        {isOng && <OngCharts activeView={activeView} />}
      </div>
    </Layout>
  );
}
