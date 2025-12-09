import { useState, useEffect } from "react";
import styles from "../config.module.css";
import api from "../../../services/api"; // Ajuste o caminho conforme sua estrutura

// Interface adaptada para os dados que vêm do banco + campos visuais
interface Animal {
  id: number;
  nome: string;
  status: string; // Vem do banco: 'ADOTADO', 'DISPONIVEL', etc.
  detalhes: string[]; // Array de strings para as linhas de detalhe
  estagioTitulo: string;
  estagioDesc: string;
  img: string;
  categoria: "adotados" | "registrados" | "lar" | "vistos";
}

export default function HistoricoAnimais() {
  const [activeTab, setActiveTab] = useState<string>("adotados");
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistorico() {
      try {
        // Busca todos os animais que este usuário cadastrou
        const response = await api.get("/animais/gerenciar/lista");
        
        // Mapeia os dados do Backend para o formato visual do Card
        const dadosFormatados = response.data.map((p: any) => {
            
            // 1. Define a Categoria da Aba
            let cat: "adotados" | "registrados" | "lar" | "vistos" = "registrados";
            
            if (p.status === 'ADOTADO') cat = "adotados";
            else if (p.status === 'LAR_TEMPORARIO' || p.status === 'EM_LAR_TEMPORARIO') cat = "lar";
            else if (p.status === 'DISPONIVEL' || p.status === 'ENCONTRADO') cat = "registrados";
            
            // 2. Define Textos de Estágio (Lógica visual)
            let tituloEstagio = "Processo em Aberto";
            let descEstagio = "Este animal está disponível para adoção. Aguardando candidatos.";

            if (p.status === 'ADOTADO') {
                tituloEstagio = "Adoção Concluída";
                descEstagio = "O animal já está com sua nova família. Histórico arquivado com sucesso.";
            } else if (p.status === 'LAR_TEMPORARIO') {
                tituloEstagio = "Lar Temporário";
                descEstagio = "O animal está sob cuidados temporários aguardando adoção definitiva.";
            }

            // 3. Monta o Objeto Final
            return {
                id: p.id,
                nome: p.nome,
                status: p.status === 'DISPONIVEL' ? 'Disponível' : (p.status === 'ADOTADO' ? 'Adotado' : p.status),
                img: p.photoURL || "https://placehold.co/400x400/f8f8f8/ccc?text=Sem+Foto",
                
                // Formata as linhas de detalhes igual ao seu mock
                detalhes: [
                    `${p.sexo || '?'} • ${p.idade || '?'} • ${p.raca || 'SRD'}`,
                    `• Atualizado em: ${new Date(p.updatedAt).toLocaleDateString()}`
                ],
                
                estagioTitulo: tituloEstagio,
                estagioDesc: p.descricao || descEstagio, // Usa a descrição do animal ou o texto padrão
                categoria: cat
            };
        });

        setAnimais(dadosFormatados);

      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistorico();
  }, []);

  // Filtra com base na aba clicada
  const filteredAnimals = animais.filter(a => a.categoria === activeTab);

  if (loading) {
      return (
        <div className={styles.configContainer}>
            <h1 className={styles.titulo}>Segurança</h1>
            <div className={styles.wideSection} style={{textAlign:'center', padding:'4rem'}}>
                <p>Carregando histórico...</p>
            </div>
        </div>
      );
  }

  return (
    <div className={styles.configContainer}>
      
      <h1 className={styles.titulo}>Segurança</h1>

      <div className={styles.wideSection}>
        
        <h2 className={styles.subtitulo}>Histórico</h2>

        {/* ABAS */}
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

        {/* LISTA DE CARDS */}
        <div className={styles.cardsList}>
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal) => (
              <div key={animal.id} className={styles.card}>
                
                <div className={styles.cardImagem}>
                  <img 
                    src={animal.img} 
                    alt={animal.nome} 
                    className={styles.petImagem} 
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/400x400?text=Pet")}
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