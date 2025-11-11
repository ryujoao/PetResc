import styles from "./centralAdocao.module.css";
import Nav from "../../components/navbar";
// Importe o 'useEffect' para buscar dados
import { useLayoutEffect, useRef, useState, useEffect } from "react";
// Importe o 'Link' para que os cards sejam clicáveis
import { Link } from "react-router-dom"; // (Se você não usa react-router, troque por <a>)

// --- INÍCIO: Definição de Tipos ---
// Ajuda o TypeScript a entender os dados do animal que vêm da API
interface OngInfo {
  id: number;
  nome: string;
  endereco: string;
}

interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca: string | null;
  idade: number | null;
  status: string; // DISPONIVEL, ADOTADO, etc.
  porte: string | null;
  sexo: string | null;
  descricao: string | null;
  photoURL: string | null;
  createdAt: string;
  accountId: number;
  ong: OngInfo | null; // A ONG que o backend anexa
}
// --- FIM: Definição de Tipos ---

export default function CentralAdocao() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  // --- INÍCIO: Estados da Página ---
  // Estado para guardar a lista de animais vinda do backend
  const [animais, setAnimais] = useState<Animal[]>([]);
  // Estados para controlar o carregamento e erros
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para os filtros
  // (Note que seu backend espera 'especie', 'porte' e 'sexo')
  const [filtroEspecie, setFiltroEspecie] = useState(""); // Ex: "Cachorro"
  const [filtroPorte, setFiltroPorte] = useState(""); // Ex: "Medio"
  const [filtroSexo, setFiltroSexo] = useState(""); // Ex: "MACHO"
  // --- FIM: Estados da Página ---

  useLayoutEffect(() => {
    // ... seu código de layout (não mudei) ...
    setTimeout(() => {
      const pageEl = pageRef.current;
      if (!pageEl) return;
      const topBar = document.querySelector(".topBar") as HTMLElement | null;
      const navBar = document.querySelector(".navbar") as HTMLElement | null;
      const topHeight = topBar?.offsetHeight ?? 0;
      const navHeight = navBar?.offsetHeight ?? 0;
      const totalHeight = topHeight + navHeight;
      pageEl.style.paddingTop = `${totalHeight}px`;
      pageEl.style.minHeight = `calc(100vh - ${totalHeight}px)`;
    }, 0);
  }, []);

  // --- INÍCIO: Lógica de Busca de Dados ---
  // Este 'useEffect' roda quando a página carrega e
  // toda vez que um dos filtros (dependências) mudar.
  useEffect(() => {
    const fetchAnimais = async () => {
      setLoading(true);
      setError(null);

      // 1. Constrói a string de consulta (query string) com base nos filtros
      const params = new URLSearchParams();
      if (filtroEspecie) params.append('especie', filtroEspecie);
      if (filtroPorte) params.append('porte', filtroPorte);
      if (filtroSexo) params.append('sexo', filtroSexo);
      const queryString = params.toString();

      try {
       const response = await fetch(`http://localhost:3000/api/feed?${queryString}`);

        if (!response.ok) {
          throw new Error('Falha ao buscar animais. Tente novamente.');
        }

        const data: Animal[] = await response.json();
        setAnimais(data); 
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };


    fetchAnimais();
  }, [filtroEspecie, filtroPorte, filtroSexo]); 
  // --- FIM: Lógica de Busca de Dados ---

  return (
    <>
      <Nav />
      <div ref={pageRef} className={styles.pageCentralAdocao}>
        <h1 className={styles.titulo}>Centro de Adoção</h1>
        <p className={styles.subtitulo}>
          Animais disponíveis para adoção:
        </p>

        <div className={styles.containerFiltrosPets}>
          <div className={styles.filtros}>
            <h2 className={styles.tituloFiltro}>Filtros</h2>

            {/*
             * NOTA: Mudei os checkboxes para <select> (dropdowns).
             * Seu backend espera um valor (ex: "Cachorro"), e não múltiplos.
             * O <select> se encaixa melhor nessa lógica.
            */}

            <div className={styles.filtroGrupo}>
              <h3>Espécie</h3>
              {/* Ligado ao estado 'filtroEspecie' */}
              <select value={filtroEspecie} onChange={(e) => setFiltroEspecie(e.target.value)} className={styles.selectFiltro}> {/* Adicione um style para select se precisar */}
                <option value="">Todas</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                {/* Adicione "Passaros", "Outros" se o backend suportar */}
              </select>
            </div>

            <div className={styles.filtroGrupo}>
              <h3>Gênero</h3>
              {/* Ligado ao estado 'filtroSexo' */}
              <select value={filtroSexo} onChange={(e) => setFiltroSexo(e.target.value)} className={styles.selectFiltro}>
                <option value="">Ambos</option>
                <option value="MACHO">Macho</option>
                <option value="FEMEA">Fêmea</option>
              </select>
            </div>

            <div className={styles.filtroGrupo}>
              <h3>Porte</h3>
              {/* Ligado ao estado 'filtroPorte' */}
              <select value={filtroPorte} onChange={(e) => setFiltroPorte(e.target.value)} className={styles.selectFiltro}>
                <option value="">Todos</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Medio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            {/* Estes filtros não são suportados pelo seu backend (feedController.js) ainda */}
            <div className={styles.filtroGrupo} style={{ opacity: 0.5 }}>
              <h3>Idade (Não implementado)</h3>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" disabled />
                <span className={styles.checkmark}></span>
                Filhote
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" disabled />
                <span className={styles.checkmark}></span>
                Adulto
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" disabled />
                <span className={styles.checkmark}></span>
D               Idoso
              </label>
            </div>

            <div className={styles.filtroGrupo} style={{ opacity: 0.5 }}>
              <h3>Cor (Não implementado)</h3>
              {/* ... seus checkboxes de cor ... */}
            </div>

            <div className={styles.filtroGrupo} style={{ opacity: 0.5 }}>
              <h3>Raça (Não implementado)</h3>
              <select disabled>
                <option value="">Todas</option>
              </select>
            </div>
          </div>

          {/* --- INÍCIO: Renderização Dinâmica dos Pets --- */}
          <section className={styles.listaPets}>
            {loading && <p>Carregando animais...</p>}
            {error && <p className={styles.erro}>{error}</p>}
            
            {!loading && !error && animais.length === 0 && (
              <p>Nenhum animal encontrado com esses filtros.</p>
            )}

            {!loading && !error && animais.map((animal) => (
              // Use o 'Link' para tornar o card clicável
              <Link to={`/animal/${animal.id}`} key={animal.id} className={styles.cardPet}>
                <img 
                  // Use a 'photoURL' vinda do backend
                  src={animal.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto"} 
                  alt={animal.nome} 
                />
                <h3>{animal.nome}</h3>
G             <p>{animal.raca || "Sem raça definida"}</p>
                {/* Mostra o nome da ONG se ela existir */}
                {animal.ong && (
                  <p className={styles.ongNome}>{animal.ong.nome}</p>
                )}
              </Link>
            ))}
          </section>
          {/* --- FIM: Renderização Dinâmica dos Pets --- */}
        </div>
      </div>
    </>
  );
}