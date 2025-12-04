import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; 
import styles from "./institutos.module.css";
import Layout from "../../components/layout";
import { FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaQrcode } from "react-icons/fa"; 

// --- TIPAGEM ---
type CampanhaExibicao = {
  id: string;
  titulo: string;
  endereco: string;
  descricao: string;
  itensDescricao: string[];
  imagemUrl: string;
  arrecadado: number;
  meta: number;
  realizadoPor: string;
  dataLimite?: string;
};

// --- BANCO DE DADOS SIMULADO (MOCK) ---
// Adicionei aqui as informações do Ampara e Patas Dadas
const DADOS_MOCK: Record<string, CampanhaExibicao> = {
  "caramelo": {
    id: "caramelo",
    titulo: "Instituto Caramelo",
    endereco: "Rua José Felix de Oliveira, 1234 – Cotia – SP",
    descricao: "O Instituto Caramelo atua no resgate e reabilitação de animais em situação de risco. Esta campanha visa arrecadar fundos para a reforma do canil principal e compra de ração especial.",
    itensDescricao: ["Reforma de 10 canis", "Compra de 500kg de ração", "Medicamentos veterinários"],
    imagemUrl: "../../../public/institutos/institutoCaramelo.png",
    arrecadado: 8104.64,
    meta: 16000.00,
    realizadoPor: "Instituto Caramelo",
    dataLimite: "2025-01-20"
  },
  "suipa": {
    id: "suipa",
    titulo: "SUIPA",
    endereco: "Av. Dom Hélder Câmara, 1801 – Rio de Janeiro – RJ",
    descricao: "Todos os dias, milhares de animais resgatados recebem cuidados, alimentação e muito amor através do nosso trabalho. Precisamos da sua ajuda para continuar oferecendo abrigo.",
    itensDescricao: ["Alimentação diária", "Tratamento médico", "Manutenção do abrigo"],
    imagemUrl: "../../../public/institutos/suipa.png",
    arrecadado: 7813.00,
    meta: 15000.00,
    realizadoPor: "SUIPA",
    dataLimite: "2024-12-31"
  },
  "ampara": {
    id: "ampara",
    titulo: "Instituto Ampara Animal",
    endereco: "Av. Paulista, 1000 - São Paulo - SP",
    descricao: "A Ampara Animal trabalha em parceria com abrigos e protetores independentes. Sua doação será direcionada para campanhas de castração e vacinação em comunidades carentes.",
    itensDescricao: ["Castração de 50 animais", "Campanha de vacinação V10", "Apoio a protetores locais"],
    imagemUrl: "../../../public/institutos/ampara.png", // Ajuste o caminho se necessário (ex: ../../../public/ampara.png)
    arrecadado: 4500.00,
    meta: 10000.00,
    realizadoPor: "Ampara Animal",
    dataLimite: "2025-02-15"
  },
  "patasdadas": {
    id: "patasdadas",
    titulo: "Patas Dadas",
    endereco: "Rua dos Voluntários, 500 - Porto Alegre - RS",
    descricao: "Resgatamos cães e gatos em situação de abandono e maus-tratos. Nossos recursos estão escassos e precisamos de ajuda urgente para custear cirurgias ortopédicas.",
    itensDescricao: ["Cirurgias ortopédicas", "Fisioterapia animal", "Alimentação especial"],
    imagemUrl: "../../../public/institutos/patasDadas.png", // Ajuste o caminho se necessário
    arrecadado: 2100.00,
    meta: 8000.00,
    realizadoPor: "Associação Patas Dadas",
    dataLimite: "2025-01-10"
  }
};

