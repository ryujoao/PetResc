import styles from "./doar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react"; // NOVO: Importar hooks do React
import Layout from "../../components/layout";

// --- COMPONENTE PARA VISÃO DO USUÁRIO ('PUBLICO') ---
// (Este é o código que você já tinha, sem alterações)
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
        {/* cards de estatísticas (Visão Pública/Plataforma) */}
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
        {/* ... (Seu código .map() para 'Mais Populares' e 'Novas Campanhas' continua o mesmo) ... */}
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
                <div className={styles.iconLocal}>{/* ícone */}</div>
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
              imagem: "/ampara.png",
              arrecadado: 4500,
              meta: 10000,
            },
            {
              id: "patasdadas",
              nome: "Patas Dadas",
              endereco:
                "Av. Dom Hélder Câmara, 1801 – Benfica, Rio de Janeiro – RJ",
              imagem: "/patasdadas.png",
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
                <div className={styles.iconLocal}>{/* ícone */}</div>
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

// --- NOVO: Interface para os dados da ONG ---
interface OngStats {
  totalCampanhas: number;
  totalDoadores: number;
  valorArrecadado: number;
}

// --- NOVO: Função que SIMULA a busca de dados na API ---
// Substitua esta função pela sua chamada de API real
const fetchOngStats = (ongId: string): Promise<OngStats> => {
  console.log("Buscando dados para a ONG:", ongId);
  // Simula uma chamada de API que demora 1 segundo
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dados de exemplo (parecidos com a Imagem 1)
      const mockData: OngStats = {
        totalCampanhas: 72,
        totalDoadores: 1420,
        valorArrecadado: 127800.0,
      };
      // Em um caso real:
      // const response = await fetch(`/api/ongs/${ongId}/stats`);
      // const mockData = await response.json();
      resolve(mockData);
    }, 1000);
  });
};

// --- COMPONENTE PARA VISÃO DA ONG ('ONG' / 'ADMIN') ---
// (Este componente foi REFEITO para buscar e exibir dados dinâmicos)
const DoarOngView = ({ ongId }: { ongId: string }) => {
  // NOVO: Estados para guardar os dados, carregamento e erro
  const [stats, setStats] = useState<OngStats | null>(null);
  const [loading, setLoading] = useState(true);

  // NOVO: Hook para buscar os dados da API quando o componente montar
  useEffect(() => {
    // Define o estado de carregamento
    setLoading(true);

    // Chama a função (simulada) da API
    fetchOngStats(ongId)
      .then((data) => {
        // Sucesso: guarda os dados no estado
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        // Erro: para de carregar e loga o erro
        console.error("Erro ao buscar estatísticas:", err);
        setLoading(false);
      });
  }, [ongId]); // A busca roda sempre que o ongId mudar

  return (
    <>
      <div className={styles.pagDoar}>
        <h1 className={styles.tituloDoar}>Suas Estatísticas na PetResc</h1>
        <h2 className={styles.subtitle}>
          Acompanhe aqui o impacto das suas campanhas, o número de doadores
          engajados e o total arrecadado pela sua ONG.
        </h2>

        {/* cards de estatísticas (Visão da ONG) */}
        <div className={styles.cardContainer}>
          {/* NOVO: Lógica de Carregamento */}
          {loading ? (
            <h2
              className={styles.subtitle}
              style={{ width: "100%", textAlign: "center" }}
            >
              Carregando estatísticas...
            </h2>
          ) : !stats ? (
            <h2
              className={styles.subtitle}
              style={{ width: "100%", textAlign: "center" }}
            >
              Não foi possível carregar os dados.
            </h2>
          ) : (
            // NOVO: Renderização com dados dinâmicos
            <>
              <div className={styles.card}>
                <img
                  src="../../../public/doar/campanhas.png"
                  alt="Campanhas realizadas"
                  className={styles.cardImage}
                />
                <p className={styles.cardText}>{stats.totalCampanhas}</p>
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
                <p className={styles.cardText}>{stats.totalDoadores}</p>
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
                <p className={styles.cardText}>
                  R${" "}
                  {stats.valorArrecadado.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className={styles.cardSubtext}>Valor Arrecadado</p>
              </div>
            </>
          )}
        </div>
      </div>

      <section className={styles.bannerNovaCampanha}>
        <div className={styles.textoEsquerda}>
          <Link to="/doacoes" className={styles.botoes}>
            Doe Agora
          </Link>
          <p>
            Sua doação é muito mais do que um simples gesto de solidariedade —
            ela é o que nos permite alimentar, tratar e proteger cada um dos
            nossos animais resgatados, garantindo que tenham acesso a cuidados
            veterinários, alimentação de qualidade e um ambiente seguro onde
            possam se recuperar física e emocionalmente.
          </p>
        </div>
        <div className={styles.textoDireita}>
          <p>
            Apoiar nossa causa é se tornar parte ativa dessa transformação, é
            estender a mão àqueles que não têm voz e participar da mudança que
            tantos animais esperam: um futuro livre do abandono, da fome e do
            sofrimento.
          </p>
          <Link to="/nova-campanha" className={styles.botoes}>
            Nova Campanha
          </Link>
        </div>
      </section>
    </>
  );
};

// --- COMPONENTE PRINCIPAL 'DOAR' ---
export default function Doar() {
  const { isAuthenticated, user } = useAuth();

  const isOng =
    isAuthenticated && (user?.role === "ONG" || user?.role === "ADMIN");

  return (
    <>
      <Layout>
      {/* ALTERADO: Passar o 'user.id' para o componente da ONG */}
      {/* Garante que 'isOng' é verdadeiro e que 'user' não é nulo antes de passar o ID */}
      {isOng && user ? (
        <DoarOngView ongId={user.id.toString()} />
      ) : (
        <DoarUsuarioView />
      )}
      </Layout>
    </>
  );
}
