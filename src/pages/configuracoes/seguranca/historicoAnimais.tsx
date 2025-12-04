import { useState } from "react";
import styles from "../config.module.css";


interface Animal {
  id: number;
  nome: string;
  status: string;
  detalhes: string[];
  estagioTitulo: string;
  estagioDesc: string;
  img: string;
  categoria: "adotados" | "registrados" | "lar" | "vistos";
}

export default function HistoricoAnimais() {
  
  const [activeTab, setActiveTab] = useState<string>("adotados");

 
  const animais: Animal[] = [
    {
      id: 1,
      nome: "Neguinho",
      status: "Adotado",
      
      detalhes: [
        "Macho • Filhote • SRD", 
        "• Acompanhamento Inicial"
      ],
      estagioTitulo: "Estágios de adoção: 4",
      estagioDesc: "Após a chegada do animal ao novo lar, a ONG entra em contato para acompanhar a adaptação, pedindo notícias e garantindo que o processo está ocorrendo de forma positiva.",
      img: "/animais/neguinho.png",
      categoria: "adotados"
    },
  ];

  
  const filteredAnimals = animais.filter(a => a.categoria === activeTab);

  return (
    <div className={styles.configContainer}>
      
      
      <h1 className={styles.titulo}>Segurança</h1>

      <div className={styles.wideSection}>
        
        
        <h2 className={styles.subtitulo}>Histórico</h2>

        
        <div className={styles.tabContainer}>
          <button 
            className={activeTab === "adotados" ? styles.tabActive : styles.tabInactive}
            onClick={() => setActiveTab("adotados")}
          >
            Adotados
          </button>
          
          <button 
            className={activeTab === "registrados" ? styles.tabActive : styles.tabInactive}
            onClick={() => setActiveTab("registrados")}
          >
            Registrados
          </button>
          
          <button 
            className={activeTab === "lar" ? styles.tabActive : styles.tabInactive}
            onClick={() => setActiveTab("lar")}
          >
            Lar temporário
          </button>
          
          <button 
            className={activeTab === "vistos" ? styles.tabActive : styles.tabInactive}
            onClick={() => setActiveTab("vistos")}
          >
            Vistos recentemente
          </button>
        </div>

        
        <div className={styles.cardsList}>
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal) => (
              <div key={animal.id} className={styles.card}>
                
                
                <div className={styles.cardImagem}>
                  <img 
                    src={animal.img} 
                    alt={animal.nome} 
                    className={styles.petImagem} 
                  />
                </div>

                
                <div className={styles.cardInfo}>
                  <h3 className={styles.petNome}>{animal.nome}</h3>
                  
                  
                  <div>
                    <span className={styles.petStatus}>{animal.status}</span>
                  </div>
                  
                 
                  <div className={styles.petDetalhes}>
                    {animal.detalhes.map((linha, index) => (
                      <div key={index}>{linha}</div>
                    ))}
                  </div>
                </div>

                
                <div className={styles.cardStatus}>
                  <span className={styles.statusTitulo}>{animal.estagioTitulo}</span>
                  <p className={styles.stageDesc}>{animal.estagioDesc}</p>
                </div>

              </div>
            ))
          ) : (
            
            <div className={styles.vazioStatus}>
              Nenhum registro encontrado nesta categoria.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}