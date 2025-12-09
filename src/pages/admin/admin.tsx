import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./admin.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";
import { FaPaw } from "react-icons/fa";
import { PiConfettiFill } from "react-icons/pi";

interface Activity {
  id: string;
  tipo: 'USUARIO' | 'ANIMAL' | 'ADOCAO';
  texto: string;
  data: string;
  link: string;
}

export default function AdminHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    usuarios: { total: 0 },
    animais: { total: 0, disponiveis: 0, adotados: 0, encontrados: 0 },
    pedidos: { pendentes: 0 },
    financeiro: { totalArrecadado: 0 }
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resStats, resActivity] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/activity')
        ]);

        if (resStats.data) setStats(resStats.data);
        if (resActivity.data) setActivities(resActivity.data);

      } catch (error) {
        console.error("Erro dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const disponiveis = Number(stats.animais?.disponiveis) || 0;
  const pendentes = Number(stats.pedidos?.pendentes) || 0;
  const encontrados = Number(stats.animais?.encontrados) || 0;
  const totalSoma = disponiveis + pendentes + encontrados;
  const divisorGrafico = totalSoma === 0 ? 1 : totalSoma;
  const calcPercent = (val: number) => Math.round((val / divisorGrafico) * 100);

  const petsData = [
    { label: `${calcPercent(disponiveis)}%`, val: calcPercent(disponiveis), color: "#2f80ed", name: "Disponíveis" },
    { label: `${calcPercent(pendentes)}%`, val: calcPercent(pendentes), color: "#6fcf97", name: "Aguardando Aprovação" },
    { label: `${calcPercent(encontrados)}%`, val: calcPercent(encontrados), color: "#bb6bd9", name: "Encontrados (Comunidade)" },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.linha}>

          <div className={styles.cartao}>
            <h2 className={styles.tituloCartao}>Status da plataforma</h2>
            <div className={styles.iconeCanto}><PiConfettiFill color="#db3b3b" /></div>
            <div className={styles.infoPlataforma}>
              {loading ? <p>Carregando...</p> : (
                <>
                  <p><strong>{stats.usuarios?.total || 0}</strong> Usuários Cadastrados</p>
                  <p><strong>{stats.animais?.total || 0}</strong> Animais na Plataforma</p>
                  <p className={styles.textoDestaque} style={{ marginTop: '15px' }}>
                    🎉 <strong>{stats.animais?.adotados || 0}</strong> Adoções Concluídas!
                  </p>
                </>
              )}
            </div>
          </div>

          {/* CARD 2: STATUS DOS PETS (GRÁFICO REAL) */}
          <div className={`${styles.cartao} ${styles.layoutCartaoPets}`}>
            <div className={styles.flexCrescer}>
              <h2 className={styles.tituloCartao}>
                Status Atual ({totalSoma})
              </h2>

              <div className={styles.legendaContainer}>
                <div className={styles.legendaItem}>
                  <div className={`${styles.ponto} ${styles.pontoAzul}`}></div>
                  Disponíveis para Adoção ({disponiveis})
                </div>
                <div className={styles.legendaItem}>
                  <div className={`${styles.ponto} ${styles.pontoVerde}`}></div>
                  Aguardando Aprovação ({pendentes})
                </div>
                <div className={styles.legendaItem}>
                  <div className={`${styles.ponto} ${styles.pontoRoxo}`}></div>
                  Encontrados ({encontrados})
                </div>
              </div>
            </div>

            <div className={styles.graficoContainer}>
              {totalSoma === 0 ? (
                <div style={{ width: '100%', textAlign: 'center', color: '#999', fontSize: '0.8rem', marginTop: '20px' }}>
                  Sem dados para gráfico
                </div>
              ) : (
                petsData.map((d, i) => (
                  <div key={i} className={styles.barraWrapper}>
                    <div
                      className={styles.barra}
                      style={{
                        height: `${d.val}%`,
                        backgroundColor: d.color,
                        minHeight: d.val > 0 ? '4px' : '0'
                      }}
                    />
                    <span className={styles.barraRotulo}>{d.val > 0 ? d.label : ''}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={styles.linha}>

          <div className={styles.cartao}>
            <h2 className={styles.tituloCartao}>Últimas atualizações</h2>

            <div className={styles.listaAcoes}>
              {loading ? (
                <p>Carregando atividades...</p>
              ) : activities.length === 0 ? (
                <p style={{ color: '#888', fontStyle: 'italic' }}>Nenhuma atividade recente.</p>
              ) : (
                activities.map((acao) => (
                  <div key={acao.id} className={styles.itemAcao}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className={styles.textoAcao} dangerouslySetInnerHTML={{
                        __html: acao.texto.replace(':', ': <strong>').replace('(', '</strong>(')
                      }} />
                      <span style={{ fontSize: '0.75rem', color: '#999' }}>
                        {new Date(acao.data).toLocaleString()}
                      </span>
                    </div>

                    <div className={styles.botoesAcao}>
                      <button
                        className={styles.btnAprovar}
                        style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                        onClick={() => navigate(acao.link)}
                      >
                        Ver
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={styles.colunaVertical}>
            <div className={styles.cartao}>
              <h2 className={styles.tituloCartao}>Distribuição de doações (Exemplo)</h2>
              <div className={styles.donutWrapper}>
                <div className={styles.donutLegenda}>
                  <div className={styles.legendaItem}>
                    <div className={`${styles.ponto} ${styles.pontoPix}`}></div>
                    PIX: 65%
                  </div>
                  <div className={styles.legendaItem}>
                    <div className={`${styles.ponto} ${styles.pontoCredito}`}></div>
                    Cartão: 25%
                  </div>
                </div>
                <div className={styles.graficoDonut}></div>
              </div>
            </div>

            <Link to="/admin/pets" className={styles.cartaoGerenciamento}>
              <div>
                <div className={styles.tituloGerenciar}>Gerenciamento de Pets</div>
                <div className={styles.linkTextoGerenciar}>&rarr; Ir para lista completa</div>
              </div>
              <FaPaw className={styles.iconePata} />
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  );
}