export default function Institutos() {
  const { id } = useParams(); 
  
  const [campanha, setCampanha] = useState<CampanhaExibicao | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados do Formulário
  const [valorSelecionado, setValorSelecionado] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [loadingPagamento, setLoadingPagamento] = useState(false);
  const [fasePagamento, setFasePagamento] = useState<"fechado" | "pix" | "sucesso">("fechado");

  // --- CARREGAMENTO DE DADOS ---
  useEffect(() => {
    setLoading(true);
    // Simula delay de rede
    setTimeout(() => {
        // Tenta pegar o ID da URL (em minúsculo). Se não achar, usa 'suipa' como padrão.
        const chave = id?.toLowerCase();
        const dados = chave && DADOS_MOCK[chave] ? DADOS_MOCK[chave] : DADOS_MOCK["suipa"];
        
        setCampanha(dados);
        setLoading(false);
    }, 500);
  }, [id]);

  // --- LÓGICA DE PAGAMENTO ---
  const handleFinalizar = () => {
    if (!valorSelecionado || !formaPagamento) {
      alert("Por favor, selecione um valor e uma forma de pagamento.");
      return;
    }
    setLoadingPagamento(true);
    setTimeout(() => {
        setLoadingPagamento(false);
        if (formaPagamento === "Pix") setFasePagamento("pix");
        else setFasePagamento("sucesso");
    }, 1000);
  };

  const confirmarPix = () => setFasePagamento("sucesso");
  
  const fecharModal = () => {
      setFasePagamento("fechado");
      setValorSelecionado("");
      setFormaPagamento("");
  };

  if (loading) return <Layout><div style={{textAlign:'center', padding:'8rem'}}>Carregando...</div></Layout>;
  if (!campanha) return <Layout><div style={{textAlign:'center', padding:'8rem'}}>Campanha não encontrada</div></Layout>;

  const dataFormatada = campanha.dataLimite ? new Date(campanha.dataLimite).toLocaleDateString('pt-BR') : "Indeterminado";

  return (
    <Layout>
      <div className={styles.containerPagina}>
        
        {/* === 1. IMAGEM E CABEÇALHO === */}
        <div className={styles.logoContainer}>
          <img
            src={campanha.imagemUrl}
            alt={campanha.titulo}
            className={styles.logo}
            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/600x250?text=Imagem+da+Campanha")}
          />
        </div>

        <div className={styles.cabecalho}>
          <h1 className={styles.nome}>{campanha.titulo}</h1>
          <p className={styles.realizadoPor}>Realizado por: <strong>{campanha.realizadoPor}</strong></p>
          
          <div className={styles.infoRow}>
            <p className={styles.endereco}>
                <FaMapMarkerAlt /> {campanha.endereco}
            </p>
            <p className={styles.dataLimite}>
                <FaCalendarAlt /> Encerra em: <strong>{dataFormatada}</strong>
            </p>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* === 2. DESCRIÇÃO === */}
        <div className={styles.descricaoContainer}>
          <p className={styles.descricao}>{campanha.descricao}</p>
          
          <p className={styles.tituloItens}>Com a sua doação, você garante:</p>
          <ul className={styles.listaBeneficios}>
            {campanha.itensDescricao.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <hr className={styles.divider} />

        {/* === 3. ÁREA DE DOAÇÃO === */}
        <div className={styles.areaDoacao}>
            
            {/* Coluna Valores */}
            <div className={`${styles.colunaOpcoes} ${styles.colunaEsquerda}`}>
                <h3 className={styles.tituloOpcao}>Escolha um valor:</h3>
                <div className={styles.listaRadios}>
                    {['20', '50', '100', '200'].map(val => (
                        <label key={val} className={styles.radioItem}>
                            <input type="radio" name="valor" value={val} onChange={(e) => setValorSelecionado(e.target.value)} /> 
                            <span className={styles.radioCustom}></span>
                            <span className={styles.radioText}>R$ {val},00</span>
                        </label>
                    ))}
                    <label className={styles.radioItem}>
                        <input type="radio" name="valor" value="outro" /> 
                        <span className={styles.radioCustom}></span>
                        <span className={styles.radioText}>
                             Outro: <input type="number" className={styles.outroValorInput} onChange={(e) => setValorSelecionado(e.target.value)} />
                        </span>
                    </label>
                </div>
            </div>

            {/* Coluna Pagamento */}
            <div className={styles.colunaOpcoes}>
                <h3 className={styles.tituloOpcao}>Pagamento:</h3>
                <div className={styles.listaRadios}>
                    {['Pix', 'Cartão de Crédito', 'Boleto'].map(forma => (
                         <label key={forma} className={styles.radioItem}>
                            <input type="radio" name="pagamento" value={forma} onChange={(e) => setFormaPagamento(e.target.value)} /> 
                            <span className={styles.radioCustom}></span>
                            <span className={styles.radioText}>{forma}</span>
                        </label>
                    ))}
                </div>
                <button className={styles.botaoFinalizar} onClick={handleFinalizar} disabled={loadingPagamento}>
                    {loadingPagamento ? "Processando..." : "Doar Agora"}
                </button>
            </div>
        </div>

        {/* === 4. RODAPÉ DE PROGRESSO === */}
        <div className={styles.barraFooter}>
            <div className={styles.infoArrecadado}>
                <h3>Arrecadado</h3>
                <p className={styles.valoresArrecadado}>
                    <strong>{campanha.arrecadado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong> 
                    {' / '} {campanha.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </p>
                <div className={styles.barraContainer}>
                    <div className={styles.barraFill} style={{width: `${Math.min((campanha.arrecadado / campanha.meta) * 100, 100)}%`}}></div>
                </div>
            </div>
            <p className={styles.textoFooterDireita}>Todos os valores arrecadados são destinados a: {campanha.titulo}.</p>
        </div>

        {/* === MODAL DE PAGAMENTO === */}
        {fasePagamento !== "fechado" && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    {fasePagamento === "pix" ? (
                        <>
                            <h2 style={{color:'#2b6b99'}}>Pague com Pix</h2>
                            <FaQrcode size={120} style={{margin: '20px 0', color: '#333'}} />
                            <p className={styles.textoModal}>Valor: <strong>R$ {valorSelecionado},00</strong></p>
                            <button onClick={confirmarPix} className={styles.btnModal}>Já paguei</button>
                        </>
                    ) : (
                        <>
                            <FaCheckCircle size={70} color="#28a745" style={{marginBottom:'1rem'}} />
                            <h2 style={{color:'#2b6b99'}}>Doação Registrada!</h2>
                            <p className={styles.textoModal}>Obrigado por apoiar: <strong>{campanha.titulo}</strong></p>
                            <button onClick={fecharModal} className={styles.btnModal}>Fechar</button>
                        </>
                    )}
                </div>
            </div>
        )}

      </div>
    </Layout>
  );
}