import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Nav from "../../components/navbar";
import styles from "./perfil.module.css";
import { useLayoutEffect, useRef, useState } from "react";

const petsIniciais = [
  {
    id: 1, 
    nome: "Neguinho",
    raca: "Sem raça definida (SRD)",
    sexo: "M",
    img: "../../../public/animais/neguinho.png",
    favorito: false,
  },
  {
    id: 2, 
    nome: "Frajola",
    raca: "Sem raça definida (SRD)",
    sexo: "F",
    img: "../../../public/animais/frajola.png",
    favorito: false,
  },
  {
    id: 3, 
    nome: "Rabito",
    raca: "Sem raça definida (SRD)",
    sexo: "M",
    img: "../../../public/animais/rabito.png",
    favorito: true,
  },
];

export default function Perfil() {
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

  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null
  );

  const [pets, setPets] = useState(petsIniciais);

  const nome = localStorage.getItem("nomeUsuario") || "Username";

  const toggleFavorito = (idDoPet) => {
    setPets((petsAtuais) =>
      petsAtuais.map((pet) => {
        if (pet.id !== idDoPet) {
          return pet;
        }
        return { ...pet, favorito: !pet.favorito };
      })
    );
  };

  return (
    <>
      <Nav />

    

      <div className={styles.perfilContainer} ref={pageRef}>
        <div className={styles.banner}></div>

        <div className={styles.avatar}>
          <label htmlFor="uploadImagem" className={styles.avatarLabel}>
            {imagemSelecionada ? (
              <img
                src={imagemSelecionada}
                alt="Avatar"
                className={styles.avatarImage}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={styles.avatarIcon}
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            )}
          </label>

        </div>

        
        <div className={styles.infoContainer}>
          <div className={`${styles.infoBox} ${styles.alignLeft}`}>
            <p>
              <strong>Contato</strong>
            </p>
            <p>Username@gmail.com</p>
            <p>11 96584 2214</p>
          </div>
          <div className={`${styles.infoBox} ${styles.alignCenter}`}>
            <p className={styles.username}>
              <strong>{nome}</strong>
            </p>
          </div>
          <div className={`${styles.infoBox} ${styles.alignRight}`}>
            <p>
              <strong>Localização</strong>
            </p>
            <p>SP, Brasil</p>
          </div>
        </div>

        
        <div className={styles.btnContainer}>
          <button className={styles.salvos}>Salvos</button>
        </div>

        <div className={styles.petsHeader}>
          <h2 className={styles.petsTitulo}>Meus Pets</h2>
          <Link to="/registrarAnimal" className={styles.addIcon}>
            +
          </Link>
        </div>

        
        <div className={styles.petsContainer}>
          
        
          {pets.map((pet) => ( 
            <div key={pet.id} className={styles.petCard}> 
              <img src={pet.img} alt={pet.nome} className={styles.petImage} />
              <p className={styles.petNome}>{pet.nome}</p>
              <p className={styles.petRaca}>{pet.raca}</p>
              <p className={styles.petSexo}>{pet.sexo}</p>

              <span
                className={
                  pet.favorito ? styles.favorite : styles.nonFavorite
                }
                onClick={() => toggleFavorito(pet.id)}
              >
                ♥
              </span>

            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}