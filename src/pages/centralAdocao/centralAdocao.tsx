import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./centralAdocao.module.css";
// --- IMPORTAÇÃO DAS CONSTANTES CENTRALIZADAS ---
import { 
    OPCOES_ESPECIE, 
    OPCOES_GENERO, 
    OPCOES_PORTE, 
    OPCOES_IDADE, 
    CORES_PREDOMINANTES 
} from "../../constants/opcoesAnimais"; 

// --- Definição de Tipos ---
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
// --- Estados ---
const [animais, setAnimais] = useState<Animal[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// --- Filtros (Radio Buttons/Seleção Única) ---
const [filtroEspecie, setFiltroEspecie] = useState("");
const [filtroPorte, setFiltroPorte] = useState("");
const [filtroSexo, setFiltroSexo] = useState("");
const [filtroIdade, setFiltroIdade] = useState(""); 
const [filtroCor, setFiltroCor] = useState(""); 

// --- Busca de Dados Reais ---
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

const timer = setTimeout(() => {
  fetchAnimais();
}, 300);

return () => clearTimeout(timer);

}, [filtroEspecie, filtroPorte, filtroSexo]); 


return (
<Layout>
<div className={styles.pageCentralAdocao}>
<h1 className={styles.titulo}>Centro de Adoção</h1>
<p className={styles.subtitulo}>
Encontre seu novo melhor amigo filtrando pelas características desejadas.
</p>

<div className={styles.containerFiltrosPets}>
<div className={styles.filtros}>
<h2 className={styles.tituloFiltro}>Filtros</h2>

{/* Filtro Espécie (Radio Buttons Customizados) */}
<div className={styles.filtroGrupo}>
<h3>Espécie</h3>
    {OPCOES_ESPECIE.map(especie => (
      <label key={especie} className={styles.radioCustomizado}>
        <input
          type="radio"
          name="especie"
          value={especie}
          checked={filtroEspecie === especie}
          onChange={(e) => setFiltroEspecie(e.target.value)}
        />
        <span className={styles.checkmark}></span>
        {especie}
      </label>
    ))}
    {/* Opção "Todas" */}
    <label key="Todas" className={styles.radioCustomizado}>
      <input
        type="radio"
        name="especie"
        value=""
        checked={filtroEspecie === ""}
        onChange={() => setFiltroEspecie("")}
      />
      <span className={styles.checkmark}></span>
      Todas
    </label>
</div>

{/* Filtro Gênero (Radio Buttons Customizados) */}
<div className={styles.filtroGrupo}>
<h3>Gênero</h3>
    {/* Adicionando a opção "Ambos" (valor vazio) para o filtro */}
    <label key="Ambos" className={styles.radioCustomizado}>
      <input
        type="radio"
        name="genero"
        value=""
        checked={filtroSexo === ""}
        onChange={() => setFiltroSexo("")}
      />
      <span className={styles.checkmark}></span>
      Ambos
    </label>
    {OPCOES_GENERO.map(genero => (
      <label key={genero.valor} className={styles.radioCustomizado}>
        <input
          type="radio"
          name="genero"
          value={genero.valor}
          checked={filtroSexo === genero.valor}
          onChange={(e) => setFiltroSexo(e.target.value)}
        />
        <span className={styles.checkmark}></span>
        {genero.label}
      </label>
    ))}
</div>

{/* Filtro Porte (Radio Buttons Customizados) */}
<div className={styles.filtroGrupo}>
<h3>Porte</h3>
    {OPCOES_PORTE.map(porte => (
      <label key={porte} className={styles.radioCustomizado}>
        <input
          type="radio"
          name="porte"
          value={porte}
          checked={filtroPorte === porte}
          onChange={(e) => setFiltroPorte(e.target.value)}
        />
        <span className={styles.checkmark}></span>
        {porte}
      </label>
    ))}
    {/* Opção "Todos" */}
    <label key="Todos" className={styles.radioCustomizado}>
      <input
        type="radio"
        name="porte"
        value=""
        checked={filtroPorte === ""}
        onChange={() => setFiltroPorte("")}
      />
      <span className={styles.checkmark}></span>
      Todos
    </label>
</div>

{/* Filtro Idade (Placeholder visual - Checkboxes) */}
<div className={styles.filtroGrupo} style={{ opacity: 0.8 }}> 
<h3>Idade (Em breve)</h3>
    {OPCOES_IDADE.map(idade => (
      <label key={idade} className={styles.checkboxCustomizado}>
        <input
          type="checkbox" 
          value={idade}
          checked={filtroIdade === idade}
          onChange={() => setFiltroIdade(idade)} 
          disabled
        />
        <span className={styles.checkmark}></span>
        {idade}
      </label>
    ))}
</div>
 
 {/* Filtro Cor Predominante (Placeholder visual com Radio Buttons de Cor) */}
<div className={styles.filtroGrupo} style={{ opacity: 0.8 }}>
<h3>Cor Predominante (Em breve)</h3>
  <div className={styles.gradeCores}>
  {CORES_PREDOMINANTES.map((cor) => (
   <label 
   key={cor.valor} 
   className={styles.itemCor}
   >
   <input
    type="radio" 
    name="corPredominante"
    value={cor.valor}
    checked={filtroCor === cor.valor} 
    onChange={(e) => setFiltroCor(e.target.value)}
    disabled
   />
   <span className={styles.caixaCheckbox}></span> 
   <span className={`${styles.bolinhaCor} ${styles[cor.valor.toLowerCase()]}`}></span>
   {cor.nome}
   </label>
  ))}
     {/* Opção Limpar Cor */}
     <label key="Limpar Cor" className={styles.itemCor}>
      <input
       type="radio" 
       name="corPredominante"
       value=""
       checked={filtroCor === ""} 
       onChange={() => setFiltroCor("")}
       disabled
      />
      <span className={styles.caixaCheckbox}></span>
      <span className={`${styles.bolinhaCor} ${styles.limparCor}`}></span>
      Todas
     </label>
  </div>
</div>

{/* Filtro Raça (Placeholder visual - Select) */}
<div className={styles.filtroGrupo} style={{ opacity: 0.8 }}>
<h3>Raça (Em breve)</h3>
<select disabled className={styles.selectFiltro}>
 <option value="">Todas</option>
</select>
</div>
</div>

{/* --- Renderização Dinâmica dos Pets --- */}
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
 src={animal.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto"}
 alt={animal.nome}
 />
 <h3>{animal.nome}</h3>
 <p>{animal.raca || "Sem raça definida"}</p>
 {animal.account && ( 
 <p className={styles.ongNome}>Doador: {animal.account.nome}</p>
 )}
</Link>
))}
</section>
</div>
</div>
</Layout>
);
}