import styles from "../style/centralAdocao.module.css";
import Nav from "../components/navbar";
import { useLayoutEffect, useRef } from "react";

export default function CentralAdocao() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      const pageEl = pageRef.current;
      if (!pageEl) return;

      const topBar = document.querySelector(".topBar") as HTMLElement | null;
      const navBar = document.querySelector(".navbar") as HTMLElement | null;

      const topHeight = topBar?.offsetHeight ?? 0;
      const navHeight = navBar?.offsetHeight ?? 0;
      const totalHeight = topHeight + navHeight;

      pageEl.style.paddingTop = `${totalHeight}px`;
      pageEl.style.minHeight = `calc(100vh - ${totalHeight}px)`;
    }, 0);
  }, []);

  return (
    <>
      <Nav />
      <div ref={pageRef} className={styles.pageCentralAdocao}>
        <h1 className={styles.titulo}>Centro de Adoção</h1>
        <p className={styles.subtitulo}>
          Encontre o pet ideal para adoção usando os filtros abaixo.
        </p>

        <div className={styles.container}>
          {/* Filtros */}
          <aside className={styles.filtros}>
            <h2>Filtrar por:</h2>

            <label>Espécie</label>
            <select>
              <option value="">Todos</option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
              <option value="outros">Outros</option>
            </select>

            <label>Porte</label>
            <select>
              <option value="">Todos</option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>

            <label>Idade</label>
            <select>
              <option value="">Todas</option>
              <option value="filhote">Filhote</option>
              <option value="adulto">Adulto</option>
              <option value="idoso">Idoso</option>
            </select>

            <label>Sexo</label>
            <select>
              <option value="">Todos</option>
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
            </select>

            <label>Cor predominante</label>
            <select>
              <option value="">Todas</option>
              <option value="branco">Branco</option>
              <option value="preto">Preto</option>
              <option value="marrom">Marrom</option>
              <option value="amarelo">Amarelo</option>
              <option value="cinza">Cinza</option>
              <option value="laranja">Laranja</option>
              <option value="mesclado">Mesclado</option>
            </select>
          </aside>

          {/* Lista de pets */}
          <section className={styles.listaPets}>
            {/* Exemplo de card de pet */}
            <div className={styles.cardPet}>
              <img src="/pets/zeus.jpg" alt="Zeus" />
              <h3>Zeus</h3>
              <p>Cachorro • Macho • Adulto</p>
            </div>

            <div className={styles.cardPet}>
              <img src="/pets/feijao.jpg" alt="Feijão" />
              <h3>Feijão</h3>
              <p>Gato • Macho • Adulto</p>
            </div>

            {/* Adicione mais cards conforme necessário */}
          </section>
        </div>
      </div>
    </>
  );
}
