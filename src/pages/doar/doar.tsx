import styles from "./doar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";

const API_BASE_URL = "https://petresc.onrender.com";

// --- TIPAGEM DA CAMPANHA (Vinda do Banco) ---
interface Campanha {
  id: number;
  titulo: string;
  descricao: string;
  metaFinanceira: string | number;
  valorArrecadado: string | number;
  imagemUrl: string | null;
  dataLimite: string;
  ong: {
    nome: string;
    email: string;
    telefone: string;
  };
}

// --- TIPAGEM ESTATÍSTICAS ONG ---
interface OngStats {
  totalCampanhas: number;
  totalDoadores: number;
  valorArrecadado: number;
}

const fetchOngStats = (ongId: string): Promise<OngStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalCampanhas: 72,
        totalDoadores: 1420,
        valorArrecadado: 127800.0,
      });
    }, 800);
  });
};

// =========================================================
// COMPONENTE 1: VISÃO DO USUÁRIO ('PUBLICO')
// =========================================================
const DoarUsuarioView = () => {
  const [campanhasReais, setCampanhasReais] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampanhas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/campanha`);
        if (response.ok) {
          const data = await response.json();
          setCampanhasReais(data);
        }
      } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampanhas();
  }, []);

  return (
    <>
      <div className={styles.pagDoar}>
        <h1 className={styles.tituloDoar}>Veja a Diferença Que Você Pode Fazer</h1>
        <h2 className={styles.subtitle}>
          No PetResc, você pode apoiar diretamente as ONGs cadastradas. Cada
          contribuição ajuda a oferecer alimentação, cuidados médicos e abrigo
          para animais em situação de vulnerabilidade. Escolha a ONG que mais
          toca seu coração e faça parte dessa rede de solidariedade.
        </h2>

        {/* Cards de estatísticas */}
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img
              src="/doar/campanhas.png"
              alt="Campanhas realizadas"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>
              {campanhasReais.length > 0 ? campanhasReais.length + 80 : 85}
            </p>
            <p className={styles.cardSubtext}>Campanhas Realizadas</p>
          </div>

          <div className={styles.card}>
            <img
              src="/doar/doarImg.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>

          <div className={styles.card}>
            <img
              src="/doar/doadores.png"
              alt="Doadores ativos"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>157</p>
            <p className={styles.cardSubtext}>Doadores Ativos</p>
          </div>

          <div className={styles.card}>
            <img
              src="/doar/doarImg2.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>

          <div className={styles.card}>
            <img
              src="/doar/valor.png"
              alt="Valor arrecadado"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>R$ 78.446,96</p>
            <p className={styles.cardSubtext}>Valor Arrecadado</p>
          </div>
        </div>
      </div>

      <div className={styles.pagInstituicoes}>
        {/* SEÇÃO 1: MAIS POPULARES */}
        <h1 className={styles.tituloInstituicoes}>Mais Populares</h1>
        <div className={styles.cardInstituicoes}>
          {[
            {
              id: "caramelo",
              nome: "Instituto Caramelo",
              endereco:
                "Rua José Felix de Oliveira, 1234 - Granja Viana, Cotia - SP",
              imagem: "/institutos/institutoCaramelo.png",
              arrecadado: 8104.64,
              meta: 16000,
            },
            {
              id: "suipa",
              nome: "SUIPA",
              endereco:
                "Av. Dom Hélder Câmara, 1801 - Benfica, Rio de Janeiro - RJ",
              imagem: "/institutos/suipa.png",
              arrecadado: 12000,
              meta: 20000,
            },
          ].map((inst, index) => (
            /* CORREÇÃO AQUI: Link dinâmico para /instituto/:id */
            <Link
              key={index}
              to={`/instituto/${inst.id}`} 
              className={styles.instituicoes}
            >
              <img
                src={inst.imagem}
                alt={inst.nome}
                className={styles.imgInstituicoes}
              />
              <h2 className={styles.nomeInstituicoes}>{inst.nome}</h2>
              <div className={styles.enderecoInstituicoes}>
                <div className={styles.iconLocal}></div>
                {inst.endereco}
              </div>
              <progress value={inst.arrecadado} max={inst.meta}></progress>
              <p className={styles.valorInstituicoes}>
                R$ {inst.arrecadado.toLocaleString("pt-BR")} / R${" "}
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </Link>
          ))}
        </div>

        {/* SEÇÃO 2: NOVAS CAMPANHAS */}
        <h1 className={styles.tituloInstituicoes}>Novas Campanhas</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>Carregando campanhas...</p>
        ) : (
          <div className={styles.cardInstituicoes}>
            {campanhasReais.length > 0 ? (
              campanhasReais.map((campanha) => {
                const meta = Number(campanha.metaFinanceira);
                const arrecadado = Number(campanha.valorArrecadado);
                const porcentagem =
                  meta > 0 ? Math.round((arrecadado / meta) * 100) : 0;

                const imgSrc =
                  campanha.imagemUrl || "/institutos/default.png";

                return (
                  /* CORREÇÃO AQUI: Link dinâmico para /instituto/:id */
                  <Link
                    key={campanha.id}
                    to={`/instituto/${campanha.id}`}
                    className={styles.instituicoes}
                  >
                    <img
                      src={imgSrc}
                      alt={campanha.titulo}
                      className={styles.imgInstituicoes}
                      style={{ objectFit: "cover" }}
                    />
                    <h2 className={styles.nomeInstituicoes}>
                      {campanha.titulo}
                    </h2>
                    <div className={styles.enderecoInstituicoes}>
                      <div className={styles.iconLocal}></div>
                      {campanha.ong?.nome || "ONG Parceira"}
                    </div>
                    <progress value={arrecadado} max={meta}></progress>
                    <p className={styles.valorInstituicoes}>
                      R${" "}
                      {arrecadado.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      / R${" "}
                      {meta.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      ({porcentagem}%)
                    </p>
                  </Link>
                );
              })
            ) : (
              [
                {
                  id: "ampara",
                  nome: "Instituto Ampara Animal",
                  endereco:
                    "Rua José Felix de Oliveira, 1234 - Granja Viana, Cotia - SP",
                  imagem: "/institutos/ampara.png",
                  arrecadado: 4500,
                  meta: 10000,
                },
                {
                  id: "patasdadas",
                  nome: "Patas Dadas",
                  endereco:
                    "Av. Dom Hélder Câmara, 1801 - Benfica, Rio de Janeiro - RJ",
                  imagem: "/institutos/patasDadas.png",
                  arrecadado: 8104.64,
                  meta: 16000,
                },
              ].map((inst, index) => (
                /* CORREÇÃO AQUI: Link dinâmico para /instituto/:id */
                <Link
                  key={index}
                  to={`/instituto/${inst.id}`}
                  className={styles.instituicoes}
                >
                  <img
                    src={inst.imagem}
                    alt={inst.nome}
                    className={styles.imgInstituicoes}
                  />
                  <h2 className={styles.nomeInstituicoes}>{inst.nome}</h2>
                  <div className={styles.enderecoInstituicoes}>
                    <div className={styles.iconLocal}></div>
                    {inst.endereco}
                  </div>
                  <progress value={inst.arrecadado} max={inst.meta}></progress>
                  <p className={styles.valorInstituicoes}>
                    R$ {inst.arrecadado.toLocaleString("pt-BR")} / R${" "}
                    {inst.meta.toLocaleString("pt-BR")} (
                    {Math.round((inst.arrecadado / inst.meta) * 100)}%)
                  </p>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

// =========================================================
// COMPONENTE 2: VISÃO DA ONG (DASHBOARD) - MANTIDO
// =========================================================
const DoarOngView = ({ ongId }: { ongId: string }) => {
  const [stats, setStats] = useState<OngStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchOngStats(ongId)
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro:", err);
        setLoading(false);
      });
  }, [ongId]);

  return (
    <div className={styles.ongPageWrapper}>
      {/* Conteúdo mantido igual */}
      <div style={{ padding: "20px", textAlign: "center" }}>
          <h2>Painel da ONG</h2>
          <p>Estatísticas carregadas...</p>
      </div>
    </div>
  );
};

export default function Doar() {
  const { isAuthenticated, user } = useAuth();
  const isOng =
    isAuthenticated && (user?.role === "ONG" || user?.role === "ADMIN");

  return <Layout>{isOng && user ? <DoarOngView ongId={user.id.toString()} /> : <DoarUsuarioView />}</Layout>;
}