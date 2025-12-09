import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminListas.module.css";
import api from "../../services/api";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface PetOng {
  id: number;
  nome: string;
  especie: string;
  status: string; // Status do banco
  statusReal: string; // Status calculado
  createdAt: string;
}

export default function AdminGerenciarPetsOng() {
  const { id } = useParams();
  const [pets, setPets] = useState<PetOng[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados visuais dos filtros
  const [statusOpen, setStatusOpen] = useState(true);
  const [especieOpen, setEspecieOpen] = useState(false);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await api.get(`/admin/ongs/${id}/pets`);
        setPets(response.data);
      } catch (error) {
        console.error("Erro ao carregar pets da ONG", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, [id]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>
              Pets da ONG (ID #{id})
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
            {loading ? <p>Carregando...</p> : pets.length === 0 ? (
                <p style={{padding: 20}}>Nenhum pet encontrado.</p>
            ) : (
                pets.map((pet) => {
                    // Adaptando visualmente os status do banco para o design
                    const statusText = pet.statusReal === 'AGUARDANDO' ? 'Pendente' : 
                                       pet.statusReal === 'DISPONIVEL' ? 'Disponível' : 
                                       pet.statusReal === 'ADOTADO' ? 'Adotado' : pet.statusReal;

                    return (
                      <div key={pet.id} className={styles.cartaoItemGestao}>
                        <div className={styles.linhaCabecalhoCartao}>
                          <span className={styles.nomeItem}>
                              {pet.nome} <span style={{fontSize:'0.8rem', fontWeight:'normal'}}>({pet.especie})</span>
                          </span>
                          <span className={styles.statusItem}>
                            Status: {statusText}
                          </span>
                        </div>

                        <div className={styles.donoPet}>
                          Responsável: <strong>ONG Parceira</strong>
                          <br />
                          <span className={styles.dataCadastro}>
                            Cadastrado em: {new Date(pet.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>

                        {/* MANTIDO O DESIGN DA BARRA DE PROGRESSO (Mesmo sem dado real) */}
                        <div className={styles.linhaProgresso}>
                          <span className={styles.rotuloProgresso}>Progresso:</span>
                          <div className={styles.fundoBarraProgresso}>
                            <div
                              className={styles.preenchimentoBarra}
                              style={{ width: `100%`, backgroundColor: statusText === 'Adotado' ? '#27ae60' : '#2f80ed' }}
                            ></div>
                          </div>
                          <span className={styles.valorProgresso}>
                            100%
                          </span>
                        </div>
                      </div>
                    );
                })
            )}
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

            {/* Outros (Mantidos para visual) */}
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