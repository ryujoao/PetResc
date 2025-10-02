import styles from "../style/centralAdocao.module.css";
import Nav from "../components/navbar";
import { useLayoutEffect, useRef, useState } from "react";


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
          Animais disponíveis para adoção:
        </p>

        <div className={styles.containerFiltrosPets}>
          <div className={styles.filtros}>
            <h2 className={styles.tituloFiltro}>Filtros</h2>
            <div className={styles.filtroGrupo}>
              <h3>Espécie</h3>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Cachorro
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Gato
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Pássaros
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Outros
              </label>
            </div>

            <div className={styles.filtroGrupo}>
              <h3>Gênero</h3>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Macho
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Fêmea
              </label>
            </div>

            <div className={styles.filtroGrupo}>
              <h3>Porte</h3>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Pequeno
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Médio
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Grande
              </label>
            </div>

            <div className={styles.filtroGrupo}>
              <h3>Idade</h3>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Filhote
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Adulto
              </label>
              <label className={styles.checkboxCustomizado}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Idoso
              </label>
            </div>

            <div className={styles.filtroGrupo}>
              <h3>Cor predominante</h3>
              <div className={styles.gradeCores}>
                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.preto}`}
                  ></span>
                  Preto
                </label>

                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.branco}`}
                  ></span>
                  Branco
                </label>

                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.marrom}`}
                  ></span>
                  Marrom
                </label>

                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.cinza}`}
                  ></span>
                  Cinza
                </label>

                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.caramelo}`}
                  ></span>
                  Caramelo
                </label>

                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.azul}`}
                  ></span>
                  Azul
                </label>

                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.vermelho}`}
                  ></span>
                  Vermelho
                </label>

                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.verde}`}
                  ></span>
                  Verde
                </label>

                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.laranja}`}
                  ></span>
                  Laranja
                </label>

                <label className={styles.itemCor}>
                  <input type="checkbox" />
                  <span className={styles.caixaCheckbox}></span>
                  <span
                    className={`${styles.bolinhaCor} ${styles.amarelo}`}
                  ></span>
                  Amarelo
                </label>
              </div>
            </div>

            <div className={styles.filtroGrupo}>
              <h3>Raça</h3>
              <select>
                <option value="">Todas</option>
                <option value="vira-lata">Vira-lata</option>
                <option value="poodle">Poodle</option>
                <option value="siamês">Siamês</option>
              </select>
            </div>
          </div>

          <section className={styles.listaPets}>
            <div className={styles.cardPet}>
              <img src="branquinho.png" alt="branquinho" />
              <h3>Branquinho</h3>
              <p>Sem raça definida (SRD)</p>
            </div>

            <div className={styles.cardPet}>
              <img src="feijao.png" alt="Feijão" />
              <h3>Feijão</h3>
              <p>Sem raça definida (SRD)</p>
            </div>

             <div className={styles.cardPet}>
              <img src="zeus.png" alt="Zeus" />
              <h3>Zeus</h3>
              <p>Pitbull</p>
            </div>

             <div className={styles.cardPet}>
              <img src="frajola.png" alt="Frajola" />
              <h3>Frajola</h3>
              <p>Sem raça definida (SRD)</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
