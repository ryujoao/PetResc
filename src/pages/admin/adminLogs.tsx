import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import styles from "./adminLogs.module.css";
import api from "../../services/api";

// Interface compatível com o backend
interface LogItem {
  id: string;
  dataISO: string; // Vem do backend ex: 2025-10-25T14:30...
  tipo: 'INFO' | 'ERRO' | 'SUCESSO';
  mensagem: string;
  detalhes?: string[];
}

export default function AdminLogs() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await api.get("/admin/logs");
        setLogs(response.data);
      } catch (error) {
        console.error("Erro ao buscar logs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);
  
  // Função auxiliar para escolher a classe da barra (Visual)
  const getClasseBarra = (tipo: string) => {
    switch (tipo) {
      case 'ERRO': return styles.tipoErro;     // Vermelho/Laranja (Ex: Recusado)
      case 'SUCESSO': return styles.tipoSucesso; // Verde (Ex: Aprovado, Novo User)
      default: return styles.tipoInfo;         // Azul (Ex: Novo Pet)
    }
  };

  // Helper para formatar data e hora
  const formatarDataHora = (iso: string) => {
      if(!iso) return { data: '--/--', hora: '--:--' };
      const d = new Date(iso);
      return {
          data: d.toLocaleDateString('pt-BR'),
          hora: d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
  };

  return (
    <Layout>
      <div className={styles.container}>
        
        <div className={styles.cabecalho}>
          <h1 className={styles.tituloPagina}>Logs do Sistema</h1>
          <h2 className={styles.subtituloPagina}>Histórico geral de atividades da plataforma</h2>
        </div>

        {/* Lista */}
        <div className={styles.listaLogs}>
          {loading ? (
              <p style={{padding: 20, textAlign: 'center'}}>Carregando registros...</p>
          ) : logs.length === 0 ? (
              <p style={{padding: 20, textAlign: 'center'}}>Nenhuma atividade registrada.</p>
          ) : (
              logs.map((log) => {
                const { data, hora } = formatarDataHora(log.dataISO);

                return (
                    <div key={log.id} className={styles.itemLog}>
                    
                    <div className={`${styles.barraLateral} ${getClasseBarra(log.tipo)}`}></div>

                    {/* Conteúdo */}
                    <div className={styles.conteudoLog}>
                        <div className={styles.linhaDataHora}>
                        <span style={{fontWeight:'bold'}}>{data}</span>
                        <span style={{color: '#666'}}>{hora}</span>
                        </div>

                        <div className={styles.textoPrincipal}>
                        {log.mensagem}
                        </div>

                        {log.detalhes && log.detalhes.length > 0 && (
                        <div className={styles.detalhesLog}>
                            {log.detalhes.map((detalhe, index) => (
                            <span key={index} className={styles.textoDetalhe}>
                                • {detalhe}
                            </span>
                            ))}
                        </div>
                        )}
                    </div>

                    </div>
                );
              })
          )}
        </div>

      </div>
    </Layout>
  );
}