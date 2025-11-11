import { useLayoutEffect, useRef, useState } from "react";
import Nav from "../../components/navbar";
import styles from "./registrarAnimal.module.css";
import { useNavigate } from "react-router-dom";

export default function RegistrarAnimal() {
  const pageRef = useRef<HTMLDivElement | null>(null);
 
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;
    const topBar = document.querySelector(".topBar") as HTMLElement | null;
    const navBar = document.querySelector(".navbar") as HTMLElement | null;
    const topHeight = topBar?.offsetHeight ?? 0;
    const navHeight = navBar?.offsetHeight ?? 0;
    const totalHeight = topHeight + navHeight;
    pageEl.style.paddingTop = `${totalHeight}px`;
  }, []); 

  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelecaoDeArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagemArquivo(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImagemPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

  const token = localStorage.getItem("@AuthData:token");
    if (!token) {
      setError("Usuário não autenticado. Faça login novamente.");
      setLoading(false);
      return;
    }

    if (!imagemArquivo) {
      setError("Por favor, selecione uma imagem.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('imagem', imagemArquivo);
    formData.append('nome', nome);
    formData.append('especie', especie);
    formData.append('raca', raca);
    formData.append('idade', idade);
    formData.append('status', situacao);
    formData.append('porte', porte);
    formData.append('sexo', genero);
    formData.append('descricao', historia);
    // Lembre-se de adicionar 'cor', 'cuidado', 'sociabilidade' se o backend os aceitar
     formData.append('cor', cor);
     formData.append('cuidado', cuidado);
     formData.append('sociabilidade', sociabilidade);

    try {
      const response = await fetch('http://localhost:3000/api/animais', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      setLoading(false);

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Falha ao registrar animal');
      }

      const novoAnimal = await response.json();
      alert('Animal registrado com sucesso!');
      navigate(`/animal/${novoAnimal.id}`); 

    } catch (err) {
    setLoading(false);
    if (err instanceof Error) {
      setError(err.message);
      console.error(err);
    } else {
      setError("Erro desconhecido");
      console.error("Erro não identificado:", err);
    }
  } // <-- fecha o catch
}; // <-- fecha a função handleSubmit

  return (
    <>
      <Nav />
      <div ref={pageRef} className={styles.pageRegistroAnimal}>
        <div className={styles.colunaUm}>
          <div className={styles.imagemContainer}>
            {!imagemPreview ? (
              <form className={styles.formularioUploadArquivo}>
                <label
                  className={styles.rotuloUploadArquivo}
                  htmlFor="uploadImagem"
                >
                  <div className={styles.designUploadArquivo}>
                    <svg height="1em" viewBox="0 0 640 512">
                      <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                    </svg>
                    <p>Arraste uma imagem nesta área</p>
                    <p>ou</p>
                    <span className={styles.botaoNavegar}>
                      clique para selecionar uma imagem
                    </span>
                  </div>
                </label>
              </form>
            ) : (
              <div className={styles.previewContainer}>
                {/* CORREÇÃO 4: Usando 'imagemPreview' para o src */}
                <img
                  src={imagemPreview}
                  alt="Pré-visualização da imagem selecionada"
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

          {}
          <label className={styles.label} htmlFor="nome">
            Nome
          </label>
          <input className={styles.barraInfos}
            type="text"
            id="nome"
            placeholder="Deixe em branco se não tiver nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
        />
          <label className={styles.label} htmlFor="historia">
            História do Pet
          </label>
          <textarea
            className={styles.barraInfos}
            id="historia"
            placeholder="Conte a história do pet, como ele foi encontrado..."
            required
            value={historia}
            onChange={(e) => setHistoria(e.target.value)}
          />
          <label className={styles.label} htmlFor="cuidado">
            Cuidado Veterinário
          </label>
          <textarea
            className={styles.barraInfos}
            id="cuidado"
            placeholder="Ex: Vacinado, Castrado, ETC."
            required
            value={cuidado}
            onChange={(e) => setCuidado(e.target.value)}
          />
          <label className={styles.label} htmlFor="sociabilidade">
            Sociabilidade
          </label>
          <textarea
            className={styles.barraInfos}
            id="sociabilidade"
            placeholder="Ex: Sociável com estranhos, Sociável com gatos, ETC."
            required
            value={sociabilidade}
            onChange={(e) => setSociabilidade(e.target.value)}
          />
        </div>

        <div className={styles.colunaDois}>
          <h1 className={styles.titulo}>Criar Registro Pet</h1>
          <p className={styles.subtitulo}>
            Crie a conta do pet seguindo suas necessidades
          </p>
          {/*
            'handleSubmit' agora é lido pela tag <form>
           */}
          <form className={styles.formulario} onSubmit={handleSubmit}>
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
              <option value="" disabled>Selecione</option>
              <option value="PERDIDO">Perdido</option>
              <option value="ENCONTRADO">Encontrado</option>
              <option value="DISPONIVEL">Para Adoção</option>
            </select>

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
              <option value="" disabled>Selecione</option>
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>

            <label className={styles.label} htmlFor="genero">
              Genêro
            </label>
            <select
              className={styles.barraInfos}
              id="genero"
              required
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="" disabled>Selecione</option>
              <option value="MACHO">Macho</option>
              <option value="FEMEA">Fêmea</option>
            </select>

            <label className={styles.label} htmlFor="raca">
              Raça
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="raca"
              placeholder="Deixe em branco se não souber a raça"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
            />

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
              <option value="" disabled>Selecione</option>
             <option value="Pequeno">Pequeno</option>
              <option value="Medio">Médio</option>
              <option value="Grande">Grande</option>
         </select>

            <label className={styles.label} htmlFor="cor">
              Cor Predominante
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="cor"
              placeholder="Digite a cor predominante do pet"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />

            <label className={styles.label} htmlFor="idade">
              Idade
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="idade"
              placeholder="Deixe em branco se não souber a idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />

              <button type="submit" className={styles.botao} disabled={loading}>
               {loading ? "Enviando..." : "Enviar Formulário"}
             </button>
             {error && <p className={styles.erro}>{error}</p>} 
           </form>
       </div>
      </div>
    </>
  );
}
