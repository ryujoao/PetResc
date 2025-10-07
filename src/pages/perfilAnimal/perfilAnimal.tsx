import { useParams } from "react-router-dom";
import Nav from "../../components/navbar";
import styles from "./perfilAnimal.module.css";

type Pet = {
  nome: string;
  especie: string;
  raca: string;
  idade: string;
  sexo: string;
  porte: string;
  cor: string;
  imagem: string;
  cuidados: string[];
  temperamento: string[];
  sociabilidade: string[];
  comentario: string;
};

// Simulação de dados locais (pode vir de API depois)
const pets: Record<string, Pet> = {
  branquinho: {
    nome: "Branquinho",
    especie: "Gato",
    raca: "Sem Raça Definida (SRD)",
    idade: "Adulto",
    sexo: "Macho",
    porte: "Médio",
    cor: "Azul",
    imagem: "/branquinho.png",
    cuidados: ["Vacinado", "Castrado", "Vermifugado"],
    temperamento: ["Sociável", "Brincalhão", "Carente"],
    sociabilidade: [
      "Sociável com crianças",
      "Sociável com outros animais",
      "Sociável com todos os humanos"
    ],
    comentario:
      "Peguei ele ainda filhote e tive que ir tinha muitos animais, então doei ele. Mas com o tempo, ele apareceu na minha casa de novo, só que muito doente. Hoje ele está são, de rapio e protetio malhado."
  },
  zeus: {
    nome: "Zeus",
    especie: "Cachorro",
    raca: "Pitbull",
    idade: "Adulto",
    sexo: "Macho",
    porte: "Grande",
    cor: "Preto",
    imagem: "/zeus.png",
    cuidados: ["Vacinado", "Castrado"],
    temperamento: ["Protetor", "Leal"],
    sociabilidade: ["Com adultos"],
    comentario: "Zeus é um cão forte, mas muito carinhoso com quem conhece."
  }
};


export default function PerfilAnimal() {
  const { id } = useParams();
  const pet = pets[id ?? ""];

  if (!pet) {
    return (
      <>
        <Nav />
        <div className={styles.container}>
          <h1>Animal não encontrado</h1>
          <p>Verifique se o link está correto.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className={styles.container}>
        <h1 className={styles.nome}>{pet.nome}</h1>
        <p className={styles.status}>Para adoção</p>

        <div className={styles.imagem}>
          <img src={pet.imagem} alt={pet.nome} />
        </div>

        <section className={styles.dados}>
          <h2>Informações</h2>
          <ul>
            <li>Espécie: {pet.especie}</li>
            <li>Raça: {pet.raca}</li>
            <li>Idade: {pet.idade}</li>
            <li>Sexo: {pet.sexo}</li>
            <li>Porte: {pet.porte}</li>
            <li>Cor: {pet.cor}</li>
          </ul>
        </section>

        <section className={styles.dados}>
          <h2>Cuidados veterinários</h2>
          <ul>
            {pet.cuidados.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.dados}>
          <h2>Temperamento</h2>
          <ul>
            {pet.temperamento.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.dados}>
          <h2>Sociabilidade</h2>
          <ul>
            {pet.sociabilidade.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.comentario}>
          <h2>Comentário do anunciante</h2>
          <p>{pet.comentario}</p>
        </section>
      </main>
    </>
  );
}
