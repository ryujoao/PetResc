import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./animaisCadastrados.module.css";

interface Animal {
  id: number;
  nome?: string;
  raca?: string;
  idade?: number;
  status: string;
  photoURL?: string;
}

export default function AnimaisCadastrados() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/animais/gerenciar/lista", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => setAnimais(res.data))
      .catch(err => console.error("Erro ao buscar animais:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando animais...</p>;
  if (animais.length === 0) return <p>Você ainda não cadastrou nenhum animal.</p>;

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerMeusAnimais}>
        <h2 className={styles.titulo}>Animais Cadastrados</h2>
        <h2 className={styles.titulo}>Total de animais: {animais.length}</h2>

        {animais.map(animal => (
          <div key={animal.id} className={styles.card}>
            <div className={styles.imgCard}>
              <img
                src={animal.photoURL || "/animais/animalSemNome.png"}
                alt={animal.nome || "Animal Sem Nome"}
              />
            </div>

            <div className={styles.infoCard}>
              <div className={styles.cardNome}>
                <h1>{animal.nome || "Não possui nome"}</h1>
                <p className={styles.descricaoCard}>
                  {animal.raca || "Sem raça definida"}
                </p>
                <p className={styles.descricaoCard}>
                  {animal.idade !== undefined ? `${animal.idade} anos` : "(SRD)"}
                </p>
              </div>
            </div>

            <div className={styles.statusSuperior}>Animal cadastrado</div>
            <div className={styles.statusInferior}>Status: {animal.status}</div>
          </div>
        ))}

        <button className={styles.verMais}>
          <a href="/perfilOng">Ver Mais</a>
        </button>
      </div>
    </div>
  );
}
