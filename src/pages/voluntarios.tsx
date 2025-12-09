import React, { useState } from "react";
import styles from "../style/voluntarios.module.css";
import Layout from "../components/layout";
import { FaPaw } from "react-icons/fa"; // Para as patinhas de fundo (opcional)

// --- TIPAGEM ---
interface Voluntario {
  id: string;
  nome: string;
  tipoFormulario: string;
  data: string;
}

// --- DADOS MOCKADOS (Baseado na imagem) ---
const MOCK_VOLUNTARIOS: Voluntario[] = [
  { id: "00000", nome: "Adriano Cesar Pires Matrangolo", tipoFormulario: "Lar Temporário", data: "04/11/2025" },
  { id: "10000", nome: "Adriano Cesar Pires Matrangolo", tipoFormulario: "Lar Temporário", data: "04/11/2025" },
  { id: "20000", nome: "Adriano Cesar Pires Matrangolo", tipoFormulario: "Lar Temporário", data: "04/11/2025" },
  { id: "30000", nome: "Adriano Cesar Pires Matrangolo", tipoFormulario: "Lar Temporário", data: "04/11/2025" },
  { id: "40000", nome: "Adriano Cesar Pires Matrangolo", tipoFormulario: "Lar Temporário", data: "04/11/2025" },
  { id: "50000", nome: "Adriano Cesar Pires Matrangolo", tipoFormulario: "Lar Temporário", data: "04/11/2025" },
  { id: "60000", nome: "Adriano Cesar Pires Matrangolo", tipoFormulario: "Lar Temporário", data: "04/11/2025" },
  { id: "70000", nome: "Adriano Cesar Pires Matrangolo", tipoFormulario: "Lar Temporário", data: "04/11/2025" },
  { id: "80000", nome: "Adriano Cesar Pires Matrangolo", tipoFormulario: "Lar Temporário", data: "04/11/2025" },
];

export default function VoluntariosLar() {
  // Estado para controlar os checkboxes (quais IDs estão selecionados)
  const [selecionados, setSelecionados] = useState<string[]>([]);

  // Função para alternar seleção
  const toggleSelect = (id: string) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Função para selecionar todos (cabeçalho)
  const toggleSelectAll = () => {
    if (selecionados.length === MOCK_VOLUNTARIOS.length) {
      setSelecionados([]);
    } else {
      setSelecionados(MOCK_VOLUNTARIOS.map((v) => v.id));
    }
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        
        {/* ELEMENTOS DE FUNDO (Patinhas Decorativas) */}
        <div className={styles.bgDecorations}>
          <FaPaw className={styles.paw1} />
          <FaPaw className={styles.paw2} />
          <FaPaw className={styles.paw3} />
        </div>

        {/* --- CABEÇALHO DA PÁGINA --- */}
        <div className={styles.header}>
          

          <h1 className={styles.titulo}>Voluntários para Lar temporário</h1>
          <p className={styles.subtitulo}>
            Acompanhe todos os voluntários e seus formulários
          </p>
        </div>

        {/* --- TABELA DE LISTAGEM --- */}
        <div className={styles.tableContainer}>
          
          {/* Cabeçalho da Tabela */}
          <div className={styles.tableHeader}>
            <div className={styles.colCheck}>
              <input 
                type="checkbox" 
                className={styles.checkbox} 
                checked={selecionados.length === MOCK_VOLUNTARIOS.length && MOCK_VOLUNTARIOS.length > 0}
                onChange={toggleSelectAll}
              />
            </div>
            <div className={styles.colId}>ID</div>
            <div className={styles.colNome}>Nome</div>
            <div className={styles.colTipo}>Tipo de formulário</div>
            <div className={styles.colData}>Feito em</div>
          </div>

          {/* Linhas da Tabela */}
          <div className={styles.tableBody}>
            {MOCK_VOLUNTARIOS.map((voluntario) => (
              <div key={voluntario.id} className={styles.tableRow}>
                <div className={styles.colCheck}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selecionados.includes(voluntario.id)}
                    onChange={() => toggleSelect(voluntario.id)}
                  />
                </div>
                <div className={styles.colId}>{voluntario.id}</div>
                <div className={styles.colNome}>{voluntario.nome}</div>
                <div className={styles.colTipo}>{voluntario.tipoFormulario}</div>
                <div className={styles.colData}>{voluntario.data}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Layout>
  );
}