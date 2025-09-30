import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Nav from "../components/navbar";
import styles from "../style/registrarAnimal.module.css";

export default function RegistrarAnimal() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  /* NavBar e TopBar com posições fixas e nao sobrepondo o código*/
  useLayoutEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;

    const topBar = document.querySelector(
      `.${styles.topBar}`
    ) as HTMLElement | null;
    const navBar = document.querySelector(
      `.${styles.navbar}`
    ) as HTMLElement | null;

    const topHeight = topBar?.offsetHeight ?? 0;
    const navHeight = navBar?.offsetHeight ?? 0;
    const totalHeight = topHeight + navHeight;

    pageEl.style.paddingTop = `${totalHeight}px`;
    pageEl.style.minHeight = `calc(100vh - ${totalHeight}px)`;
  }, []);

  // Estado que guarda a imagem selecionada (como base64)
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null
  );

  return (
    <>
      <Nav />
      <div ref={pageRef} className={styles.pageRegistroAnimal}>
        <div className={styles.colunaUm}>
          <div className={styles.imagemContainer}>
            {/* Label associada ao input escondido, mas aplicada só na imagem */}
            <label htmlFor="uploadImagem">
              <img
                // Se tiver imagem selecionada, mostra ela. Senão, mostra imagem padrão
                src={imagemSelecionada || "/iconeImg.png"} // substitua pelo caminho do seu ícone
                alt="Clique para selecionar imagem"
                className={styles.imagem}
                style={{ cursor: "pointer" }}
              />
            </label>

            {/* Texto explicativo só aparece se nenhuma imagem foi selecionada */}
            {!imagemSelecionada && (
              <span className={styles.textoImagem}>
                Arraste uma imagem nesta área, ou clique na imagem para
                selecionar.
              </span>
            )}

            {/* Input escondido que abre ao clicar na imagem */}
            <input
              type="file"
              id="uploadImagem"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setImagemSelecionada(reader.result as string); // salva a imagem como base64
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <label className={styles.label} htmlFor="nome">
            Nome
          </label>
          <input
            className={styles.barraInfos}
            type="text"
            id="nome"
            placeholder="Digite Deixe em branco se não tiver nome"
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
            placeholder="Ex: Sociável com estranhos,  Sociável com gatos, ETC."
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
