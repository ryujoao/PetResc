import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./centralAdocao.module.css";

interface AccountInfo {
  id: number;
  nome: string;
  email: string;
  telefone: string;
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
  account: AccountInfo | null; 
}

export default function CentralAdocao() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroPorte, setFiltroPorte] = useState("");
  const [filtroSexo, setFiltroSexo] = useState("");

  useEffect(() => {
    const fetchAnimais = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append("status", "DISPONIVEL"); 

        if (filtroEspecie) params.append("especie", filtroEspecie);
        if (filtroPorte) params.append("porte", filtroPorte);
        if (filtroSexo) params.append("sexo", filtroSexo);

        const response = await fetch(`https://petresc.onrender.com/api/animais?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar animais.");
        }

        const data = await response.json();
        setAnimais(data);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar o feed de adoção.");
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
          Encontre seu novo melhor amigo:
        </p>

        <div className={styles.containerFiltrosPets}>
          
          {/* --- BARRA DE FILTROS --- */}
          <div className={styles.filtros}>
            
            {/* Filtro Espécie */}
            <select 
              value={filtroEspecie} 
              onChange={(e) => setFiltroEspecie(e.target.value)}
              className={styles.selectFiltro}
            >
              <option value="">Todas as Espécies</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>

            {/* Filtro Porte */}
            <select 
              value={filtroPorte} 
              onChange={(e) => setFiltroPorte(e.target.value)}
              className={styles.selectFiltro}
            >
              <option value="">Qualquer Porte</option>
              <option value="Pequeno">Pequeno</option>
              <option value="Medio">Médio</option>
              <option value="Grande">Grande</option>
            </select>

            {/* Filtro Sexo */}
            <select 
              value={filtroSexo} 
              onChange={(e) => setFiltroSexo(e.target.value)}
              className={styles.selectFiltro}
            >
              <option value="">Qualquer Sexo</option>
              <option value="MACHO">Macho</option>
              <option value="FEMEA">Fêmea</option>
            </select>
          </div>

          {/* --- LISTA DE PETS --- */}
          <section className={styles.listaPets}>
            {loading && <p className={styles.loadingText}>Buscando amigos...</p>}
            {error && <p className={styles.errorText}>{error}</p>}
            
            {!loading && !error && animais.length === 0 && (
                <p>Nenhum animal encontrado com esses filtros.</p>
            )}

            {!loading && !error && animais.map((animal) => (
              <Link
                // ID na rota para evitar nomes duplicados
                to={`/animal/${animal.id}`} 
                key={animal.id}
                className={styles.cardPet}
              >
                <div className={styles.imageWrapper}>
                    <img
                    src={animal.photoURL || "https://placehold.co/300x300?text=Sem+Foto"}
                    alt={animal.nome}
                    className={styles.petImage}
                    />
                </div>
                
                <div className={styles.cardContent}>
                    <h3>{animal.nome}</h3>
                    <p className={styles.raca}>{animal.raca || "Raça não definida"}</p>
                    
                    <div className={styles.tags}>
                        <span>{animal.sexo === 'MACHO' ? '♂ Macho' : '♀ Fêmea'}</span>
                        {animal.idade && <span>• {animal.idade} anos</span>}
                    </div>

                    {animal.account && (
                    <p className={styles.ongNome}>
                        Resgatado por: <strong>{animal.account.nome}</strong>
                    </p>
                    )}
                </div>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
}