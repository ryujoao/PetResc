import { Link } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./adminLogs.module.css";

interface SensorData {
  id: number;
  local: string;
  tipoSensor: string;
  valor: string;
  status: "NORMAL" | "ALERTA" | "CRITICO";
  ultimaLeitura: string;
  mensagem: string;
}

// Dados Mockados (Simulando leitura do Arduino)
const arduinoData: SensorData[] = [
  {
    id: 1,
    local: "Canil - Bloco A",
    tipoSensor: "Nível de Temperatura",
    valor: "22°C",
    status: "NORMAL",
    ultimaLeitura: "Há 2 min",
    mensagem: "Temperatura ideal para os animais.",
  },
  {
    id: 2,
    local: "Gatil - Berçário",
    tipoSensor: "Umidade do Ar",
    valor: "88%",
    status: "CRITICO",
    ultimaLeitura: "Agora",
    mensagem: "Umidade muito alta! Risco de proliferação de fungos.",
  },
  {
    id: 3,
    local: "ONG Patinhas Unidas",
    tipoSensor: "Nível de Temperatura",
    valor: "Muito Abaixo",
    status: "ALERTA",
    ultimaLeitura: "13:46",
    mensagem: "Nível de temperatura muito abaixo! Verificar.",
  },
];

export default function AdminMonitoramento() {
  const getClasseStatus = (status: string) => {
    switch (status) {
      case "CRITICO":
        return styles.tipoErro;
      case "NORMAL":
        return styles.tipoSucesso;
      case "ALERTA":
        return styles.tipoInfo;
      default:
        return styles.tipoInfo;
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.cabecalho}>
          <h1 className={styles.tituloPagina}>
            Monitoramento de Temperatura - IoT
          </h1>
          <h2 className={styles.subtituloPagina}>
            Leituras dos sensores Arduino em tempo real
          </h2>
        </div>

        {/* Lista de Sensores (Usando a estrutura visual de Logs) */}
        <div className={styles.listaLogs}>
          {arduinoData.map((sensor) => (
            
            
            <div key={sensor.id} className={styles.itemLog}>
              <div
                className={`${styles.barraLateral} ${getClasseStatus(
                  sensor.status
                )}`}
              ></div>
              

              {/* Conteúdo */}
              <div className={styles.conteudoLog}>
                
                  {/* Linha superior: Local e Hora */}
                  <div className={styles.linhaDataHora}>
                    <span style={{ fontWeight: "bold", color: "#555" }}>
                      {sensor.local}
                    </span>
                    <span> {sensor.ultimaLeitura}</span>
                  </div>
              
                {/* Linha Principal: Tipo de Sensor e Valor */}
                <Link to="/admin/monitoramento/ong">
                <div className={styles.textoPrincipal}>
                  {sensor.tipoSensor}:{" "}
                  <span style={{ fontSize: "1.4rem" }}>{sensor.valor}</span>
                </div>
                </Link>

                {/* Detalhes / Mensagem de Status */}
                <div className={styles.detalhesLog}>
                  <span className={styles.textoDetalhe}>
                    Status: <strong>{sensor.status}</strong> — {sensor.mensagem}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
