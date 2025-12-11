import styles from "./doar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";

// const API_BASE_URL = "https://petresc.onrender.com"; // Comentado para não usar a API real

// =========================================================
// TIPAGEM DA CAMPANHA (Banco)
// =========================================================
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

// --- DADOS MOCKADOS PARA SIMULAR A RESPOSTA DA API ---
const mockCampanhasApi: Campanha[] = [
  {
    id: 101,
    titulo: "Alimentação e Resgate na Grande SP",
    descricao: "Foco em áreas rurais para resgate de animais em situação de risco.",
    metaFinanceira: 15000,
    valorArrecadado: 3800.5,
    imagemUrl: "/institutos/ampara.png",
    dataLimite: "2026-03-30T00:00:00.000Z",
    ong: {
      nome: "Instituto Ampara Animal",
      email: "contato@ampara.com",
      telefone: "11999998888",
    },
  },
  {
    id: 102,
    titulo: "Reforma do Canil Principal",
    descricao: "Necessidade de troca de telhado e piso para garantir higiene e segurança.",
    metaFinanceira: 25000,
    valorArrecadado: 12000,
    imagemUrl: "/institutos/default.png", // Imagem padrão
    dataLimite: "2026-01-15T00:00:00.000Z",
    ong: {
      nome: "Ajudantes do Patas",
      email: "contato@ajudantes.com",
      telefone: "21999997777",
    },
  },
  {
    id: 103,
    titulo: "Medicamentos de Alto Custo",
    descricao: "Campanha para custear tratamentos complexos de animais com doenças crônicas.",
    metaFinanceira: 5000,
    valorArrecadado: 4900,
    imagemUrl: "/institutos/patasDadas.png",
    dataLimite: "2025-12-31T00:00:00.000Z",
    ong: {
      nome: "Patas Dadas",
      email: "contato@patasdadas.com",
      telefone: "51999996666",
    },
  },
];

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
// COMPONENTE 1 — VISÃO DO USUÁRIO
// =========================================================
const DoarUsuarioView = () => {
  const [campanhasReais, setCampanhasReais] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampanhasMock = async () => {
      console.log("Simulando busca de campanhas da API...");
      try {
        // Simula o tempo de latência da API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Retorna os dados mockados
        setCampanhasReais(mockCampanhasApi);

      } catch (error) {
        console.error("Erro ao buscar campanhas mockadas:", error);
        // Em caso de falha (embora improvável com mock), seta array vazio
        setCampanhasReais([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCampanhasMock(); // Usa a função mockada
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
            <img src="/doar/campanhas.png" className={styles.cardImage} />
            <p className={styles.cardText}>
              {campanhasReais.length > 0 ? campanhasReais.length + 80 : 85}
            </p>
            <p className={styles.cardSubtext}>Campanhas Realizadas</p>
          </div>

          <div className={styles.card}>
            <img src="/doar/doarImg.png" className={styles.cardImage} />
          </div>

          <div className={styles.card}>
            <img src="/doar/doadores.png" className={styles.cardImage} />
            <p className={styles.cardText}>157</p>
            <p className={styles.cardSubtext}>Doadores Ativos</p>
          </div>

          <div className={styles.card}>
            <img src="/doar/doarImg2.png" className={styles.cardImage} />
          </div>

          <div className={styles.card}>
            <img src="/doar/valor.png" className={styles.cardImage} />
            <p className={styles.cardText}>R$ 78.446,96</p>
            <p className={styles.cardSubtext}>Valor Arrecadado</p>
          </div>
        </div>
      </div>

      {/* ===================== Instituições ===================== */}
      <div className={styles.pagInstituicoes}>
        {/* SEÇÃO 1: MAIS POPULARES - IDs MOCKADOS Corrigidos*/}
        <h1 className={styles.tituloInstituicoes}>Mais Populares</h1>

        <div className={styles.cardInstituicoes}>
          {[
            {
              // ID alterado de 'caramelo' para 'instituto-caramelo' para bater com o mock do institutos.tsx
              id: "instituto-caramelo", 
              nome: "Instituto Caramelo",
              endereco:
                "Rua José Felix de Oliveira, 1234 - Granja Viana, Cotia - SP",
              imagem: "/institutos/institutoCaramelo.png",
              arrecadado: 8304.64, // Valor ajustado
              meta: 16000,
            },
            {
              // ID alterado de '5' para 'suipa' para bater com o mock do institutos.tsx
              id: "suipa", 
              nome: "SUIPA",
              endereco:
                "Av. Dom Hélder Câmara, 1801 - Benfica, Rio de Janeiro - RJ",
              imagem: "/institutos/suipa.png",
              arrecadado: 12000,
              meta: 20000,
            },
          ].map((inst, index) => (
            <Link
              key={index}
              // CORREÇÃO: Usando /institutos/ (plural)
              to={`/institutos/${inst.id}`} 
              className={styles.instituicoes}
            >
              <img src={inst.imagem} className={styles.imgInstituicoes} />
              <h2 className={styles.nomeInstituicoes}>{inst.nome}</h2>

              <div className={styles.enderecoInstituicoes}>
                <div className={styles.iconLocal}></div>
                {inst.endereco}
              </div>

              <progress value={inst.arrecadado} max={inst.meta}></progress>

              <p className={styles.valorInstituicoes}>
                R$
                {inst.arrecadado.toLocaleString("pt-BR")} / R$
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </Link>
          ))}
        </div>

        {/* SEÇÃO 2: NOVAS CAMPANHAS (Agora usando o mockCampanhasApi) */}
        <h1 className={styles.tituloInstituicoes}>Novas Campanhas</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>Carregando campanhas...</p>
        ) : (
          <div className={styles.cardInstituicoes}>
            {campanhasReais.length > 0 ? (
              // EXIBE DADOS MOCKADOS (campanhasReais)
              campanhasReais.map((campanha) => {
                const meta = Number(campanha.metaFinanceira);
                const arrecadado = Number(campanha.valorArrecadado);
                const porcentagem =
                  meta > 0 ? Math.round((arrecadado / meta) * 100) : 0;

                const imgSrc = campanha.imagemUrl || "/institutos/default.png";

                return (
                  <Link
                    key={campanha.id}
                    // CORREÇÃO: Usando /institutos/ (plural)
                    to={`/institutos/${campanha.id}`} 
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
                      R$
                      {arrecadado.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      / R$
                      {meta.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      ({porcentagem}%)
                    </p>
                  </Link>
                );
              })
            ) : (
              // FALLBACK (Se o mockCampanhasApi falhar por algum motivo, exibe o fallback)
              [
                {
                  // ID alterado de 'ampara' para 'ampara-animal' para bater com o mock do institutos.tsx
                  id: "ampara-animal", 
                  nome: "Instituto Ampara Animal",
                  endereco:
                    "Rua José Felix de Oliveira, 1234 - Granja Viana, Cotia - SP",
                  imagem: "/institutos/ampara.png",
                  arrecadado: 4500,
                  meta: 10000,
                },
                {
                   // ID alterado de 'patasdadas' para 'patas-dadas' para bater com o mock do institutos.tsx
                  id: "patas-dadas", 
                  nome: "Patas Dadas",
                  endereco:
                    "Av. Dom Hélder Câmara, 1801 - Benfica, Rio de Janeiro - RJ",
                  imagem: "/institutos/patasDadas.png",
                  arrecadado: 8104.64,
                  meta: 16000,
                },
              ].map((inst, index) => (
                <Link
                  key={index}
                  // CORREÇÃO: Usando /institutos/ (plural)
                  to={`/institutos/${inst.id}`} 
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
// COMPONENTE 2 — VISÃO DA ONG
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
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Painel da ONG</h2>
        <p>Estatísticas carregadas...</p>
      </div>
    </div>
  );
};

// =========================================================
// EXPORT PRINCIPAL
// =========================================================
export default function Doar() {
  const { isAuthenticated, user } = useAuth();

  const isOng =
    isAuthenticated && (user?.role === "ONG" || user?.role === "ADMIN");

  return (
    <Layout>
      {isOng && user ? (
        <DoarOngView ongId={user.id.toString()} />
      ) : (
        <DoarUsuarioView />
      )}
    </Layout>
  );
}
