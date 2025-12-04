import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./admin.module.css";
import { useAuth } from "../../auth/AuthContext";
import { FaPaw } from "react-icons/fa";
import { PiConfettiFill } from "react-icons/pi";

export default function AdminHome() {
  const { user } = useAuth();

  // Dados Mockados
  const petsData = [
    { label: "65%", val: 65, color: "#2f80ed", name: "Disponíveis" }, // Azul
    { label: "20%", val: 20, color: "#6fcf97", name: "Aguardando" }, // Verde
    { label: "15%", val: 15, color: "#bb6bd9", name: "Em tratamento" }, // Roxo
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.linha}>
          {/* status plataforma */}
          <div className={styles.cartao}>
            <h2 className={styles.tituloCartao}>Status da plataforma (hoje)</h2>
            <div className={styles.iconeCanto}>
              <PiConfettiFill color="#db3b3b" />
            </div>
            <div className={styles.infoPlataforma}>
              <p>
                <strong>12</strong> novas solicitações pendentes
              </p>
              <p>
                <strong>R$ 4.580</strong> arrecadados no mês
              </p>
              <p className={styles.textoDestaque}>
                “Amor de Pet” mandou solicitação de adoção
              </p>
            </div>
          </div>

          {/* Status dos pets */}
          <div className={`${styles.cartao} ${styles.layoutCartaoPets}`}>
            <div className={styles.flexCrescer}>
              <h2 className={styles.tituloCartao}>Status dos Pets (450)</h2>
              <div className={styles.legendaContainer}>
                <div className={styles.legendaItem}>
                  <div className={`${styles.ponto} ${styles.pontoAzul}`}></div>
                  Disponíveis para Adoção
                </div>
                <div className={styles.legendaItem}>
                  <div className={`${styles.ponto} ${styles.pontoVerde}`}></div>
                  Aguardando visita/aprovação
                </div>
                <div className={styles.legendaItem}>
                  <div className={`${styles.ponto} ${styles.pontoRoxo}`}></div>
                  Em tratamento médico
                </div>
              </div>
            </div>

            {/* Gráfico de Barras */}
            <div className={styles.graficoContainer}>
              {petsData.map((d, i) => (
                <div key={i} className={styles.barraWrapper}>
                  <div
                    className={styles.barra}
                    style={{
                      height: `${d.val}%`,
                      backgroundColor: d.color,
                    }}
                  />
                  <span className={styles.barraRotulo}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

       
        <div className={styles.linha}>
          {/* últimas ações */}
          <div className={styles.cartao}>
            <h2 className={styles.tituloCartao}>Últimas ações/doações</h2>
            <div className={styles.listaAcoes}>
              <div className={styles.itemAcao}>
                <span className={styles.textoAcao}>
                  Nova ONG cadastrada: <strong>Cão Feliz</strong>
                </span>
                <div className={styles.botoesAcao}>
                  <button className={styles.btnAprovar}>Aprovar</button>
                  <button className={styles.btnRejeitar}>Rejeitar</button>
                </div>
              </div>

              <div className={styles.itemAcao}>
                <span className={styles.textoAcao}>
                  Doação de R$ 500,00 - Método PIX
                </span>
                <span className={styles.linkDetalhes}>Ver detalhes</span>
              </div>

              <div className={styles.itemAcao}>
                <span className={styles.textoAcao}>
                  Nova solicit. Adoção: <strong>Pet Max</strong>
                </span>
                <span className={styles.linkDetalhes}>Analisar</span>
              </div>

              <div className={styles.itemAcao}>
                <span className={styles.textoAcao}>
                  Doação de R$ 1.500,00 - Método Crédito
                </span>
                <span className={styles.linkDetalhes}>Ver detalhes</span>
              </div>
            </div>
          </div>

          {/* Coluna direita */}
          <div className={styles.colunaVertical}>
            {/* distribuição doações */}
            <div className={styles.cartao}>
              <h2 className={styles.tituloCartao}>
                Distribuição de doações (Últimos 30 dias)
              </h2>
              <div className={styles.donutWrapper}>
                <div className={styles.donutLegenda}>
                  <div className={styles.legendaItem}>
                    <div className={`${styles.ponto} ${styles.pontoPix}`}></div>
                    PIX: 65%
                  </div>
                  <div className={styles.legendaItem}>
                    <div className={`${styles.ponto} ${styles.pontoCredito}`}></div>
                    Cartão de Crédito: 25%
                  </div>
                  <div className={styles.legendaItem}>
                    <div className={`${styles.ponto} ${styles.pontoBoleto}`}></div>
                    Boleto/Outros: 10%
                  </div>
                </div>

                <div className={styles.graficoDonut}></div>
              </div>
            </div>

            {/* link gerenciamento */}
            <Link to="/admin/pets" className={styles.cartaoGerenciamento}>
              <div>
                <div className={styles.tituloGerenciar}>Gerenciamento de Pets</div>
                <div className={styles.linkTextoGerenciar}>
                  &rarr; Ir para lista completa
                </div>
              </div>
              <FaPaw className={styles.iconePata} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}