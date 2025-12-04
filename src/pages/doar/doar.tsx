import styles from "./doar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";

// --- TIPAGEM ---
interface OngStats {
  totalCampanhas: number;
  totalDoadores: number;
  valorArrecadado: number;
}

// --- SIMULAÇÃO DE DADOS (API) ---
const fetchOngStats = (ongId: string): Promise<OngStats> => {
  console.log("Buscando dados para a ONG:", ongId);
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
// COMPONENTE 1: VISÃO DO USUÁRIO ('PUBLICO') - LAYOUT ORIGINAL
// =========================================================
const DoarUsuarioView = () => {
  return (
    <>
      <div className={styles.pagDoar}>
        <h1 className={styles.tituloDoar}>
          Veja a Diferença Que Você Pode Fazer
        </h1>
        <h2 className={styles.subtitle}>
          No PetResc, você pode apoiar diretamente as ONGs cadastradas. Cada
          contribuição ajuda a oferecer alimentação, cuidados médicos e abrigo
          para animais em situação de vulnerabilidade. Escolha a ONG que mais
          toca seu coração e faça parte dessa rede de solidariedade.
        </h2>

        {/* cards de estatísticas (Visão Original) */}
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img
              src="../../../public/doar/campanhas.png"
              alt="Campanhas realizadas"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>85</p>
            <p className={styles.cardSubtext}>Campanhas Realizadas</p>
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/doarImg.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/doadores.png"
              alt="Doadores ativos"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>157</p>
            <p className={styles.cardSubtext}>Doadores Ativos</p>
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/doarImg2.png"
              alt="Pessoas beneficiadas"
              className={styles.cardImage}
            />
          </div>
          <div className={styles.card}>
            <img
              src="../../../public/doar/valor.png"
              alt="Valor arrecadado"
              className={styles.cardImage}
            />
            <p className={styles.cardText}>R$ 78.446,96</p>
            <p className={styles.cardSubtext}>Valor Arrecadado</p>
          </div>
        </div>
      </div>

      <div className={styles.pagInstituicoes}>
        <h1 className={styles.tituloInstituicoes}>Mais Populares</h1>
        <div className={styles.cardInstituicoes}>
          {[
            {
              id: "caramelo",
              nome: "Instituto Caramelo",
              endereco:
                "Rua José Felix de Oliveira, 1234 – Granja Viana, Cotia – SP",
              imagem: "../../../public/institutos/institutoCaramelo.png",
              arrecadado: 8104.64,
              meta: 16000,
            },
            {
              id: "suipa",
              nome: "SUIPA",
              endereco:
                "Av. Dom Hélder Câmara, 1801 – Benfica, Rio de Janeiro – RJ",
              imagem: "../../../public/institutos/suipa.png",
              arrecadado: 12000,
              meta: 20000,
            },
          ].map((inst, index) => (
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
              <p className={styles.enderecoInstituicoes}>
                <div className={styles.iconLocal}></div>
                {inst.endereco}
              </p>
              <progress value={inst.arrecadado} max={inst.meta}></progress>
              <p className={styles.valorInstituicoes}>
                R$ {inst.arrecadado.toLocaleString("pt-BR")} / R${" "}
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </Link>
          ))}
        </div>

        <h1 className={styles.tituloInstituicoes}>Novas Campanhas</h1>
        <div className={styles.cardInstituicoes}>
          {[
            {
              id: "ampara",
              nome: "Instituto Ampara Animal",
              endereco:
                "Rua José Felix de Oliveira, 1234 – Granja Viana, Cotia – SP",
              imagem: "../../../public/institutos/ampara.png",
              arrecadado: 4500,
              meta: 10000,
            },
            {
              id: "patasdadas",
              nome: "Patas Dadas",
              endereco:
                "Av. Dom Hélder Câmara, 1801 – Benfica, Rio de Janeiro – RJ",
              imagem: "../../../public/institutos/patasDadas.png",
              arrecadado: 8104.64,
              meta: 16000,
            },
          ].map((inst, index) => (
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
              <p className={styles.enderecoInstituicoes}>
                <div className={styles.iconLocal}></div>
                {inst.endereco}
              </p>
              <progress value={inst.arrecadado} max={inst.meta}></progress>
              <p className={styles.valorInstituicoes}>
                R$ {inst.arrecadado.toLocaleString("pt-BR")} / R${" "}
                {inst.meta.toLocaleString("pt-BR")} (
                {Math.round((inst.arrecadado / inst.meta) * 100)}%)
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

// =========================================================
// COMPONENTE 2: VISÃO DA ONG (DASHBOARD) - LAYOUT NOVO
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
      {/* --- SEÇÃO SUPERIOR (AZUL) --- */}
      <section className={styles.ongTopSection}>
        <h1 className={styles.tituloDoar}>Veja A Diferença Que Você Pode Fazer</h1>
        <h2 className={styles.subtitle}>
          No PetResc, você pode apoiar diretamente as ONGs cadastradas. Cada
          contribuição ajuda a oferecer alimentação, cuidados médicos e abrigo
          para animais em situação de vulnerabilidade. Escolha a ONG que mais
          toca seu coração e faça parte dessa rede de solidariedade.
        </h2>

        {loading ? (
          <p style={{ color: "#fff", fontSize: "1.5rem" }}>Carregando...</p>
        ) : !stats ? (
          <p style={{ color: "#fff" }}>Erro ao carregar dados.</p>
        ) : (
          /* GRID MOSAICO (Dados da Própria ONG) */
          <div className={styles.mosaicGrid}>
            <div className={styles.mosaicCol}>
              <img
                src="../../../public/doar/campanhas.png"
                alt="Campanhas"
                className={styles.mosaicImg}
              />
              <div className={styles.mosaicCard}>
                <span className={styles.mosaicValue}>
                  {stats.totalCampanhas}
                </span>
                <span className={styles.mosaicLabel}>Campanhas Realizadas</span>
              </div>
            </div>

            <div className={styles.mosaicCol}>
              <img
                src="../../../public/doar/doarImg.png"
                alt="Mãos"
                className={`${styles.mosaicImg} ${styles.tallImg}`}
              />
            </div>

            <div className={styles.mosaicCol}>
              <div className={styles.mosaicCard} style={{ marginBottom: "0" }}>
                <span className={styles.mosaicValue}>
                  {stats.totalDoadores}
                </span>
                <span className={styles.mosaicLabel}>Doadores Ativos</span>
              </div>
              <img
                src="../../../public/doar/doadores.png"
                alt="Doadores"
                className={styles.mosaicImg}
              />
            </div>

            <div className={styles.mosaicCol}>
              <img
                src="../../../public/doar/doarImg2.png"
                alt="Animais"
                className={styles.mosaicImg}
                style={{ height: "180px" }}
              />
              <div className={styles.mosaicCard}>
                <span className={styles.mosaicValue}>
                  R${" "}
                  {stats.valorArrecadado.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className={styles.mosaicLabel}>Valor Arrecadado</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* --- SEÇÃO INFERIOR (BRANCA COM CACHORRO GIGANTE) --- */}
      <section className={styles.ongBottomSection}>
        <div className={styles.bottomContent}>
          {/* Lado Esquerdo */}
          <div className={`${styles.bottomSide} ${styles.textLeft}`}>
            {/* Link para uma campanha específica onde a ONG pode doar */}
            <Link to="/campanhas-anteriores" className={styles.btnBlue}>
              VER CAMPANHAS ANTERIORES
            </Link>
            <p>
              Sua doação é muito mais do que um simples gesto de solidariedade —
              ela é o que nos permite alimentar, tratar e proteger cada um dos
              nossos animais resgatados, garantindo que tenham acesso a cuidados
              veterinários, alimentação de qualidade e um ambiente seguro onde
              possam se recuperar física e emocionalmente.
            </p>
          </div>

          {/* Imagem Central */}
          <div className={styles.centerDogContainer}>
            <img
              src="../../../public/banners/cachorroDoar.png"
              alt="Cachorro olhando"
              className={styles.centerDogImg}
            />
          </div>

          {/* Lado Direito */}
          <div className={`${styles.bottomSide} ${styles.textRight}`}>
            <p>
              Apoiar nossa causa é se tornar parte ativa dessa transformação, é
              estender a mão àqueles que não têm voz e participar da mudança que
              tantos animais esperam: um futuro livre do abandono, da fome e do
              sofrimento.
            </p>
            <Link to="/nova-campanha" className={styles.btnBlue}>
              CRIAR NOVA CAMPANHA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// =========================================================
// COMPONENTE PRINCIPAL (CONTROLADOR)
// =========================================================
export default function Doar() {
  const { isAuthenticated, user } = useAuth();

  // Verifica se é ONG/Admin
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
