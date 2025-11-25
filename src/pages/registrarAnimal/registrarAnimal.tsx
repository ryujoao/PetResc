import { useState } from "react";
import styles from "./registrarAnimal.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { BsCloudArrowUpFill } from "react-icons/bs";
import Layout from "../../components/layout";

// =================================================================
// === COMPONENTE 1: FORMULÁRIO DO USUÁRIO COMUM ===
// =================================================================
const RegistrarAnimalUsuario = () => {
  const navigate = useNavigate();

  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);

  // Campos do Usuário
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

  // --- ESTADOS DO POP-UP ---
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
      
      // --- SUCESSO: Abre Modal ---
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
    if (novoAnimalId) {
      navigate(`/animal/${novoAnimalId}`);
    }
  };

  return (
    <div className={styles.pageRegistroAnimal}>
      
      {/* --- MODAL --- */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitulo}>Formulário enviado</h2>
            <p className={styles.modalTexto}>
              O animal foi cadastrado com sucesso em nosso sistema.
            </p>
            <p className={styles.modalTexto}>
              Você receberá um e-mail com os detalhes do registro. Em breve,
              nossa equipe poderá entrar em contato caso seja necessária alguma atualização.
            </p>
            <button className={styles.modalBotao} onClick={handleFecharModal}>
              OK
            </button>
          </div>
        </div>
      )}

      <div className={styles.colunaUm}>
        <div className={styles.campoForm}>
          <div className={styles.imagemContainer}>
            {!imagemPreview ? (
              <form className={styles.formularioUploadArquivo}>
                <label
                  className={styles.rotuloUploadArquivo}
                  htmlFor="uploadImagem"
                >
                  <div className={styles.designUploadArquivo}>
                    <BsCloudArrowUpFill />
                    <p>Arraste uma imagem nesta área</p>
                    <p>ou</p>
                    <span className={styles.botaoNavegar}>
                      Clique para selecionar uma imagem
                    </span>
                  </div>
                </label>
              </form>
            ) : (
              <div className={styles.previewContainer}>
                <img
                  src={imagemPreview}
                  alt="Preview"
                  className={styles.imagem}
                />
                <label
                  htmlFor="uploadImagem"
                  className={styles.botaoTrocarImagem}
                >
                  Trocar Imagem
                </label>
              </div>
            )}
            <input
              type="file"
              id="uploadImagem"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleSelecaoDeArquivo}
            />
          </div>
        </div>

        <div className={styles.campoForm}>
          <label className={styles.label} htmlFor="nome">
            Nome
          </label>
          <input
            className={styles.barraInfos}
            type="text"
            id="nome"
            placeholder="Deixe em branco se não tiver nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.campoForm}>
          <label className={styles.label} htmlFor="historia">
            História do Pet
          </label>
          <textarea
            className={styles.barraInfos}
            id="historia"
            placeholder="Conte a história..."
            value={historia}
            onChange={(e) => setHistoria(e.target.value)}
          />
        </div>

        <div className={styles.campoForm}>
          <label className={styles.label} htmlFor="cuidado">
            Cuidado Veterinário
          </label>
          <textarea
            className={styles.barraInfos}
            id="cuidado"
            placeholder="Ex: Vacinado..."
            value={cuidado}
            onChange={(e) => setCuidado(e.target.value)}
          />
        </div>

        <div className={styles.campoForm}>
          <label className={styles.label} htmlFor="sociabilidade">
            Sociabilidade
          </label>
          <textarea
            className={styles.barraInfos}
            id="sociabilidade"
            placeholder="Ex: Sociável..."
            value={sociabilidade}
            onChange={(e) => setSociabilidade(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.colunaDois}>
        <h1 className={styles.titulo}>Criar Registro Pet</h1>
        <p className={styles.subtitulo}>
          Crie a conta do pet seguindo suas necessidades
        </p>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          
          <div className={styles.campoForm}>
            <label className={styles.label} htmlFor="situacao">
              Situação
            </label>
            <select
              className={styles.barraInfos}
              id="situacao"
              required
              value={situacao}
              onChange={(e) => setSituacao(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="PERDIDO">Perdido</option>
              <option value="ENCONTRADO">Encontrado</option>
              <option value="DISPONIVEL">Para Adoção</option>
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label} htmlFor="especie">
              Espécie
            </label>
            <select
              className={styles.barraInfos}
              id="especie"
              required
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label} htmlFor="genero">
              Gênero
            </label>
            <select
              className={styles.barraInfos}
              id="genero"
              required
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="MACHO">Macho</option>
              <option value="FEMEA">Fêmea</option>
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label} htmlFor="raca">
              Raça
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="raca"
              placeholder="Opcional"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
            />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label} htmlFor="porte">
              Porte:
            </label>
            <select
              className={styles.barraInfos}
              id="porte"
              required
              value={porte}
              onChange={(e) => setPorte(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="Pequeno">Pequeno</option>
              <option value="Medio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label} htmlFor="cor">
              Cor Predominante
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="cor"
              placeholder="Cor"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label} htmlFor="idade">
              Idade
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="idade"
              placeholder="Opcional"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={styles.botao}
            disabled={loadingEnvio}
          >
            {loadingEnvio ? "Enviando..." : "Enviar Formulário"}
          </button>
          {error && <p className={styles.erro}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

// =================================================================
// === COMPONENTE 2: FORMULÁRIO DA ONG (COMPLETO E DETALHADO) ===
// =================================================================
const RegistrarAnimalOng = () => {
  const navigate = useNavigate();

  // --- States da ONG ---
  const [imgResgatePreview, setImgResgatePreview] = useState<string | null>(
    null
  );
  const [imgResgateArquivo, setImgResgateArquivo] = useState<File | null>(null);
  const [imgAtualPreview, setImgAtualPreview] = useState<string | null>(null);
  const [imgAtualArquivo, setImgAtualArquivo] = useState<File | null>(null);

  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const [filhotes, setFilhotes] = useState<"sim" | "nao" | "">("");
  const [coleira, setColeira] = useState<"sim" | "nao" | "">("");
  const [ondeEncontrado, setOndeEncontrado] = useState("");
  const [motivo, setMotivo] = useState("");
  const [atualmente, setAtualmente] = useState("");

  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("Cachorro");
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

  // --- ESTADOS DO POP-UP (ONG) ---
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

    formData.append("local_estado", estado);
    formData.append("local_cidade", cidade);
    formData.append("local_numero", numero);
    formData.append("tinha_filhotes", filhotes);
    formData.append("tinha_coleira", coleira);
    formData.append("motivo_nao_disponivel", motivo);
    formData.append("local_atual", atualmente);

    formData.append("vermifugado", vermifugado);
    formData.append("data_vermifugado", dataVermifugado);
    formData.append("vacinado", vacinado);
    formData.append("vacinas_texto", txtVacinado);
    formData.append("castrado", castrado);
    formData.append("data_castrado", dataCastrado);
    formData.append("testado_doencas", testado);
    formData.append("testes_texto", txtTestado);
    formData.append("resultados_testes", resultados);
    formData.append(
      "status",
      ondeEncontrado === "disponivel" ? "DISPONIVEL" : "NAO_DISPONIVEL"
    );

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
      
      // --- SUCESSO: Abre Modal ---
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
    if (novoAnimalId) {
      navigate(`/animal/${novoAnimalId}`);
    }
  };

  return (
    <>
      {/* --- MODAL DE SUCESSO (ONG) --- */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitulo}>Formulário enviado</h2>
            <p className={styles.modalTexto}>
              O animal foi cadastrado com sucesso em nosso sistema.
            </p>
            <p className={styles.modalTexto}>
              Você receberá um e-mail com os detalhes do registro. Em breve,
              nossa equipe poderá entrar em contato caso seja necessária alguma atualização.
            </p>
            <button className={styles.modalBotao} onClick={handleFecharModal}>
              OK
            </button>
          </div>
        </div>
      )}

      <form 
        className={`${styles.formOng} ${styles.pageRegistroAnimal}`} 
        onSubmit={handleSubmitOng}
      >
        {/* Coluna 1 - ESQUERDA */}
        <div className={styles.colunaUm}>
          <div className={styles.campoForm}>
            <div className={styles.imagemContainer}>
              {!imgResgatePreview ? (
                <label
                  className={styles.rotuloUploadArquivo}
                  htmlFor="uploadResgate"
                >
                  <div className={styles.designUploadArquivo}>
                    <BsCloudArrowUpFill />
                    <p>Arraste ou clique</p>
                  </div>
                </label>
              ) : (
                <div className={styles.previewContainer}>
                  <img
                    src={imgResgatePreview}
                    alt="Foto resgate"
                    className={styles.imagem}
                  />
                  <label
                    htmlFor="uploadResgate"
                    className={styles.botaoTrocarImagem}
                  >
                    Trocar
                  </label>
                </div>
              )}
              <input
                type="file"
                id="uploadResgate"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImgResgate}
              />
              <label className={styles.label}>Foto do resgate</label>
            </div>
          </div>

          <div className={styles.campoForm}>
            <div className={styles.imagemContainer}>
              {!imgAtualPreview ? (
                <label
                  className={styles.rotuloUploadArquivo}
                  htmlFor="uploadAtual"
                >
                  <div className={styles.designUploadArquivo}>
                    <BsCloudArrowUpFill />
                    <p>Arraste ou clique</p>
                  </div>
                </label>
              ) : (
                <div className={styles.previewContainer}>
                  <img
                    src={imgAtualPreview}
                    alt="Foto atual"
                    className={styles.imagem}
                  />
                  <label
                    htmlFor="uploadAtual"
                    className={styles.botaoTrocarImagem}
                  >
                    Trocar
                  </label>
                </div>
              )}
              <input
                type="file"
                id="uploadAtual"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImgAtual}
              />
              <label className={styles.label}>Foto atual do animal*</label>
            </div>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Local Encontrado</label>
            <input
              className={styles.barraInfos}
              type="text"
              placeholder="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
            <input
              className={styles.barraInfos}
              style={{ marginTop: "8px" }}
              type="text"
              placeholder="Cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <input
              className={styles.barraInfos}
              style={{ marginTop: "8px" }}
              type="text"
              placeholder="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Com filhotes?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="filhotes"
                  value="sim"
                  checked={filhotes === "sim"}
                  onChange={(e) => setFilhotes("sim")}
                />
                <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="filhotes"
                  value="nao"
                  checked={filhotes === "nao"}
                  onChange={(e) => setFilhotes("nao")}
                />
                <span className={styles.checkmark}></span>Não
              </label>
            </div>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Com Coleira?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="coleira"
                  value="sim"
                  checked={coleira === "sim"}
                  onChange={(e) => setColeira("sim")}
                />
                <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="coleira"
                  value="nao"
                  checked={coleira === "nao"}
                  onChange={(e) => setColeira("nao")}
                />
                <span className={styles.checkmark}></span>Não
              </label>
            </div>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Disponível para adoção?</label>
            <select
              className={styles.barraInfos}
              value={ondeEncontrado}
              onChange={(e) => setOndeEncontrado(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="disponivel">Sim</option>
              <option value="naoDisponivel">Não</option>
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Motivo (se não)</label>
            <input
              className={styles.barraInfos}
              type="text"
              placeholder="Ex: Em tratamento"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              disabled={ondeEncontrado === "disponivel"}
            />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Local atual</label>
            <select
              className={styles.barraInfos}
              value={atualmente}
              onChange={(e) => setAtualmente(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="larTemporario">Lar temporário</option>
              <option value="abrigo">Abrigo</option>
            </select>
          </div>
        </div>

        {/* Coluna 2 - DIREITA */}
        <div className={styles.colunaDois}>
          <h1 className={styles.titulo}>Criar Registro Pet (ONG)</h1>
          <p className={styles.subtitulo}>
            Registro detalhado para controle da organização
          </p>

          <div className={styles.campoForm}>
            <label className={styles.label}>Nome</label>
            <input
              className={styles.barraInfos}
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Espécie</label>
            <select
              className={styles.barraInfos}
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
            >
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Gênero</label>
            <select
              className={styles.barraInfos}
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="MACHO">Macho</option>
              <option value="FEMEA">Fêmea</option>
            </select>
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Raça</label>
            <input
              className={styles.barraInfos}
              type="text"
              placeholder="Raça"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
            />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Idade</label>
            <input
              className={styles.barraInfos}
              type="text"
              placeholder="Ex: 2 anos"
              value={idadeAprox}
              onChange={(e) => setIdadeAprox(e.target.value)}
            />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Data de Resgate</label>
            <input
              className={styles.barraInfos}
              type="date"
              value={dataResgate}
              onChange={(e) => setDataResgate(e.target.value)}
            />
          </div>

          <div className={styles.campoForm}>
              <label className={styles.label}>Porte</label>
              <select
                className={styles.barraInfos}
                value={porte}
                onChange={(e) => setPorte(e.target.value)}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="Pequeno">Pequeno</option>
                <option value="Medio">Médio</option>
                <option value="Grande">Grande</option>
              </select>
          </div>
          
          <div className={styles.campoForm}>
              <label className={styles.label}>Cor Predominante</label>
              <input
                className={styles.barraInfos}
                type="text"
                placeholder="Cor predominante"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
              />
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>História</label>
            <textarea
              className={styles.barraInfos}
              placeholder="História..."
              style={{ marginBottom: "10px" }}
              value={historia}
              onChange={(e) => setHistoria(e.target.value)}
            />
          </div>
          
          <div className={styles.campoForm}>
            <label className={styles.label}>Observações</label>
            <textarea
              className={styles.barraInfos}
              placeholder="Obs: Comportamento, etc."
              value={obs}
              onChange={(e) => setObs(e.target.value)}
            />
          </div>

          {/* --- ÁREA DE SAÚDE --- */}
          <h3
            className={styles.label}
            style={{ marginTop: "20px", borderBottom: "1px solid #ccc" }}
          >
            Saúde
          </h3>

          <div className={styles.campoForm}>
            <label className={styles.label}>Vermifugado?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="vermifugado"
                  value="sim"
                  checked={vermifugado === "sim"}
                  onChange={() => setVermifugado("sim")}
                />
                <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="vermifugado"
                  value="nao"
                  checked={vermifugado === "nao"}
                  onChange={() => setVermifugado("nao")}
                />
                <span className={styles.checkmark}></span>Não
              </label>
            </div>
            {vermifugado === "sim" && (
              <input
                className={styles.barraInfos}
                type="date"
                style={{ marginTop: "8px" }}
                value={dataVermifugado}
                onChange={(e) => setDataVermifugado(e.target.value)}
              />
            )}
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Vacinado?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="vacinado"
                  value="sim"
                  checked={vacinado === "sim"}
                  onChange={() => setVacinado("sim")}
                />
                <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="vacinado"
                  value="nao"
                  checked={vacinado === "nao"}
                  onChange={() => setVacinado("nao")}
                />
                <span className={styles.checkmark}></span>Não
              </label>
            </div>
            {vacinado === "sim" && (
              <input
                className={styles.barraInfos}
                type="text"
                placeholder="Quais vacinas?"
                style={{ marginTop: "8px" }}
                value={txtVacinado}
                onChange={(e) => setTxtVacinado(e.target.value)}
              />
            )}
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Castrado?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="castrado"
                  value="sim"
                  checked={castrado === "sim"}
                  onChange={() => setCastrado("sim")}
                />
                <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="castrado"
                  value="nao"
                  checked={castrado === "nao"}
                  onChange={() => setCastrado("nao")}
                />
                <span className={styles.checkmark}></span>Não
              </label>
            </div>
            {castrado === "sim" && (
              <input
                className={styles.barraInfos}
                type="date"
                style={{ marginTop: "8px" }}
                value={dataCastrado}
                onChange={(e) => setDataCastrado(e.target.value)}
              />
            )}
          </div>

          <div className={styles.campoForm}>
            <label className={styles.label}>Testado para doenças?</label>
            <div className={styles.grupoOpcoes}>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="testado"
                  value="sim"
                  checked={testado === "sim"}
                  onChange={() => setTestado("sim")}
                />
                <span className={styles.checkmark}></span>Sim
              </label>
              <label className={styles.checkboxCustomizado}>
                <input
                  type="radio"
                  name="testado"
                  value="nao"
                  checked={testado === "nao"}
                  onChange={() => setTestado("nao")}
                />
                <span className={styles.checkmark}></span>Não
              </label>
            </div>
            {testado === "sim" && (
              <>
                <input
                  className={styles.barraInfos}
                  type="text"
                  placeholder="Quais testes?"
                  style={{ marginTop: "8px" }}
                  value={txtTestado}
                  onChange={(e) => setTxtTestado(e.target.value)}
                />
                <input
                  className={styles.barraInfos}
                  type="text"
                  placeholder="Resultados"
                  style={{ marginTop: "8px" }}
                  value={resultados}
                  onChange={(e) => setResultados(e.target.value)}
                />
              </>
            )}
          </div>

          <button type="submit" className={styles.botao} disabled={loadingEnvio}>
            {loadingEnvio ? "Registrando..." : "Finalizar Registro ONG"}
          </button>
          {error && <p className={styles.erro}>{error}</p>}
        </div>
      </form>
    </>
  );
};

// =================================================================
// === COMPONENTE PRINCIPAL: GERENCIADOR DA PÁGINA ===
// =================================================================
const PaginaRegistrarAnimal = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className={styles.loading}>Carregando informações...</div>;
  }

  return (
    <>
    <Layout>
      {user?.role === "ONG" ? (
        <RegistrarAnimalOng />
      ) : (
        <RegistrarAnimalUsuario />
      )}
      </Layout>
    </>
  );
};

export default PaginaRegistrarAnimal;