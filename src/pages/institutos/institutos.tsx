import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"; 
import styles from "./institutos.module.css";
import Layout from "../../components/layout";
import { FaMapMarkerAlt, FaCheckCircle, FaQrcode, FaCalendarAlt } from "react-icons/fa"; 
// import { useAuth } from "../../auth/AuthContext"; // Opcional: Se quiser registrar QUEM doou

// --- DADOS MOCKADOS (Mantidos para fallback) ---
type InstitutoMock = {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  itensDescricao: string[];
  logoUrl: string;
  arrecadado: number;
  meta: number;
};

const dadosInstitutos: Record<string, InstitutoMock> = {
  suipa: {
    id: "suipa",
    nome: "SUIPA",
    endereco: "Av. Dom Hélder Câmara, 1801 – Benfica, Rio de Janeiro – RJ",
    logoUrl: "/institutos/suipa.png", 
    descricao: "Todos os dias, milhares de animais resgatados pela SUIPA recebem cuidados...",
    itensDescricao: ["Alimentação de cães e gatos", "Tratamento médico", "Abrigo seguro"],
    arrecadado: 7613.0,
    meta: 15000.0,
  },
  caramelo: {
    id: "caramelo",
    nome: "Instituto Caramelo",
    endereco: "Rua José Felix de Oliveira, 1234 – Granja Viana, Cotia – SP",
    logoUrl: "/institutos/institutoCaramelo.png",
    descricao: "O Instituto Caramelo atua no resgate e reabilitação...",
    itensDescricao: ["Resgate de animais", "Reabilitação física", "Adoção responsável"],
    arrecadado: 8104.64,
    meta: 16000.0,
  },
  ampara: {
      id: "ampara",
      nome: "Instituto Ampara Animal",
      endereco: "Rua Exemplo, 123 - São Paulo - SP",
      logoUrl: "/ampara.png",
      descricao: "Ampara Animal trabalha em prol dos animais abandonados.",
      itensDescricao: ["Apoio a abrigos", "Castração", "Educação"],
      arrecadado: 4500,
      meta: 10000
  }
};

