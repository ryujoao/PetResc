import { useEffect, useLayoutEffect, useRef } from "react";
import Nav from "../components/navbar";
import styles from "../style/registrarAnimal.module.css";
 
export default function RegistrarAnimal() {
  const pageRef = useRef<HTMLDivElement | null>(null);
 
  // Mantém fullscreen (sem limite de largura nem padding global)
  useEffect(() => {
    const root = document.getElementById("root");
    root?.classList.add("fullscreen");
    return () => root?.classList.remove("fullscreen");
  }, []);
 
  // Mede a altura da navbar e compensa no container
  useLayoutEffect(() => {
    const pageEl = pageRef.current;
    if (!pageEl) return;
 
    // Tente pegar por id (se você puder adicionar em Nav), senão usa o <nav>
    const nav =
      document.getElementById("app-nav") ||
      document.querySelector("nav") as HTMLElement | null;
 
    const applyOffset = () => {
      const h = nav?.offsetHeight ?? 0;
      pageEl.style.paddingTop = `${h}px`;
      // se quiser garantir altura visível sem cortar:
      pageEl.style.minHeight = `calc(100vh - ${h}px)`;
    };
 
    applyOffset();
    window.addEventListener("resize", applyOffset);
    return () => window.removeEventListener("resize", applyOffset);
  }, []);
 
 
 
  return (
    <>
      <Nav />
      <div className={styles.pageRegistroAnimal}>
        <div className={styles.colunaUm}>
          <div className={styles.imagemContainer}   >
          <img
            src=""
            alt=""
            className={styles.imagem}
          />
          <span>Arraste uma imagem nesta área, ou clique para selecionar</span>
          </div>
          <label className={styles.label} htmlFor="nome">Nome</label>
          <input className={styles.barraInfos} type="text" id="nome" placeholder="Digite Deixe em branco se não tiver nome" required />
          <label className={styles.label} htmlFor="historia">História do Pet</label>
          <textarea className={styles.barraInfos} id="historia" placeholder="Conte a história do pet, como ele foi encontrado, como está sendo cuidado, etc." required></textarea>
        </div>
 
        <div className={styles.colunaDois}>
          <h1 className={styles.titulo}>Criar Registro Pet</h1>
          <p className={styles.subtitulo}>
            Crie a conta do pet seguindo suas necessidades
          </p>
          <form className={styles.formulario}>
            <label className={styles.label} htmlFor="situacao">Situação</label>
            <select className={styles.barraInfos} id="situacao" required>
              <option value="" disabled selected>Selecione</option>
              <option value="perdido">Perdido</option>
              <option value="encontrado">Encontrado</option>
              <option value="paraAdocao">Para Adoção</option>
            </select>
 
            <label className={styles.label} htmlFor="especie">Espécie</label>
            <select className={styles.barraInfos} id="especie" required>
              <option value="" disabled selected>Selecione</option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
            </select>
 
            <label className={styles.label} htmlFor="genero">Genêro</label>
            <select className={styles.barraInfos} id="genero" required>
              <option value="" disabled selected>Selecione</option>
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
            </select>
 
            <label className={styles.label} htmlFor="raca">Raça</label>
            <input className={styles.barraInfos} type="text" id="raca" placeholder="Deixe em branco se não souber a raça" />
 
            <label className={styles.label} htmlFor="porte">Porte:</label>
            <select  className={styles.barraInfos} id="porte" required>
              <option value="" disabled selected>Selecione</option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>
 
            <label className={styles.label} htmlFor="cor">Cor Predominante</label>
            <input className={styles.barraInfos} type="text" id="cor" placeholder="Digite a cor predominante do pet" />
 
            <label className={styles.label} htmlFor="idade">Idade</label>
            <input className={styles.barraInfos} type="text" id="idade" placeholder="Deixe em branco se não souber a idade" />
 
            <button type="submit" className={styles.botao}>
              Enviar Formulário
            </button>
          </form>
        </div>
      </div>
    </>
  );
}