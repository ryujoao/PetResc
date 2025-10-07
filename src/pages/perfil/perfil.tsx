import Footer from "../../components/footer";
import Nav from "../../components/navbar";
import styles from "./perfil.module.css";
import { useLayoutEffect, useRef, useState } from "react";

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

  // Estado que guarda a imagem selecionada (como base64)
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null
  );

  return (
    <>
      <Nav />

      <div className={styles.perfilContainer}>
        {/* Banner com avatar */}
        <div className={styles.banner}>
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
                    setImagemSelecionada(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>

        {/* Infos do usuário */}
        <div className={styles.infoContainer}>
          <div className={styles.infoBox}>
            <p>Contato</p>
            <p>Username@gmail.com</p>
            <p>11 96584 2214</p>
          </div>
          <div className={styles.infoBox}>
            <p className={styles.username}>Username</p>
          </div>
          <div className={styles.infoBox}>
            <p>Localização</p>
            <p>SP, Brasil</p>
          </div>
        </div>

        {/* Botões */}
        <div className={styles.btnContainer}>
          <button className={styles.btnActive}>Salvos</button>
          <button className={styles.btn}>Editar perfil</button>
        </div>

        {/* Pets salvos */}
        <div className={styles.petsContainer}>
          {[
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
          ].map((pet, index) => (
            <div key={index} className={styles.petCard}>
              <img src={pet.img} alt={pet.nome} className={styles.petImage} />
              <p className={styles.petNome}>{pet.nome}</p>
              <p className={styles.petRaca}>{pet.raca}</p>
              <p className={styles.petSexo}>{pet.sexo}</p>
              <span className={styles.favorite}>♥</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
