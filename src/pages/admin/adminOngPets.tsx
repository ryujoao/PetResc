import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminListas.module.css";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

// Dados Mockados
const petsOngData = [
  {
    id: 101,
    nome: "Bob (Cachorro)",
    status: "Disponível",
    progresso: 100,
    dataCadastro: "10/10/2025",
  },
  {
    id: 102,
    nome: "Mel (Gato)",
    status: "Em tratamento",
    progresso: 40,
    dataCadastro: "15/10/2025",
  },
  {
    id: 103,
    nome: "Thor (Cachorro)",
    status: "Pendente",
    progresso: 10,
    dataCadastro: "20/10/2025",
  },
  {
    id: 104,
    nome: "Lola (Gato)",
    status: "Adotado",
    progresso: 100,
    dataCadastro: "05/09/2025",
  },
];

export default function AdminGerenciarPetsOng() {
  const { id } = useParams();
  const [statusOpen, setStatusOpen] = useState(true);
  const [especieOpen, setEspecieOpen] = useState(false);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>
              Pets da ONG: Vira Lata é Dez
            </h1>
            <h2 className={styles.subtituloPagina}>
              Gerenciamento exclusivo desta instituição
            </h2>
          </div>
          <Link to={`/admin/ongs/${id}`} className={styles.linkVoltar}>
            <FaArrowLeft /> 
          </Link>
        </div>

        <div className={styles.conteudoGestao}>
          <div className={styles.listaCartoes}>
            {petsOngData.map((pet) => (
              <div key={pet.id} className={styles.cartaoItemGestao}>
                <div className={styles.linhaCabecalhoCartao}>
                  <span className={styles.nomeItem}>{pet.nome}</span>
                  <span className={styles.statusItem}>
                    Status: {pet.status}
                  </span>
                </div>

                <div className={styles.donoPet}>
                  Responsável: <strong>ONG Vira Lata é Dez</strong>
                  <br />
                  <span className={styles.dataCadastro}>
                    Cadastrado em: {pet.dataCadastro}
                  </span>
                </div>

                <div className={styles.linhaProgresso}>
                  <span className={styles.rotuloProgresso}>Progresso:</span>
                  <div className={styles.fundoBarraProgresso}>
                    <div
                      className={styles.preenchimentoBarra}
                      style={{ width: `${pet.progresso}%` }}
                    ></div>
                  </div>
                  <span className={styles.valorProgresso}>
                    {pet.progresso}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.barraLateralFiltros}>
            <h3 className={styles.tituloFiltro}>Filtros</h3>

            {/* Status */}
            <div className={styles.grupoFiltro}>
              <div
                className={styles.rotuloFiltro}
                onClick={() => setStatusOpen(!statusOpen)}
              >
                Status
                {statusOpen ? (
                  <FaChevronUp size={12} />
                ) : (
                  <FaChevronDown size={12} />
                )}
              </div>
              {statusOpen && (
                <ul className={styles.listaSubItens}>
                  <li className={styles.subItem}>Pendente</li>
                  <li className={styles.subItem}>Em tratamento</li>
                  <li className={styles.subItem}>Disponível</li>
                  <li className={styles.subItem}>Adotado</li>
                </ul>
              )}
            </div>

            {/* Espécie */}
            <div className={styles.grupoFiltro}>
              <div
                className={styles.rotuloFiltro}
                onClick={() => setEspecieOpen(!especieOpen)}
              >
                Espécie
                {especieOpen ? (
                  <FaChevronUp size={12} />
                ) : (
                  <FaChevronDown size={12} />
                )}
              </div>
              {especieOpen && (
                <ul className={styles.listaSubItens}>
                  <li className={styles.subItem}>Cachorro</li>
                  <li className={styles.subItem}>Gato</li>
                </ul>
              )}
            </div>

            {/* Outros */}
            {["Porte", "Idade", "Periodo de cadastro"].map((f) => (
              <div key={f} className={styles.grupoFiltro}>
                <div className={styles.rotuloFiltro}>
                  {f} <FaChevronDown size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
