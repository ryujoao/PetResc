import { useState } from "react";
import styles from "./registrarAnimal.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { BsCloudArrowUpFill } from "react-icons/bs";
import Layout from "../../components/layout";

// --- CONSTANTES DE OPÇÕES ---
const OPCOES_ESPECIE = ["CACHORRO", "GATO", "OUTRO"];
const OPCOES_PORTE = ["PEQUENO", "MEDIO", "GRANDE"];
const OPCOES_GENERO = ["MACHO", "FEMEA"];
const OPCOES_IDADE = ["FILHOTE", "ADULTO", "IDOSO"]; 
const OPCOES_COR = ["PRETO", "BRANCO", "MARROM", "CARAMELO", "CINZA", "RAJADO", "TRICOLOR", "DOURADO", "OUTRA"];
const OPCOES_STATUS_USUARIO = ["PERDIDO", "ENCONTRADO", "DISPONIVEL"]; 
const OPCOES_LOCAL_ATUAL = ["ABRIGO", "CLINICA", "CASA_PROTETOR"];

// --- NOVAS OPÇÕES DE STATUS PARA A ONG (AQUI ESTÁ O SEGREDO) ---
// Isso permite separar quem vai para a coluna de Adoção e quem vai para Lar Temporário
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
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [novoAnimalId, setNovoAnimalId] = useState<string | null>(null);

  const handleSelecaoDeArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagemArquivo(file);
      const reader = new FileReader();
      reader.onload = () => setImagemPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEnvio(true);
    setError(null);

    const token = localStorage.getItem("@AuthData:token"); 
    if (!token) {
      setError("Usuário não autenticado. Faça login novamente.");
      setLoadingEnvio(false);
      return;
    }
    if (!imagemArquivo) {
      setError("Por favor, selecione uma imagem.");
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

      setLoadingEnvio(false);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Falha ao registrar animal");
      }

      const novoAnimal = await response.json();
      setNovoAnimalId(novoAnimal.id);
      setShowModal(true);

    } catch (err) {
      setLoadingEnvio(false);
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    }
  };

  const handleFecharModal = () => {
    setShowModal(false);
    if (novoAnimalId) navigate(`/animal/${novoAnimalId}`);
  };

  return (
    <div className={styles.pageRegistroAnimal}>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitulo}>Registro Enviado!</h2>
            <p className={styles.modalTexto}>O animal foi cadastrado com sucesso.</p>
            <button className={styles.modalBotao} onClick={handleFecharModal}>OK</button>
          </div>
        </div>
      )}

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
          <label className={styles.label}>História</label>
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
            <select className={styles.barraInfos} required value={idade} onChange={(e) => setIdade(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_IDADE.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
          </div>

          <button type="submit" className={styles.botao} disabled={loadingEnvio}>
            {loadingEnvio ? "Enviando..." : "Enviar Formulário"}
          </button>
          {error && <p className={styles.erro}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

// =================================================================
// === COMPONENTE 2: FORMULÁRIO DA ONG (ATUALIZADO COM STATUS CORRETO) ===
// =================================================================
const RegistrarAnimalOng = () => {
  const navigate = useNavigate();

  // Imagens
  const [imgResgatePreview, setImgResgatePreview] = useState<string | null>(null);
  const [imgResgateArquivo, setImgResgateArquivo] = useState<File | null>(null);
  const [imgAtualPreview, setImgAtualPreview] = useState<string | null>(null);
  const [imgAtualArquivo, setImgAtualArquivo] = useState<File | null>(null);

  // Status e Localização
  const [statusOng, setStatusOng] = useState("DISPONIVEL"); // AQUI ESTÁ A CHAVE DA DIFERENCIAÇÃO
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
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [novoAnimalId, setNovoAnimalId] = useState<string | null>(null);

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

  const handleSubmitOng = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEnvio(true);
    setError(null);

    const token = localStorage.getItem("@AuthData:token"); 
    if (!token) {
      setError("Usuário não autenticado.");
      setLoadingEnvio(false);
      return;
    }
    if (!imgAtualArquivo) {
      setError("A foto atual do animal é obrigatória.");
      setLoadingEnvio(false);
      return;
    }

    const formData = new FormData();
    formData.append("imagem", imgAtualArquivo);
    if (imgResgateArquivo) formData.append("imagem_resgate", imgResgateArquivo);

    // Campos
    formData.append("nome", nome);
    formData.append("especie", especie);
    formData.append("sexo", genero);
    formData.append("raca", raca);
    formData.append("idade", idadeAprox);
    formData.append("data_resgate", dataResgate);
    formData.append("porte", porte);
    formData.append("cor", cor);
    formData.append("observacoes", obs);
    formData.append("descricao", historia);

    // Local e Status
    formData.append("local_estado", estado);
    formData.append("local_cidade", cidade);
    formData.append("local_numero", numero);
    formData.append("tinha_filhotes", filhotes);
    formData.append("tinha_coleira", coleira);
    formData.append("motivo_nao_disponivel", motivo);
    formData.append("local_atual", atualmente);
    
    // IMPORTANTE: Envia o status escolhido no dropdown específico da ONG
    // Isso garante que "LAR_TEMPORARIO" seja salvo corretamente no banco
    formData.append("status", statusOng); 

    // Saúde
    formData.append("vermifugado", vermifugado);
    formData.append("data_vermifugado", dataVermifugado);
    formData.append("vacinado", vacinado);
    formData.append("vacinas_texto", txtVacinado);
    formData.append("castrado", castrado);
    formData.append("data_castrado", dataCastrado);
    formData.append("testado_doencas", testado);
    formData.append("testes_texto", txtTestado);
    formData.append("resultados_testes", resultados);

    try {
        const response = await fetch("https://petresc.onrender.com/api/animais", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      setLoadingEnvio(false);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Falha ao registrar animal");
      }

      const novoAnimal = await response.json();
      setNovoAnimalId(novoAnimal.id);
      setShowModal(true);

    } catch (err) {
      setLoadingEnvio(false);
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido");
    }
  };

  const handleFecharModal = () => {
    setShowModal(false);
    if (novoAnimalId) navigate(`/animal/${novoAnimalId}`);
  };

  return (
    <>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitulo}>Formulário enviado</h2>
            <p className={styles.modalTexto}>O animal foi cadastrado com sucesso!</p>
            <button className={styles.modalBotao} onClick={handleFecharModal}>OK</button>
          </div>
        </div>
      )}

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

          {/* NOVO CAMPO: FINALIDADE DO CADASTRO (AQUI VOCÊ ESCOLHE SE É ADOÇÃO OU LAR TEMPORÁRIO) */}
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
            <small style={{display:'block', marginTop:'5px', color:'#666'}}>
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
            <select className={styles.barraInfos} value={idadeAprox} onChange={(e) => setIdadeAprox(e.target.value)}>
              <option value="" disabled>Selecione</option>
              {OPCOES_IDADE.map(opt => <option key={opt} value={opt}>{formatOption(opt)}</option>)}
            </select>
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
            <label className={styles.label}>História</label>
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

          {/* Testado (FIV/FeLV/Parvo)? */}
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
          {error && <p className={styles.erro}>{error}</p>}
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