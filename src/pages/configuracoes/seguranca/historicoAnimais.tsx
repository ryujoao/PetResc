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

// Dados mockados para exibição mínima nas abas
const MOCK_ANIMAIS: Animal[] = [
  {
    id: 9001,
    nome: "Luna",
    status: "Adotado",
    detalhes: ["F • 3 anos • SRD", `• Atualizado em: ${new Date().toLocaleDateString()}`],
    estagioTitulo: "Adoção Concluída",
    estagioDesc: "Luna encontrou um novo lar recentemente.",
    img: "https://placehold.co/400x400?text=Luna",
    categoria: "adotados"
  },
  {
    id: 9002,
    nome: "Thor",
    status: "Em Lar Temporário",
    detalhes: ["M • 1 ano • Vira-lata", `• Atualizado em: ${new Date().toLocaleDateString()}`],
    estagioTitulo: "Lar Temporário",
    estagioDesc: "Thor está em um lar temporário.",
    img: "https://placehold.co/400x400?text=Thor",
    categoria: "lar"
  },
  {
    id: 9003,
    nome: "Mimi",
    status: "Para Adoção",
    detalhes: ["F • 6 meses • SRD", `• Visto em: ${new Date().toLocaleDateString()}`],
    estagioTitulo: "Visto Recentemente",
    estagioDesc: "Perfil visualizado recentemente.",
    img: "https://placehold.co/400x400?text=Mimi",
    categoria: "vistos"
  }
];

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
        const dadosFormatados: Animal[] = response.data.map((p: any) => {

          // 1. Define a Categoria da Aba
          let cat: "adotados" | "registrados" | "lar" | "vistos" = "registrados";

          // Prioriza flags/infos de "visto recentemente" se existirem no payload do backend
          if (p.viewedAt || p.visto === true || p.lastViewed || p.lastSeenAt) {
            cat = "vistos";
          } else if (p.status === 'ADOTADO') {
            cat = "adotados";
          } else if (p.status === 'LAR_TEMPORARIO' || p.status === 'EM_LAR_TEMPORARIO') {
            cat = "lar";
          } else if (p.status === 'DISPONIVEL' || p.status === 'ENCONTRADO') {
            cat = "registrados";
          }

          // 2. Define Textos de Estágio (Lógica visual)
          let tituloEstagio = "Processo em Aberto";
          let descEstagio = "Este animal está disponível para adoção. Aguardando candidatos.";

          if (p.status === 'ADOTADO') {
            tituloEstagio = "Adoção Concluída";
            descEstagio = "O animal já está com sua nova família. Histórico arquivado com sucesso.";
          } else if (p.status === 'LAR_TEMPORARIO' || p.status === 'EM_LAR_TEMPORARIO') {
            tituloEstagio = "Lar Temporário";
            descEstagio = "O animal está sob cuidados temporários aguardando adoção definitiva.";
          } else if (cat === "vistos") {
            tituloEstagio = "Visto Recentemente";
            descEstagio = p.descricao || "Este perfil foi visualizado recentemente.";
          }

          // Define data a ser mostrada (prioriza viewedAt quando disponível)
          const dataObservacao = p.viewedAt || p.lastViewed || p.lastSeenAt || p.updatedAt || new Date().toISOString();
          const dataFormatada = (() => {
            try {
              return new Date(dataObservacao).toLocaleDateString();
            } catch {
              return new Date().toLocaleDateString();
            }
          })();

          // 3. Monta o Objeto Final
          return {
            id: p.id,
            nome: p.nome || "Sem nome",
            status:
              cat === "vistos"
                ? "Visto recentemente"
                : (p.status === 'DISPONIVEL' ? 'Disponível' : (p.status === 'ADOTADO' ? 'Adotado' : (p.status || '—'))),
            img: p.photoURL || "https://placehold.co/400x400/f8f8f8/ccc?text=Sem+Foto",

            // Formata as linhas de detalhes igual ao seu mock
            detalhes: [
              `${p.sexo || '?'} • ${p.idade || '?'} • ${p.raca || 'SRD'}`,
              cat === "vistos" ? `• Visto em: ${dataFormatada}` : `• Atualizado em: ${dataFormatada}`
            ],

            estagioTitulo: tituloEstagio,
            estagioDesc: p.descricao || descEstagio, // Usa a descrição do animal ou o texto padrão
            categoria: cat
          };
        });

        // Se alguma categoria estiver vazia, adiciona mocks mínimos para visual
        let finalList = dadosFormatados.slice();
        const needCats: Array<Animal["categoria"]> = ["adotados", "lar", "vistos"];
        needCats.forEach(cat => {
          const has = finalList.some(a => a.categoria === cat);
          if (!has) {
            finalList = finalList.concat(MOCK_ANIMAIS.filter(m => m.categoria === cat));
          }
        });

        setAnimais(finalList);

      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        // Em caso de erro de rede, exibe mocks para as abas visuais
        setAnimais(MOCK_ANIMAIS);
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
        <div className={styles.wideSection} style={{ textAlign: 'center', padding: '4rem' }}>
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