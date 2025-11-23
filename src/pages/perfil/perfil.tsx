import { Link } from "react-router-dom";
import styles from "./perfil.module.css";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { TbSettingsFilled } from "react-icons/tb";
import { BsFillPersonFill, BsHeart, BsHeartFill, BsPlus } from "react-icons/bs";

interface UserData {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  role: string;
  // NOVO: Adicionei nomeOng para bater com a lógica da Navbar
  // (Seu backend precisa enviar isso)
  nomeOng?: string;
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

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("@AuthData:token");
      if (!token) {
        console.error("Usuário não autenticado");
        return;
      }

      try {
        const response = await fetch("https://petresc.onrender.com/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Token enviado:", token);

        if (!response.ok) {
          throw new Error("Falha ao buscar dados do usuário");
        }

        const data: UserData = await response.json();
        console.log("Dados recebidos:", data);
        setUsuario(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Layout>
        <div className={styles.perfilContainer}>
          <div className={styles.banner}>
            <Link to="/config" className={styles.configIcon}>
              <TbSettingsFilled />
            </Link>
          </div>

          <div className={styles.avatar}>
            <div className={styles.avatarLabel}>
              <BsFillPersonFill className={styles.avatarIcon} />
            </div>
          </div>

          <div className={styles.infoContainer}>
            <div className={`${styles.infoBox} ${styles.alignLeft}`}>
              <p>{usuario?.email || "Email não disponível"}</p>
              <p>{usuario?.telefone || "Telefone não disponível"}</p>
            </div>
            <div className={`${styles.infoBox} ${styles.alignCenter}`}>
              <p className={styles.username}>
                {/* Lógica para mostrar nome da ONG ou nome do usuário */}
                {usuario?.role === "ONG"
                  ? usuario?.nomeOng || usuario?.nome
                  : usuario?.nome || "Username"}
              </p>
            </div>
            <div className={`${styles.infoBox} ${styles.alignRight}`}>
              <p>Localização</p>
              <p>SP, Brasil</p>
            </div>
          </div>

          <div className={styles.btnContainer}>
            <button
              className={
                activeView === "todos" ? styles.tabUm : styles.tabDois
              }
              onClick={() => setActiveView("todos")}
            >
              Meus Pets
            </button>
            <button
              className={
                activeView === "salvos" ? styles.tabUm : styles.tabDois
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
            <Link to="/registrar-animal" className={styles.addIcon}>
              <BsPlus />
            </Link>
          </div>

          <div className={styles.petsContainer}>
            {petsParaExibir.map((pet) => (
              <div key={pet.id} className={styles.petCard}>
                <img src={pet.img} alt={pet.nome} className={styles.petImage} />
                <p className={styles.petNome}>{pet.nome}</p>
                <p className={styles.petRaca}>{pet.raca}</p>
                <p className={styles.petSexo}>{pet.sexo}</p>

                {pet.favorito ? (
                  <BsHeartFill
                    className={styles.favorite}
                    onClick={() => toggleFavorito(pet.id)}
                  />
                ) : (
                  <BsHeart
                    className={styles.nonFavorite}
                    onClick={() => toggleFavorito(pet.id)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