type CampanhaExibicao = {
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

export default function Institutos() {
  const { id } = useParams(); 
  const [campanha, setCampanha] = useState<CampanhaExibicao | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de Pagamento
  const [valorSelecionado, setValorSelecionado] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [loadingPagamento, setLoadingPagamento] = useState(false);
  const [fasePagamento, setFasePagamento] = useState<"fechado" | "pix" | "sucesso">("fechado");

  // --- CARREGAMENTO DE DADOS ---
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      setError(null);
      const idNormalizado = id ? id.toLowerCase() : "";

      // 1. MOCK
      if (dadosInstitutos[idNormalizado]) {
        const mock = dadosInstitutos[idNormalizado];
        setCampanha({
            titulo: mock.nome,
            endereco: mock.endereco,
            descricao: mock.descricao,
            itensDescricao: mock.itensDescricao,
            imagemUrl: mock.logoUrl,
            arrecadado: mock.arrecadado,
            meta: mock.meta,
            realizadoPor: mock.nome,
            dataLimite: "2024-12-30" 
        });
        setLoading(false);
        return; 
      }

      // 2. API REAL
      try {
        const response = await fetch(`https://petresc.onrender.com/api/campanhas/${id}`);
        
        if (!response.ok) {
          throw new Error("Campanha não encontrada.");
        }

        const data = await response.json();
        
        let itensLista = ["Apoio à causa", "Transparência"];
        if (data.itens_descricao) {
            if (Array.isArray(data.itens_descricao)) {
                itensLista = data.itens_descricao;
            } else if (typeof data.itens_descricao === 'string') {
                try { itensLista = JSON.parse(data.itens_descricao); } catch(e) {}
            }
        }

        setCampanha({
            titulo: data.titulo,
            endereco: data.ong?.endereco || "Endereço da ONG",
            descricao: data.descricao,
            itensDescricao: itensLista,
            imagemUrl: data.imagem_url || "https://via.placeholder.com/400x150",
            arrecadado: parseFloat(data.arrecadado) || 0,
            meta: parseFloat(data.meta_financeira) || 0,
            realizadoPor: data.ong?.nome || "ONG Parceira",
            dataLimite: data.data_limite 
        });

      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar a campanha.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
        carregarDados();
    }
  }, [id]);


  // --- LÓGICA DE PAGAMENTO REAL ---
  const handleOutroValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValorSelecionado(e.target.value);
    const radioOutro = document.querySelector('input[name="valor"][value="outro"]') as HTMLInputElement;
    if (radioOutro) radioOutro.checked = true;
  };

  const handleFinalizar = async () => {
    if (!valorSelecionado || !formaPagamento) {
      alert("Por favor, selecione um valor e uma forma de pagamento.");
      return;
    }
    
    setLoadingPagamento(true);

    try {
        // Preparando payload para salvar doação no banco
        const payload = {
            campanha_id: id, 
            valor: parseFloat(valorSelecionado),
            metodo_pagamento: formaPagamento,
            // Se tiver user logado: usuario_id: user.id 
        };

        const response = await fetch("https://petresc.onrender.com/api/doacoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // SUCESSO: Atualiza visualmente o valor arrecadado (Feedback imediato)
            const valorDoado = parseFloat(valorSelecionado);
            setCampanha((prev) => prev ? {
                ...prev,
                arrecadado: prev.arrecadado + valorDoado
            } : null);

            // Abre modal correspondente
            if (formaPagamento === "Pix") setFasePagamento("pix");
            else setFasePagamento("sucesso");

        } else {
            const errData = await response.json();
            alert(`Erro ao processar doação: ${errData.message || "Tente novamente."}`);
        }

    } catch (error) {
        console.error("Erro na doação:", error);
        alert("Erro de conexão. Verifique sua internet.");
    } finally {
        setLoadingPagamento(false);
    }
  };

  const confirmarPix = () => setFasePagamento("sucesso");
  
  const fecharModal = () => {
      setFasePagamento("fechado");
      setValorSelecionado("");
      setFormaPagamento("");
      // Opcional: Desmarcar radios visualmente
      const radios = document.querySelectorAll('input[type="radio"]');
      radios.forEach((r) => (r as HTMLInputElement).checked = false);
  };

  // --- RENDERIZAÇÃO ---

  if (loading) return <Layout><div style={{textAlign:'center', padding:'4rem'}}>Carregando...</div></Layout>;
  
  if (error || !campanha) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h1>Campanha não encontrada</h1>
          <p>Verifique o link ou tente novamente.</p>
        </div>
      </Layout>
    );
  }

  const dataFormatada = campanha.dataLimite 
    ? new Date(campanha.dataLimite).toLocaleDateString('pt-BR') 
    : "Indeterminado";

  return (
    <Layout>
      <div className={styles.paginstitutos}>
        
        {/* MODAL */}
        {fasePagamento !== "fechado" && (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center',
                alignItems: 'center', zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: 'white', padding: '40px', borderRadius: '12px',
                    textAlign: 'center', maxWidth: '400px', width: '90%',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }}>
                    {fasePagamento === "pix" && (
                        <>
                            <h2 style={{color: '#2b6b99', marginBottom: '1rem'}}>Pague com Pix</h2>
                            <FaQrcode size={150} style={{margin: '20px 0', color: '#333'}} />
                            <p style={{marginBottom: '1rem'}}>Valor: <strong>R$ {valorSelecionado},00</strong></p>
                            <small style={{display:'block', marginBottom:'10px', color:'#666'}}>Este QR Code é simulado.</small>
                            <button onClick={confirmarPix} style={{backgroundColor: '#28a745', color: 'white', padding: '10px 20px', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'1rem'}}>Já paguei</button>
                        </>
                    )}
                    {fasePagamento === "sucesso" && (
                        <>
                            <FaCheckCircle size={60} color="#28a745" style={{marginBottom: '1rem'}} />
                            <h2 style={{color: '#2b6b99'}}>Doação Registrada!</h2>
                            <p style={{margin:'10px 0'}}>Obrigado por apoiar: <strong>{campanha.titulo}</strong></p>
                            <p style={{fontSize:'0.9rem', color:'#555'}}>Seu apoio ajuda a atingir a meta de {campanha.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}.</p>
                            <button onClick={fecharModal} style={{marginTop:'20px', backgroundColor: '#2b6b99', color: 'white', padding: '10px 20px', border:'none', borderRadius:'5px', cursor:'pointer'}}>Fechar</button>
                        </>
                    )}
                </div>
            </div>
        )}

        <div className={styles.logoContainer}>
          <img
            src={campanha.imagemUrl}
            alt={campanha.titulo}
            className={styles.logo}
            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400x150?text=Campanha")}
          />
        </div>

        <div className={styles.cabecalho}>
          <h1 className={styles.nome}>{campanha.titulo}</h1>
          <p style={{fontSize: '1.2rem', color: '#666'}}>Realizado por: <strong>{campanha.realizadoPor}</strong></p>
          
          <div style={{display:'flex', gap:'2rem', marginTop:'0.5rem', flexWrap:'wrap'}}>
            <p className={styles.endereco}>
                <FaMapMarkerAlt /> {campanha.endereco}
            </p>
            <p className={styles.endereco} style={{color:'#d9534f'}}>
                <FaCalendarAlt /> Encerra em: <strong>{dataFormatada}</strong>
            </p>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.descricaoContainer}>
          <p className={styles.descricao}>{campanha.descricao}</p>
          
          <p className={styles.descricao}><strong>Com a sua doação, você garante:</strong></p>
          <ul className={styles.listaBeneficios}>
            {campanha.itensDescricao.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <hr className={styles.divider} />

        <div className={styles.areaDoacao}>
          {/* Coluna Esquerda: Valores */}
          <div className={`${styles.colunaOpcoes} ${styles.colunaEsquerda}`}>
            <h3 className={styles.tituloOpcao}>Escolha um valor:</h3>
            <div className={styles.listaRadios}>
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="20" onChange={(e) => setValorSelecionado(e.target.value)} /> 
                <span>R$ 20</span>
              </label>
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="50" onChange={(e) => setValorSelecionado(e.target.value)} /> 
                <span>R$ 50</span>
              </label>
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="100" onChange={(e) => setValorSelecionado(e.target.value)} /> 
                <span>R$ 100</span>
              </label>
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="200" onChange={(e) => setValorSelecionado(e.target.value)} /> 
                <span>R$ 200</span>
              </label>
              <label className={styles.radioItem}>
                <input type="radio" name="valor" value="outro" /> 
                <span>Outro: 
                    <input type="number" className={styles.outroValorInput} onChange={handleOutroValorChange} onClick={() => { const r = document.querySelector('input[value="outro"]') as HTMLInputElement; if(r) r.checked = true; }} />
                </span>
              </label>
            </div>
          </div>

          {/* Coluna Direita: Pagamento */}
          <div className={styles.colunaOpcoes}>
            <h3 className={styles.tituloOpcao}>Pagamento:</h3>
            <div className={styles.listaRadios}>
              <label className={styles.radioItem}><input type="radio" name="pagamento" value="Pix" onChange={(e) => setFormaPagamento(e.target.value)} /> <span>Pix</span></label>
              <label className={styles.radioItem}><input type="radio" name="pagamento" value="Cartao" onChange={(e) => setFormaPagamento(e.target.value)} /> <span>Cartão</span></label>
              <label className={styles.radioItem}><input type="radio" name="pagamento" value="Boleto" onChange={(e) => setFormaPagamento(e.target.value)} /> <span>Boleto</span></label>
            </div>
            
            <button 
                className={styles.botaoFinalizar} 
                onClick={handleFinalizar}
                disabled={loadingPagamento}
            >
                {loadingPagamento ? "Processando..." : "Doar Agora"}
            </button>
          </div>
        </div>

        <div className={styles.barraFooter}>
          <div className={styles.infoArrecadado}>
            <h3>Arrecadado</h3>
            <p className={styles.valoresArrecadado}>
              <strong>
                {campanha.arrecadado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </strong>{" "}
              /{" "}
              {campanha.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
            {/* Barra de progresso visual opcional */}
            <div style={{width: '100%', height:'10px', backgroundColor:'#ddd', borderRadius:'5px', marginTop:'5px'}}>
                 <div style={{
                     width: `${Math.min((campanha.arrecadado / campanha.meta) * 100, 100)}%`, 
                     height:'100%', 
                     backgroundColor:'#28a745', 
                     borderRadius:'5px',
                     transition: 'width 0.5s ease'
                 }}></div>
            </div>
          </div>
          <p className={styles.textoFooterDireita}>
            Todos os valores arrecadados são destinados a: {campanha.titulo}.
          </p>
        </div>

      </div>
    </Layout>
  );
}