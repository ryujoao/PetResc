import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout"; 
import styles from "./centralAdocao.module.css";

// --- Definição de Tipos ---
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
  status: string;
  porte: string | null;
  sexo: string | null;
  descricao: string | null;
  photoURL: string | null;
  createdAt: string;
  accountId: number;
  ong: OngInfo | null;
}

export default function CentralAdocao() {
  // --- Estados ---
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Filtros ---
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroPorte, setFiltroPorte] = useState("");
  const [filtroSexo, setFiltroSexo] = useState("");

  // --- Busca de Dados ---
  useEffect(() => {
    const fetchAnimais = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filtroEspecie) params.append("especie", filtroEspecie);
      if (filtroPorte) params.append("porte", filtroPorte);
      if (filtroSexo) params.append("sexo", filtroSexo);
      
      const queryString = params.toString();

      try {
        const response = await fetch(`http://localhost:3000/api/feed?${queryString}`);

        if (!response.ok) {
          throw new Error("Falha ao buscar animais. Tente novamente.");
        }

        const data: Animal[] = await response.json();
        setAnimais(data);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimais();
  }, [filtroEspecie, filtroPorte, filtroSexo]);

  return (
    <Layout>
      
      <div className={styles.pageCentralAdocao}>
        <h1 className={styles.titulo}>Centro de Adoção</h1>
        <p className={styles.subtitulo}>
          Animais disponíveis para adoção:
        </p>

        <div className={styles.containerFiltrosPets}>
          
          {/* --- Área de Filtros --- */}
          <div className={styles.filtros}>
            <h2 className={styles.tituloFiltro}>Filtros</h2>

            <div className={styles.filtroGrupo}>
              <h3>Espécie</h3>
              <select
                value={filtroEspecie}
                onChange={(e) => setFiltroEspecie(e.target.value)}
                className={styles.selectFiltro}
              >
                <option value="">Todas</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
              </select>
            </div>

            <div className={styles.filtroGrupo}>
              <h3>Gênero</h3>
              <select
                value={filtroSexo}
                onChange={(e) => setFiltroSexo(e.target.value)}
                className={styles.selectFiltro}
              >
                <option value="">Ambos</option>
                <option value="MACHO">Macho</option>
                <option value="FEMEA">Fêmea</option>
              </select>
            </div>

            <div className={styles.filtroGrupo}>
              <h3>Porte</h3>
              <select
                value={filtroPorte}
                onChange={(e) => setFiltroPorte(e.target.value)}
                className={styles.selectFiltro}
              >
                <option value="">Todos</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Medio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
            </div>

            {/* Filtros Desabilitados (Placeholder visual) */}
            <div className={styles.filtroGrupo} style={{ opacity: 0.5 }}>
              <h3>Idade (Em breve)</h3>
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
                Idoso
              </label>
            </div>

            <div className={styles.filtroGrupo} style={{ opacity: 0.5 }}>
              <h3>Raça (Em breve)</h3>
              <select disabled className={styles.selectFiltro}>
                <option value="">Todas</option>
              </select>
            </div>
          </div>

          {/* --- Lista de Pets --- */}
          <section className={styles.listaPets}>
            {loading && <p>Carregando animais...</p>}
            {error && <p className={styles.erro}>{error}</p>}

            {!loading && !error && animais.length === 0 && (
              <p>Nenhum animal encontrado com esses filtros.</p>
            )}

            {!loading && !error && animais.map((animal) => (
              <Link
                to={`/animal/${animal.id}`}
                key={animal.id}
                className={styles.cardPet}
              >
                <img
                  src={
                    animal.photoURL ||
                    "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto"
                  }
                  alt={animal.nome}
                />
                <h3>{animal.nome}</h3>
                <p>{animal.raca || "Sem raça definida"}</p>
                
                {animal.ong && (
                  <p className={styles.ongNome}>{animal.ong.nome}</p>
                )}
              </Link>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
}