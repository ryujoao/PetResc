import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./institutos.module.css";

type Instituto = {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  logoUrl: string;
  valorArrecadado: number;
};

export default function Institutos() {
  const { id } = useParams();
  const [instituto, setInstituto] = useState<Instituto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstituto() {
      try {
        const response = await fetch(`https://api.petcontrol.com/institutos/${id}`);
        const data = await response.json();
        setInstituto(data);
      } catch (error) {
        console.error("Erro ao buscar instituto:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInstituto();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!instituto) return <p>Instituto não encontrado.</p>;

  return (
    <div className={styles.paginstitutos}>
      <div className={styles.apresentacao}>
        <img src={instituto.logoUrl} alt={`Logo de ${instituto.nome}`} className="logo" />
        <h1 className={styles.nome}>{instituto.nome}</h1>
        <p className={styles.endereco}>{instituto.endereco}</p>
        <p className={styles.descricao}>{instituto.descricao}</p>
      </div>

      <div className={styles.doacao}>
        <h2>Escolha sua doação</h2>

        <div className={styles.valores}>
          <label><input type="radio" name="valor" value="10" /> R$ 10,00 – Alimentação</label>
          <label><input type="radio" name="valor" value="20" /> R$ 20,00 – Alimentação e emergências</label>
          <label><input type="radio" name="valor" value="50" /> R$ 50,00 – Alimentação + tratamento</label>
          <label className={styles.outroValor}>
            <input type="radio" name="valor" value="outro" /> Outro valor:
            <input type="number" placeholder="Digite o valor" />
          </label>
        </div>

        <div className={styles.frequencia}>
          <h3>Frequência</h3>
          <label><input type="radio" name="frequencia" value="unica" /> Única</label>
          <label><input type="radio" name="frequencia" value="semanal" /> Semanal</label>
          <label><input type="radio" name="frequencia" value="mensal" /> Mensal</label>
        </div>

        <button className={styles.finalizar}>Finalizar</button>
      </div>

      <div className={styles.arrecadado}>
        <p>Arrecadado: <strong>R$ {instituto.valorArrecadado.toLocaleString("pt-BR")}</strong></p>
      </div>
    </div>
  );
}
