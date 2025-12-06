import { useState } from "react";
import styles from "./registrarAnimal.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { BsCloudArrowUpFill } from "react-icons/bs";
import Layout from "../../components/layout";
import Modal from "../../components/modal"; 

// --- CONSTANTES ---
const OPCOES_ESPECIE = ["CACHORRO", "GATO", "OUTRO"];
const OPCOES_PORTE = ["PEQUENO", "MEDIO", "GRANDE"];
const OPCOES_GENERO = ["MACHO", "FEMEA"];
const OPCOES_IDADE = ["FILHOTE", "ADULTO", "IDOSO"]; 
const OPCOES_COR = ["PRETO", "BRANCO", "MARROM", "CARAMELO", "CINZA", "RAJADO", "TRICOLOR", "DOURADO", "OUTRA"];
const OPCOES_STATUS_USUARIO = ["PERDIDO", "ENCONTRADO", "DISPONIVEL"]; 
const OPCOES_LOCAL_ATUAL = ["ABRIGO", "CLINICA", "CASA_PROTETOR"];

const OPCOES_STATUS_ONG = [
  { valor: "DISPONIVEL", label: "Disponível para Adoção" },
  { valor: "LAR_TEMPORARIO", label: "Precisa de Lar Temporário" },
  { valor: "EM_LAR_TEMPORARIO", label: "Está em Lar Temporário" },
  { valor: "EM_TRATAMENTO", label: "Em Tratamento (Indisponível)" },
  { valor: "ADOTADO", label: "Já Adotado" }
];

const formatOption = (opt: string) => opt.charAt(0) + opt.slice(1).toLowerCase().replace('_', ' ');

