import Layout from "../../components/layout";
import styles from "./adminLogs.module.css";

// Interface para tipar o log
interface LogItem {
  id: number;
  data: string;
  hora: string;
  tipo: 'INFO' | 'ERRO' | 'SUCESSO';
  mensagem: string;
  detalhes?: string[]; 
}

// Dados Mockados (Baseados na imagem)
const logsData: LogItem[] = [
  {
    id: 1,
    data: "02/12/2025",
    hora: "14:30",
    tipo: "INFO",
    mensagem: "ADM visualizou a ONG SUIPA",
  },
  {
    id: 2,
    data: "13/11/2025",
    hora: "11:23",
    tipo: "ERRO",
    mensagem: "Falha na exclusão de ONG !",
    detalhes: [
      "Usuário: Gerente Maria",
      "ONG: Amor de Patinhas",
      "Pets ativos: 340"
    ]
  },
  {
    id: 3,
    data: "27/11/2025",
    hora: "17:00",
    tipo: "SUCESSO",
    mensagem: "Novo cadastro realizado: Marcelo Soares - Objetivo: Doador ativo",
  },
];

export default function AdminLogs() {
  
  // Função auxiliar para escolher a classe da barra
  const getClasseBarra = (tipo: string) => {
    switch (tipo) {
      case 'ERRO': return styles.tipoErro;
      case 'SUCESSO': return styles.tipoSucesso;
      default: return styles.tipoInfo;
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        
      
        <div className={styles.cabecalho}>
          <h1 className={styles.tituloPagina}>Logs do Sistema</h1>
          <h2 className={styles.subtituloPagina}>Histórico geral</h2>
        </div>

        {/* Lista */}
        <div className={styles.listaLogs}>
          {logsData.map((log) => (
            <div key={log.id} className={styles.itemLog}>
            
              <div className={`${styles.barraLateral} ${getClasseBarra(log.tipo)}`}></div>

              {/* Conteúdo */}
              <div className={styles.conteudoLog}>
                <div className={styles.linhaDataHora}>
                  <span>{log.data}</span>
                  <span>{log.hora}</span>
                </div>

                <div className={styles.textoPrincipal}>
                  {log.mensagem}
                </div>

                
                {log.detalhes && (
                  <div className={styles.detalhesLog}>
                    {log.detalhes.map((detalhe, index) => (
                      <span key={index} className={styles.textoDetalhe}>
                        {detalhe}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}