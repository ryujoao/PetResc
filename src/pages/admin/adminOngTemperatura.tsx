import styles from "./adminOngTemperatura.module.css";
import Layout from "../../components/layout"; // Ajuste o caminho se necessário
import { FaThermometerHalf } from "react-icons/fa"; // Certifique-se de ter react-icons instalado

export default function AdminOngTemperatura() {
  return (
    <Layout>
      <div className={styles.container}>
        
        {/* --- CABEÇALHO --- */}
        <div className={styles.cabecalho}>
          <h1 className={styles.titulo}>Monitoramento</h1>
          <h2 className={styles.subtitulo}>ONG: Patinhas Unidas</h2>
        </div>

        {/* --- ALERTA CENTRAL --- */}
        <div className={styles.areaAlerta}>
          <span className={styles.textoAlerta}>Nível de temperatura abaixando!</span>
        </div>

        {/* --- CONTEÚDO PRINCIPAL (CARD TEMPERATURA + GRÁFICO) --- */}
        <div className={styles.painelPrincipal}>
          
          {/* LADO ESQUERDO: CARD DA TEMPERATURA ATUAL */}
          <div className={styles.cartaoTemperatura}>
            <div className={styles.iconeTermometroWrapper}>
              {/* Ícone estilizado ou SVG */}
              <FaThermometerHalf className={styles.iconeTermometro} />
            </div>
            <div className={styles.valorTemperatura}>12.4°C</div>
          </div>

          {/* LADO DIREITO: GRÁFICO DE LINHA (SVG PURO) */}
          <div className={styles.cartaoGrafico}>
            <div className={styles.areaGrafico}>
              {/* SVG desenhando a linha caindo conforme a imagem */}
              <svg viewBox="0 0 300 150" className={styles.svgGrafico}>
                {/* Eixos */}
                <line x1="10" y1="10" x2="10" y2="140" stroke="#2b6b99" strokeWidth="2" />
                <line x1="10" y1="140" x2="290" y2="140" stroke="#2b6b99" strokeWidth="2" />
                
                {/* Linha do gráfico (zigue-zague descendo) */}
                <polyline 
                  points="20,20 40,50 60,40 80,70 100,50 120,90 140,80 160,110 180,90 200,120 220,100 240,130" 
                  fill="none" 
                  stroke="#2b6b99" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                
                {/* Seta na ponta da linha (opcional) */}
                <path d="M235,125 L240,130 L235,135" fill="none" stroke="#2b6b99" strokeWidth="2" />
              </svg>
            </div>
            
            <div className={styles.legendaGrafico}>
              <span>Mín. 8.2°C</span>
              <span>Máx. 27.8°C</span>
            </div>
          </div>

        </div>

        {/* --- RODAPÉ --- */}
        <div className={styles.rodapeLeitura}>
          Última leitura: 13:46:20
        </div>

      </div>
    </Layout>
  );
}