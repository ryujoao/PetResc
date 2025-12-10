import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";
import styles from "./campanhasAnteriores.module.css";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

type Campanha = {
  id: number;
  titulo: string;
  createdAt: string;
  dataLimite?: string;
  metaFinanceira?: string;
  valorArrecadado?: string;
  imagemUrl?: string;
};

export default function CampanhasAnteriores() {
  const { user, token } = useAuth();
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [loading, setLoading] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchMinhasCampanhas() {
      if (!user) {
        setCampanhas([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await api.get("/campanha/minhas");
        setCampanhas(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMinhasCampanhas();
  }, [user]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente excluir esta campanha?")) return;
    try {
      if (!token) {
        alert("Sessão inválida. Faça login novamente.");
        return;
      }
      await api.delete(`/campanha/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCampanhas(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Erro ao excluir campanha:", error);
      alert("Não foi possível excluir a campanha. Veja o console para mais detalhes.");
    }
  };

  const listaFiltrada = campanhas.filter((c) =>
    c.titulo.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const formatMoney = (val?: string | number) => {
    const num = Number(val || 0);
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Minhas Campanhas</h1>
          <div className={styles.headerActions}>
            <Link to="/nova-campanha" className={styles.btnNova}>
              <FaPlus /> Nova campanha
            </Link>
          </div>
        </div>

        <div className={styles.searchRow}>
          <input
            type="text"
            placeholder="Buscar por título..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {loading ? (
          <div className={styles.loading}>Carregando campanhas...</div>
        ) : (
          <div className={styles.list}>
            {listaFiltrada.length === 0 ? (
              <div className={styles.empty}>Nenhuma campanha encontrada.</div>
            ) : (
              listaFiltrada.map((campanha) => (
                <div key={campanha.id} className={styles.card}>
                  <div className={styles.cardLeft}>
                    <img
                      src={campanha.imagemUrl || "/placeholder_campanha.png"}
                      alt={campanha.titulo}
                      className={styles.thumb}
                      onError={(e) => (e.currentTarget.src = "/placeholder_campanha.png")}
                    />
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.tituloCard}>{campanha.titulo}</h3>
                    <div className={styles.meta}>
                      <span>Criação: {new Date(campanha.createdAt).toLocaleDateString()}</span>
                      {campanha.dataLimite && <span> • Limite: {new Date(campanha.dataLimite).toLocaleDateString()}</span>}
                    </div>
                    <div className={styles.financas}>
                      <span>Meta: {formatMoney(campanha.metaFinanceira)}</span>
                      <span> • Arrecadado: {formatMoney(campanha.valorArrecadado)}</span>
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <Link to={`/campanhas/editar/${campanha.id}`} className={styles.editLink}>
                      <button className={styles.btnEdit} title="Editar">
                        <FaEdit /> Editar
                      </button>
                    </Link>

                    <button className={styles.btnDelete} onClick={() => handleDelete(campanha.id)} title="Excluir">
                      <FaTrash /> Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}