// =================================================================
// === COMPONENTE 1: FORMULÁRIO DO USUÁRIO COMUM ===
// =================================================================
const RegistrarAnimalUsuario = () => {
  const navigate = useNavigate();
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);

  // IA
  const [gerandoIA, setGerandoIA] = useState(false);

  // Campos
  const [nome, setNome] = useState("");
  const [historia, setHistoria] = useState("");
  const [cuidado, setCuidado] = useState("");
  const [sociabilidade, setSociabilidade] = useState("");
  const [situacao, setSituacao] = useState(""); 
  const [especie, setEspecie] = useState(""); 
  const [genero, setGenero] = useState(""); 
  const [raca, setRaca] = useState("");
  const [porte, setPorte] = useState(""); 
  const [cor, setCor] = useState(""); 
  const [idade, setIdade] = useState(""); 

  const [loadingEnvio, setLoadingEnvio] = useState(false);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "", msg: "", type: "success" as "success" | "error", redirect: "" as string | null
  });

  const showModal = (title: string, msg: string, type: "success" | "error", redirect: string | null = null) => {
    setModalConfig({ title, msg, type, redirect });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (modalConfig.redirect) navigate(modalConfig.redirect);
  };

  const handleSelecaoDeArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagemArquivo(file);
      const reader = new FileReader();
      reader.onload = () => setImagemPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const gerarDescricaoIA = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!nome || !especie) {
      alert("Preencha Nome e Espécie antes de gerar a história!");
      return;
    }

    setGerandoIA(true);
    try {
      const token = localStorage.getItem("@AuthData:token");
      
      // Pega dados específicos do Usuário
      const listaCaracteristicas = [
        raca, porte, cor, genero, 
        `Cuidados: ${cuidado}`, 
        `Sociabilidade: ${sociabilidade}`
      ].filter(Boolean).join(", ");

      const response = await fetch("https://petresc.onrender.com/api/animais/ia-descricao", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ nome, especie, caracteristicas: listaCaracteristicas })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro IA");
      if (data.texto) setHistoria(data.texto);

    } catch (error) {
      console.error(error);
      alert("Erro ao gerar descrição com IA.");
    } finally {
      setGerandoIA(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEnvio(true);

    const token = localStorage.getItem("@AuthData:token"); 
    if (!token) {
      showModal("Erro", "Sessão expirada. Faça login novamente.", "error", "/login");
      setLoadingEnvio(false);
      return;
    }
    if (!imagemArquivo) {
      showModal("Atenção", "Por favor, selecione uma imagem do animal.", "error");
      setLoadingEnvio(false);
      return;
    }

    const formData = new FormData();
    formData.append("imagem", imagemArquivo);
    formData.append("nome", nome);
    formData.append("especie", especie);
    formData.append("raca", raca);
    formData.append("idade", idade);
    formData.append("status", situacao);
    formData.append("porte", porte);
    formData.append("sexo", genero);
    formData.append("descricao", historia);
    formData.append("cor", cor);
    formData.append("cuidado", cuidado);
    formData.append("sociabilidade", sociabilidade);

    try {
      const response = await fetch("https://petresc.onrender.com/api/animais", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao registrar animal");
      }

      showModal("Sucesso!", "O animal foi registrado com sucesso.", "success", `/animal/${data.id}`);

    } catch (err) {
      setLoadingEnvio(false);
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      showModal("Erro", msg, "error");
    }
  };

  return (
    <div className={styles.pageRegistroAnimal}>
      <Modal 
        isOpen={modalOpen}
        title={modalConfig.title}
        message={modalConfig.msg}
        type={modalConfig.type}
        onClose={handleCloseModal}
      />

      <div className={styles.colunaUm}>
        <div className={styles.campoForm}>
          <div className={styles.imagemContainer}>
            {!imagemPreview ? (
              <label className={styles.rotuloUploadArquivo} htmlFor="uploadImagem">
                <div className={styles.designUploadArquivo}>
                  <BsCloudArrowUpFill />
                  <p>Clique para selecionar uma imagem</p>
                </div>
              </label>
            ) : (
              <div className={styles.previewContainer}>
                <img src={imagemPreview} alt="Preview" className={styles.imagem} />
                <label htmlFor="uploadImagem" className={styles.botaoTrocarImagem}>Trocar</label>
              </div>
            )}
            <input type="file" id="uploadImagem" accept="image/*" style={{ display: "none" }} onChange={handleSelecaoDeArquivo} />
          </div>
        </div>

        <div className={styles.campoForm}>
          <label className={styles.label}>Nome</label>
          <input className={styles.barraInfos} type="text" placeholder="Nome do pet" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className={styles.campoForm}>
          <div className={styles.campoForm}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', marginBottom:'5px'}}>
              <label className={styles.label} style={{margin:0}}>História</label>
              <button 
                  type="button"
                  onClick={gerarDescricaoIA}
                  disabled={gerandoIA}
                  style={{
                      backgroundColor: '#8a2be2', color: 'white', border: 'none', borderRadius: '20px',
                      padding: '5px 15px', fontSize: '0.85rem', fontWeight: 'bold', cursor: gerandoIA ? 'wait' : 'pointer'
                  }}
              >
                 {gerandoIA ? "✨ Criando..." : "✨ Gerar com IA"}
              </button>
          </div>
          <textarea className={styles.barraInfos} placeholder="História..." value={historia} onChange={(e) => setHistoria(e.target.value)} />
        </div>
          <textarea className={styles.barraInfos} placeholder="História..." value={historia} onChange={(e) => setHistoria(e.target.value)} />
        </div>
        <div className={styles.campoForm}>
          <label className={styles.label}>Cuidados</label>
          <textarea className={styles.barraInfos} placeholder="Cuidados..." value={cuidado} onChange={(e) => setCuidado(e.target.value)} />
        </div>
        <div className={styles.campoForm}>
          <label className={styles.label}>Sociabilidade</label>
          <textarea className={styles.barraInfos} placeholder="Sociabilidade..." value={sociabilidade} onChange={(e) => setSociabilidade(e.target.value)} />
        </div>
      </div>

      <div className={styles.colunaDois}>
        <h1 className={styles.titulo}>Criar Registro (Usuário)</h1>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          
          <div className={styles.campoForm}>
            <label className={styles.label}>Situação</label>
            <select className={styles.barraInfos} required value={situacao} onChange={(e) => setSituacao(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_STATUS_USUARIO.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Espécie</label>
            <select className={styles.barraInfos} required value={especie} onChange={(e) => setEspecie(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_ESPECIE.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Gênero</label>
            <select className={styles.barraInfos} required value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_GENERO.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Raça</label>
            <input className={styles.barraInfos} type="text" value={raca} onChange={(e) => setRaca(e.target.value)} />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Porte</label>
            <select className={styles.barraInfos} required value={porte} onChange={(e) => setPorte(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_PORTE.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Cor</label>
            <select className={styles.barraInfos} required value={cor} onChange={(e) => setCor(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_COR.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

           <div className={styles.campoForm}>
            <label className={styles.label}>Idade</label>
            <input 
             className={styles.barraInfos} 
             type="text" 
             placeholder="Ex: 2 anos, 5 meses, Adulto..." 
             value={idade} 
             onChange={(e) => setIdade(e.target.value)}
             required/>
            </div>

          <button type="submit" className={styles.botao} disabled={loadingEnvio}>
            {loadingEnvio ? "Enviando..." : "Enviar Formulário"}
          </button>
        </form>
      </div>
    </div>
  );
};

// =================================================================
// === COMPONENTE 2: FORMULÁRIO DA ONG ===
// =================================================================
const RegistrarAnimalOng = () => {
  const navigate = useNavigate();

  // IA
  const [gerandoIA, setGerandoIA] = useState(false);

  // Imagens
  const [imgResgatePreview, setImgResgatePreview] = useState<string | null>(null);
  const [imgResgateArquivo, setImgResgateArquivo] = useState<File | null>(null);
  const [imgAtualPreview, setImgAtualPreview] = useState<string | null>(null);
  const [imgAtualArquivo, setImgAtualArquivo] = useState<File | null>(null);

  // Status e Localização
  const [statusOng, setStatusOng] = useState("DISPONIVEL"); 
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const [filhotes, setFilhotes] = useState<"sim" | "nao" | "">("");
  const [coleira, setColeira] = useState<"sim" | "nao" | "">("");
  const [motivo, setMotivo] = useState("");
  const [atualmente, setAtualmente] = useState(""); 

  // Dados Básicos
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState(OPCOES_ESPECIE[0]);
  const [genero, setGenero] = useState("");
  const [raca, setRaca] = useState("");
  const [idadeAprox, setIdadeAprox] = useState("");
  const [dataResgate, setDataResgate] = useState("");
  const [porte, setPorte] = useState("");
  const [cor, setCor] = useState("");
  const [obs, setObs] = useState("");
  const [historia, setHistoria] = useState("");

  // Saúde
  const [vermifugado, setVermifugado] = useState<"sim" | "nao" | "">("");
  const [dataVermifugado, setDataVermifugado] = useState("");
  const [vacinado, setVacinado] = useState<"sim" | "nao" | "">("");
  const [txtVacinado, setTxtVacinado] = useState("");
  const [castrado, setCastrado] = useState<"sim" | "nao" | "">("");
  const [dataCastrado, setDataCastrado] = useState("");
  const [testado, setTestado] = useState<"sim" | "nao" | "">("");
  const [txtTestado, setTxtTestado] = useState("");
  const [resultados, setResultados] = useState("");

  const [loadingEnvio, setLoadingEnvio] = useState(false);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "", msg: "", type: "success" as "success" | "error", redirect: "" as string | null
  });

  const showModal = (title: string, msg: string, type: "success" | "error", redirect: string | null = null) => {
    setModalConfig({ title, msg, type, redirect });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (modalConfig.redirect) navigate(modalConfig.redirect);
  };

  // Handlers Imagens
  const handleImgResgate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgResgateArquivo(file);
      const reader = new FileReader();
      reader.onload = () => setImgResgatePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleImgAtual = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgAtualArquivo(file);
      const reader = new FileReader();
      reader.onload = () => setImgAtualPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const gerarDescricaoIA = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!nome || !especie) {
      alert("Preencha Nome e Espécie antes de gerar a história!");
      return;
    }

    setGerandoIA(true);
    try {
      const token = localStorage.getItem("@AuthData:token");
      
      // Pega dados específicos da ONG
      const listaCaracteristicas = [
        raca, porte, cor, genero, obs, 
        castrado === "sim" ? "castrado" : "",
        vacinado === "sim" ? "vacinado" : ""
      ].filter(Boolean).join(", ");

      const response = await fetch("https://petresc.onrender.com/api/animais/ia-descricao", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ nome, especie, caracteristicas: listaCaracteristicas })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro IA");
      if (data.texto) setHistoria(data.texto);

    } catch (error) {
      console.error(error);
      alert("Erro ao gerar descrição com IA.");
    } finally {
      setGerandoIA(false);
    }
  };

  const handleSubmitOng = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEnvio(true);

    const token = localStorage.getItem("@AuthData:token"); 
    if (!token) {
      showModal("Erro", "Usuário não autenticado.", "error", "/login");
      setLoadingEnvio(false);
      return;
    }
    if (!imgAtualArquivo) {
      showModal("Atenção", "A foto atual do animal é obrigatória.", "error");
      setLoadingEnvio(false);
      return;
    }

    const formData = new FormData();
    
    // --- ARQUIVOS ---
    formData.append("imagem", imgAtualArquivo);
    if (imgResgateArquivo) formData.append("imagem_resgate", imgResgateArquivo);

    // --- FUNÇÃO PARA TRATAR NULOS ---
    const appendIf = (key: string, value: string) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value);
        }
    };

    // --- CAMPOS ---
    appendIf("nome", nome);
    appendIf("especie", especie);
    appendIf("sexo", genero);
    appendIf("raca", raca);
    
    // VERIFICAR: Se o banco espera INT, isso pode dar erro 500 se enviar String
    appendIf("idade", idadeAprox); 
    
    appendIf("data_resgate", dataResgate);
    appendIf("porte", porte);
    appendIf("cor", cor);
    appendIf("observacoes", obs);
    appendIf("descricao", historia);

    // Local e Status
    appendIf("local_estado", estado);
    appendIf("local_cidade", cidade);
    
    // VERIFICAR: Se o banco espera INT, enviar string aqui dá erro
    appendIf("local_numero", numero); 
    
    appendIf("tinha_filhotes", filhotes);
    appendIf("tinha_coleira", coleira);
    appendIf("motivo_nao_disponivel", motivo);
    appendIf("local_atual", atualmente);
    
    // Status do select
    appendIf("status", statusOng); 

    // Saúde
    appendIf("vermifugado", vermifugado);
    appendIf("data_vermifugado", dataVermifugado);
    appendIf("vacinado", vacinado);
    appendIf("vacinas_texto", txtVacinado);
    appendIf("castrado", castrado);
    appendIf("data_castrado", dataCastrado);
    appendIf("testado_doencas", testado);
    appendIf("testes_texto", txtTestado);
    appendIf("resultados_testes", resultados);

    // --- DEBUG: LOG NO CONSOLE ---
    console.log("📤 Enviando os seguintes dados:");
    for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    try {
        const response = await fetch("https://petresc.onrender.com/api/animais", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ Erro do Backend:", data);
            throw new Error(data.error || data.message || "Erro 500: Verifique os dados enviados");
        }

        const novoAnimal = data;
        showModal("Sucesso!", "O animal foi cadastrado com sucesso!", "success", `/animal/${novoAnimal.id}`);

    } catch (err) {
      setLoadingEnvio(false);
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      console.error("Erro no Frontend:", err);
      showModal("Erro no Envio", `O servidor retornou erro. \nDetalhe: ${msg}`, "error");
    } finally {
        setLoadingEnvio(false);
    }
  };

  return (
    <>
      <Modal 
        isOpen={modalOpen}
        title={modalConfig.title}
        message={modalConfig.msg}
        type={modalConfig.type}
        onClose={handleCloseModal}
      />

      <form className={`${styles.formOng} ${styles.pageRegistroAnimal}`} onSubmit={handleSubmitOng}>
        
        {/* COLUNA ESQUERDA (Fotos e Detalhes Origem) */}
        <div className={styles.colunaUm}>
          {/* FOTO RESGATE */}
          <div className={styles.campoForm}>
            <div className={styles.imagemContainer}>
              {!imgResgatePreview ? (
                <label className={styles.rotuloUploadArquivo} htmlFor="uploadResgate">
                  <div className={styles.designUploadArquivo}>
                    <BsCloudArrowUpFill />
                    <p>Foto Resgate (Opcional)</p>
                  </div>
                </label>
              ) : (
                <div className={styles.previewContainer}>
                  <img src={imgResgatePreview} alt="Foto resgate" className={styles.imagem} />
                  <label htmlFor="uploadResgate" className={styles.botaoTrocarImagem}>Trocar</label>
                </div>
              )}
              <input type="file" id="uploadResgate" accept="image/*" style={{ display: "none" }} onChange={handleImgResgate} />
            </div>
          </div>

          {/* FOTO ATUAL */}
          <div className={styles.campoForm}>
            <div className={styles.imagemContainer}>
              {!imgAtualPreview ? (
                <label className={styles.rotuloUploadArquivo} htmlFor="uploadAtual">
                  <div className={styles.designUploadArquivo}>
                    <BsCloudArrowUpFill />
                    <p>Foto Atual (Obrigatória)</p>
                  </div>
                </label>
              ) : (
                <div className={styles.previewContainer}>
                  <img src={imgAtualPreview} alt="Foto atual" className={styles.imagem} />
                  <label htmlFor="uploadAtual" className={styles.botaoTrocarImagem}>Trocar</label>
                </div>
              )}
              <input type="file" id="uploadAtual" accept="image/*" style={{ display: "none" }} onChange={handleImgAtual} />
            </div>
          </div>

          {/* DADOS DE ORIGEM */}
          <div className={styles.campoForm}>
            <label className={styles.label}>Local Encontrado</label>
            <input className={styles.barraInfos} type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
            <input className={styles.barraInfos} style={{marginTop:'8px'}} type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            <input className={styles.barraInfos} style={{marginTop:'8px'}} type="text" placeholder="Bairro/Referência" value={numero} onChange={(e) => setNumero(e.target.value)} />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Com filhotes?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="filhotes" value="sim" checked={filhotes === "sim"} onChange={() => setFilhotes("sim")} />
                <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="filhotes" value="nao" checked={filhotes === "nao"} onChange={() => setFilhotes("nao")} />
                <span className={styles.checkmark}></span>Não
              </label>
            </div>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Estava com coleira?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="coleira" value="sim" checked={coleira === "sim"} onChange={() => setColeira("sim")} />
                <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="coleira" value="nao" checked={coleira === "nao"} onChange={() => setColeira("nao")} />
                <span className={styles.checkmark}></span>Não
              </label>
            </div>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Motivo (Se indisponível)</label>
            <input 
              className={styles.barraInfos} 
              type="text" 
              placeholder="Ex: Em tratamento, muito agressivo..." 
              value={motivo} 
              onChange={(e) => setMotivo(e.target.value)} 
            />
          </div>

          {/* FINALIDADE DO CADASTRO */}
          <div className={styles.campoForm}>
            <label className={styles.label} style={{color:'#286699', fontWeight:'bold'}}>Finalidade do Cadastro</label>
            <select 
                className={styles.barraInfos} 
                value={statusOng} 
                onChange={(e) => setStatusOng(e.target.value)}
                style={{border:'2px solid #286699'}}
            >
              {OPCOES_STATUS_ONG.map(opt => (
                <option key={opt.valor} value={opt.valor}>{opt.label}</option>
              ))}
            </select>
            <small style={{display:'block', marginTop:'5px', color:'#666', fontSize:'1.2rem', fontWeight:'700'}}>
                * Selecione "Precisa de Lar Temporário" para que ele apareça na coluna de Lar Temporário no painel.
            </small>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Local Onde Está Agora</label>
            <select className={styles.barraInfos} value={atualmente} onChange={(e) => setAtualmente(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_LOCAL_ATUAL.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>
        </div>

        {/* COLUNA DIREITA (Dados e Saúde) */}
        <div className={styles.colunaDois}>
          <h1 className={styles.titulo}>Registro Completo (ONG)</h1>
          <p className={styles.subtitulo}>Preencha os dados de saúde e perfil</p>

          <div className={styles.campoForm}>
            <label className={styles.label}>Nome</label>
            <input className={styles.barraInfos} type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Espécie</label>
            <select className={styles.barraInfos} value={especie} onChange={(e) => setEspecie(e.target.value)}>
              {OPCOES_ESPECIE.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Gênero</label>
            <select className={styles.barraInfos} value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_GENERO.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Raça</label>
            <input className={styles.barraInfos} type="text" value={raca} onChange={(e) => setRaca(e.target.value)} />
          </div>

             <div className={styles.campoForm}>
                <label className={styles.label}>Idade Aproximada</label>
                <input  type="text"  className={styles.barraInfos}  value={idadeAprox}  onChange={(e) => setIdadeAprox(e.target.value)} placeholder="Ex: 2 anos, 5 meses, Adulto..." />
             </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Data Resgate</label>
            <input className={styles.barraInfos} type="date" value={dataResgate} onChange={(e) => setDataResgate(e.target.value)} />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Porte</label>
            <select className={styles.barraInfos} value={porte} onChange={(e) => setPorte(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_PORTE.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Cor</label>
            <select className={styles.barraInfos} value={cor} onChange={(e) => setCor(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_COR.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

          <div className={styles.campoForm}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', marginBottom:'5px'}}>
              <label className={styles.label} style={{margin:0}}>História</label>
              <button 
                  type="button"
                  onClick={gerarDescricaoIA}
                  disabled={gerandoIA}
                  style={{
                      backgroundColor: '#8a2be2', color: 'white', border: 'none', borderRadius: '20px',
                      padding: '5px 15px', fontSize: '0.85rem', fontWeight: 'bold', cursor: gerandoIA ? 'wait' : 'pointer'
                  }}
              >
                 {gerandoIA ? "✨ Criando..." : "✨ Gerar com IA"}
              </button>
          </div>
          {/* Mantenha o textarea aqui embaixo */}
            <textarea className={styles.barraInfos} value={historia} onChange={(e) => setHistoria(e.target.value)} />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Observações</label>
            <textarea className={styles.barraInfos} value={obs} onChange={(e) => setObs(e.target.value)} />
          </div>

          {/* --- SAÚDE --- */}
          <h3 className={styles.label} style={{marginTop:'20px', borderBottom:'1px solid #ccc'}}>Saúde</h3>

          <div className={styles.campoForm}>
            <label className={styles.label}>Vermifugado?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="vermifugado" value="sim" checked={vermifugado==="sim"} onChange={()=>setVermifugado("sim")}/> <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="vermifugado" value="nao" checked={vermifugado==="nao"} onChange={()=>setVermifugado("nao")}/> <span className={styles.checkmark}></span>Não
              </label>
            </div>
            {vermifugado === "sim" && (
                <input type="date" className={styles.barraInfos} style={{marginTop:'5px'}} value={dataVermifugado} onChange={e=>setDataVermifugado(e.target.value)} />
            )}
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Vacinado?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="vacinado" value="sim" checked={vacinado==="sim"} onChange={()=>setVacinado("sim")}/> <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="vacinado" value="nao" checked={vacinado==="nao"} onChange={()=>setVacinado("nao")}/> <span className={styles.checkmark}></span>Não
              </label>
            </div>
            {vacinado === "sim" && (
                <input type="text" placeholder="Quais?" className={styles.barraInfos} style={{marginTop:'5px'}} value={txtVacinado} onChange={e=>setTxtVacinado(e.target.value)} />
            )}
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Castrado?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="castrado" value="sim" checked={castrado==="sim"} onChange={()=>setCastrado("sim")}/> <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="castrado" value="nao" checked={castrado==="nao"} onChange={()=>setCastrado("nao")}/> <span className={styles.checkmark}></span>Não
              </label>
            </div>
            {castrado === "sim" && (
                <input type="date" className={styles.barraInfos} style={{marginTop:'5px'}} value={dataCastrado} onChange={e=>setDataCastrado(e.target.value)} />
            )}
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Testado para doenças?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="testado" value="sim" checked={testado==="sim"} onChange={()=>setTestado("sim")}/> <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="radio" name="testado" value="nao" checked={testado==="nao"} onChange={()=>setTestado("nao")}/> <span className={styles.checkmark}></span>Não
              </label>
            </div>
            {testado === "sim" && (
                <>
                    <input type="text" placeholder="Quais testes?" className={styles.barraInfos} style={{marginTop:'5px'}} value={txtTestado} onChange={e=>setTxtTestado(e.target.value)} />
                    <input type="text" placeholder="Resultados" className={styles.barraInfos} style={{marginTop:'5px'}} value={resultados} onChange={e=>setResultados(e.target.value)} />
                </>
            )}
          </div>

          <button type="submit" className={styles.botao} disabled={loadingEnvio}>
            {loadingEnvio ? "Salvando..." : "Finalizar Cadastro"}
          </button>
        </div>
      </form>
    </>
  );
};

// =================================================================
// === COMPONENTE PRINCIPAL ===
// =================================================================
export default function RegistrarAnimal() {
  const { user, isAuthenticated } = useAuth();
  const isOng = isAuthenticated && (user?.role === "ONG" || user?.role === "ADMIN");

  return (
    <Layout>
      {isOng ? <RegistrarAnimalOng /> : <RegistrarAnimalUsuario />}
    </Layout>
  );
}