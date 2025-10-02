import Footer from "../components/footer";
import Nav from "../components/navbar";
import styles from "../style/perfil.module.css";

export default function Perfil() {
  return (
    <>
      <Nav />

      <div className={styles.perfilContainer}>
        {/* Banner com avatar */}
        <div className={styles.banner}>
          <div className={styles.avatar}></div>
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
            { nome: "Neguinho", raca: "Sem raça definida (SRD)", sexo: "M", img: "/pet1.png" },
            { nome: "Frajao", raca: "Sem raça definida (SRD)", sexo: "F", img: "/pet2.png" },
            { nome: "Rabito", raca: "Sem raça definida (SRD)", sexo: "F", img: "/pet3.png" },
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
