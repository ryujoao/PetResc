import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminListas.module.css";
import { FaArrowLeft, FaMapMarkerAlt, FaPaw, FaEdit, FaBan, FaEye, FaCheck } from "react-icons/fa";

// Mock de Dados das ONGs
const ongsData = [
  {
    id: 1,
    nome: "ONG Vira Lata é Dez",
    status: "Ativa",
    animaisAtivos: 45,
    localizacao: "São Paulo, SP",
    cnpj: "00.000.000/0001-99",
    email: "ongviralataedez@gmail.com"
  },
  {
    id: 2,
    nome: "Instituto Patas Unidas",
    status: "Pendente",
    animaisAtivos: 12,
    localizacao: "Rio de Janeiro, RJ",
    cnpj: "11.111.111/0001-88",
    email: "patasunidas@gmail.com"
  },
  {
    id: 3,
    nome: "Abrigo São Francisco",
    status: "Bloqueada",
    animaisAtivos: 0,
    localizacao: "Curitiba, PR",
    cnpj: "22.222.222/0001-77",
    email: "abrigosf@gmail.com"
  },
];

export default function AdminOngs() {
  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.cabecalhoGestao}>
          <div>
            <h1 className={styles.tituloPagina}>Gerenciar ONGs</h1>
            <h2 className={styles.subtituloPagina}>Listagem e controle de instituições</h2>
          </div>
          <Link to="/admin/gerenciamento" className={styles.linkVoltar}>
            <FaArrowLeft />
          </Link>
        </div>

        {/* Lista */}
        <div className={styles.listaCartoes}>
          {ongsData.map((ong) => (
            // USANDO O MESMO ESTILO DOS PETS (cartaoItemGestao = AZUL)
            <div key={ong.id} className={styles.cartaoItemGestao}>
              
              <div className={styles.linhaCabecalhoCartao}>
                <span className={styles.nomeItem}>
                    {ong.nome}
                </span>
                <span 
                    className={styles.statusItem}
                    style={{
                        color: ong.status === 'Ativa' ? '#219653' : 
                               ong.status === 'Pendente' ? '#d97706' : '#db3b3b',
                    }}
                >
                    {ong.status}
                </span>
              </div>

              <div className={styles.detalhesOng}>
                <span>
                    <FaMapMarkerAlt className={styles.iconeDetalhe} size={12}/> 
                    {ong.localizacao}
                </span>
                <span>
                    <FaPaw className={styles.iconeDetalhe} size={12}/> 
                    {ong.animaisAtivos} pets ativos
                </span>
                <span>CNPJ: {ong.cnpj}</span>
                <span>{ong.email}</span>
              </div>

              <div className={styles.rodapeAcoesCartao}>
                <Link to={`/admin/ongs/${ong.id}`} className={styles.btnAcaoPequeno}>
                    <FaEye /> Ver Detalhes
                </Link>
                
                <button className={styles.btnAcaoPequeno}>
                    <FaEdit /> Editar
                </button>

                {ong.status !== 'Bloqueada' ? (
                    <button className={`${styles.btnAcaoPequeno} ${styles.btnPerigo}`}>
                        <FaBan /> Bloquear
                    </button>
                ) : (
                    <button className={styles.btnAcaoPequeno} style={{color: '#219653', borderColor: '#219653'}}>
                        <FaCheck size={10}/> Ativar
                    </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}