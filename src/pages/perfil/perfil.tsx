import { Link } from "react-router-dom";
import Footer from "../../components/footer";
import Nav from "../../components/navbar";
import styles from "./perfil.module.css";
import { useLayoutEffect, useRef, useState, useEffect } from "react";


interface UserData {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  role: string;
}

interface Pet {
  id: number;
  nome: string;
  raca: string;
  sexo: string;
  img: string;
  favorito: boolean;
}

const petsIniciais: Pet[] = [
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

  const [usuario, setUsuario] = useState<UserData | null>(null);
  const [pets, setPets] = useState<Pet[]>(petsIniciais);
  const [activeView, setActiveView] = useState<"todos" | "salvos">("todos");

const toggleFavorito = (idDoPet: number) => {
  setPets((petsAtuais) =>
    petsAtuais.map((pet) =>
      pet.id === idDoPet ? { ...pet, favorito: !pet.favorito } : pet
    )
  );
};

const petsParaExibir =
  activeView === "todos" ? pets : pets.filter((pet) => pet.favorito);
  const [petsSalvos, setPetsSalvos] = useState([
    {
      nome: "Zeus",
      raca: "Pitbull.",
      sexo: "M",
      img: "../../../public/animais/zeus.png",
     },
    {
      nome: "Frajola",
      raca: "Sem raça definida (SRD)",
      sexo: "F",
     img: "../../../public/animais/frajola.png",
    },
    {
      nome: "Branquinho",
      raca: "Sem raça definida (SRD)",
      sexo: "M",
      img: "../../../public/animais/branquinho.png",
    },
  ]);

  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null
  );

   useEffect(() => {
  const fetchUserData = async () => {
     const token = localStorage.getItem('@AuthData:token');
    if (!token) {
      console.error("Usuário não autenticado");
      return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/me', {
         method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         }
      });
      
       console.log("Token enviado:", token);

      if (!response.ok) {
        throw new Error('Falha ao buscar dados do usuário');
      }

      const data: UserData = await response.json();
      console.log("Dados recebidos:", data);
      setUsuario(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUserData();
}, []);



  return (
    <>
      <Nav />

      <div className={styles.perfilContainer} ref={pageRef}>
        <Link to="/config" className={styles.configIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
          </svg>
        </Link>

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
                width={16}
                height={16}
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
          <div className={styles.infoBox}>
             <p>{usuario?.email || 'Email não disponível'}</p>
             <p>{usuario?.telefone || 'Telefone não disponível'}</p>
             <p className={styles.username}>{usuario?.nome || usuario?.nome || 'Username'}</p>
          </div>
          {/* <div className={styles.infoBox}>
          <p className={styles.username}>{usuario?.nome || 'Username'}</p>
          </div> */}
          <div className={styles.infoBox}>
            <p>Localização</p>
            <p>SP, Brasil</p>
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button
            className={
              activeView === "todos" ? styles.salvos : styles.editarPerfil
            }
            onClick={() => setActiveView("todos")}
          >
            Meus Pets
          </button>
          <button
            className={
              activeView === "salvos" ? styles.salvos : styles.editarPerfil
            }
            onClick={() => setActiveView("salvos")}
          >
            Salvos
          </button>
        </div>

        <div className={styles.petsHeader}>
          <h2 className={styles.petsTitulo}>
            {activeView === "todos" ? "Meus Pets" : "Pets Salvos"}
          </h2>
          <Link to="/registrarAnimal" className={styles.addIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </Link>
        </div>

        <div className={styles.petsContainer}>
          {petsParaExibir.map((pet) => (
            <div key={pet.id} className={styles.petCard}>
              <img src={pet.img} alt={pet.nome} className={styles.petImage} />
              <p className={styles.petNome}>{pet.nome}</p>
              <p className={styles.petRaca}>{pet.raca}</p>
              <p className={styles.petSexo}>{pet.sexo}</p>

              <span
                className={pet.favorito ? styles.favorite : styles.nonFavorite}
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
