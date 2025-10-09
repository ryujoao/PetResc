import { useLayoutEffect, useRef, useState } from "react";
import Nav from "../../components/navbar";
import styles from "./registrarAnimal.module.css";

export default function RegistrarAnimal() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // ... (seu código para ajustar o padding da página continua igual)
    const pageEl = pageRef.current;
    if (!pageEl) return;
    const topBar = document.querySelector(".topBar") as HTMLElement | null;
    const navBar = document.querySelector(".navbar") as HTMLElement | null;
    const topHeight = topBar?.offsetHeight ?? 0;
    const navHeight = navBar?.offsetHeight ?? 0;
    const totalHeight = topHeight + navHeight;
    pageEl.style.paddingTop = `${totalHeight}px`;
  }, []);

  // O seu estado para guardar a imagem continua o mesmo
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null
  );

  // A sua função para ler o arquivo também continua a mesma
  const handleSelecaoDeArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagemSelecionada(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Nav />
      <div ref={pageRef} className={styles.pageRegistroAnimal}>
        <div className={styles.colunaUm}>
          {/* ALTERADO: Toda a área de imagem foi refatorada */}
          <div className={styles.imagemContainer}>
            {/* Se NENHUMA imagem foi selecionada, mostra o novo formulário de upload */}
            {!imagemSelecionada ? (
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
              // Se UMA imagem foi selecionada, mostra a pré-visualização
              <div className={styles.previewContainer}>
                <img
                  src={imagemSelecionada}
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

          <label className={styles.label} htmlFor="nome">
            Nome
          </label>
          <input
            className={styles.barraInfos}
            type="text"
            id="nome"
            placeholder="Deixe em branco se não tiver nome"
            required
          />
          <label className={styles.label} htmlFor="historia">
            História do Pet
          </label>
          <textarea
            className={styles.barraInfos}
            id="historia"
            placeholder="Conte a história do pet, como ele foi encontrado, como está sendo cuidado, etc."
            required
          ></textarea>
          <label className={styles.label} htmlFor="cuidado">
            Cuidado Veterinário
          </label>
          <textarea
            className={styles.barraInfos}
            id="cuidado"
            placeholder="Ex: Vacinado, Castrado, ETC."
            required
          ></textarea>
          <label className={styles.label} htmlFor="sociabilidade">
            Sociabilidade
          </label>
          <textarea
            className={styles.barraInfos}
            id="sociabilidade"
            placeholder="Ex: Sociável com estranhos,  Sociável com gatos, ETC."
            required
          ></textarea>
        </div>

        <div className={styles.colunaDois}>
          <h1 className={styles.titulo}>Criar Registro Pet</h1>
          <p className={styles.subtitulo}>
            Crie a conta do pet seguindo suas necessidades
          </p>
          <form className={styles.formulario}>
            <label className={styles.label} htmlFor="situacao">
              Situação
            </label>
            <select className={styles.barraInfos} id="situacao" required>
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="perdido">Perdido</option>
              <option value="encontrado">Encontrado</option>
              <option value="paraAdocao">Para Adoção</option>
            </select>

            <label className={styles.label} htmlFor="especie">
              Espécie
            </label>
            <select className={styles.barraInfos} id="especie" required>
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
            </select>

            <label className={styles.label} htmlFor="genero">
              Genêro
            </label>
            <select className={styles.barraInfos} id="genero" required>
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
            </select>

            <label className={styles.label} htmlFor="raca">
              Raça
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="raca"
              placeholder="Deixe em branco se não souber a raça"
            />

            <label className={styles.label} htmlFor="porte">
              Porte:
            </label>
            <select className={styles.barraInfos} id="porte" required>
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>

            <label className={styles.label} htmlFor="cor">
              Cor Predominante
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="cor"
              placeholder="Digite a cor predominante do pet"
            />

            <label className={styles.label} htmlFor="idade">
              Idade
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="idade"
              placeholder="Deixe em branco se não souber a idade"
            />

            <button type="submit" className={styles.botao}>
              Enviar Formulário
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
