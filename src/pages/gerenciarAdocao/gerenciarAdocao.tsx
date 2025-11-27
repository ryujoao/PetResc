import React, { useState } from "react";
import styles from "./gerenciarAdocao.module.css";
import Layout from "../../components/layout";
// Importando os ícones necessários, incluindo o do WhatsApp
import { FaCheck, FaTimes, FaPaw, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

// --- TIPAGEM (Baseada no seu formulário de adoção) ---
type FormData = {
  nome: string;
  email: string;
  telefone: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  estado?: string;
  cidade?: string;
  tipoMoradia: string;
  quintal: string;
  tipoMoradiaChoice?: string;
  portesAceitos?: string;
  animaisAceitos?: string;
  jaViuPet?: string;
  qualTipoPet?: string;
  preferenciaPet?: string;
  pessoasNoLar?: string;
  outrosAnimaisLocal?: {
    Quantidade: string;
    "Tipo de Animal": string;
  };
  alergia?: string;
  aceitaTermo?: boolean;
};

// --- MOCK DO ANIMAL (Simulando dados do Banco) ---
const animalReal = {
  id: 42,
  nome: "Branquinho",
  foto: "/image_972ff3.png", // Use o caminho da sua imagem real ou um placeholder
  status: "Avaliando Formulários",
  raca: "Sem raça definida (SRD)",
  idade: "Filhote",
  sexo: "Macho",
  porte: "Médio",
  cor: "Branco",
  historia: "Branquinho foi encontrado miando muito em uma caixa de papelão. É muito brincalhão e precisa de um lar seguro (apartamento telado ou casa sem rota de fuga).",
  local: "Cotia - SP"
};

// --- MOCK DOS CANDIDATOS (Simulando respostas do formulário) ---
const candidatosMock: { id: number; dataEnvio: string; dados: FormData }[] = [
  {
    id: 101,
    dataEnvio: "27/11/2025",
    dados: {
      nome: "Ricardo Lerner",
      email: "ricardo.lerner@email.com",
      telefone: "(11) 99999-9999", // Telefone fictício para teste
      cep: "06700-000",
      rua: "Rua Direita",
      numero: "955",
      complemento: "Apto 32",
      bairro: "Vila Santo Antônio",
      cidade: "Cotia",
      estado: "SP",
      // Dados de Moradia
      tipoMoradia: "Apartamento", 
      tipoMoradiaChoice: "Apartamento", 
      quintal: "Não", 
      // Preferências
      portesAceitos: "Pequeno, Médio",
      animaisAceitos: "Gato",
      jaViuPet: "Sim, já vi",
      qualTipoPet: "Gato",
      preferenciaPet: "Macho",
      // Lar
      pessoasNoLar: "2",
      outrosAnimaisLocal: {
        Quantidade: "0",
        "Tipo de Animal": "-"
      },
      alergia: "Não",
      aceitaTermo: true
    }
  },
  {
    id: 102,
    dataEnvio: "26/11/2025",
    dados: {
      nome: "Ana Souza",
      email: "ana.souza@email.com",
      telefone: "(11) 98888-8888",
      cep: "01000-000",
      rua: "Av. Paulista",
      numero: "100",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP",
      // Dados de Moradia
      tipoMoradia: "Casa",
      tipoMoradiaChoice: "Casa",
      quintal: "Sim",
      // Preferências
      portesAceitos: "Todos",
      animaisAceitos: "Gato, Cachorro",
      jaViuPet: "Não, quero achar um",
      qualTipoPet: "Gato",
      preferenciaPet: "Tanto faz",
      // Lar
      pessoasNoLar: "3",
      outrosAnimaisLocal: {
        Quantidade: "1",
        "Tipo de Animal": "Cachorro"
      },
      alergia: "Sim (Leve)",
      aceitaTermo: true
    }
  }
];

export default function GerenciarAdocao() {
  const [candidatoSelecionado, setCandidatoSelecionado] = useState(candidatosMock[0]);

  // Função para APROVAR
  const handleAprovar = () => {
    if (window.confirm(`Tem certeza que deseja APROVAR a adoção de ${animalReal.nome} para ${candidatoSelecionado.dados.nome}?`)) {
      alert(`Adoção aprovada com sucesso! O status do animal será atualizado.`);
      // Aqui entraria a chamada para sua API (PUT /api/adocao/aprovar)
    }
  };

  // Função para RECUSAR
  const handleRecusar = () => {
    if (window.confirm(`Deseja recusar esta solicitação e arquivar o formulário?`)) {
      alert("Solicitação recusada.");
      // Aqui entraria a chamada para sua API (PUT /api/adocao/recusar)
    }
  };

  // --- LÓGICA DO WHATSAPP (Igual à página de animal encontrado, mas invertida) ---
  const handleWhatsApp = () => {
    // 1. Limpa o telefone (remove tudo que não é número)
    const telefoneLimpo = candidatoSelecionado.dados.telefone.replace(/\D/g, '');
    
    // 2. Monta a mensagem personalizada da ONG para o Candidato
    const nomeCandidato = candidatoSelecionado.dados.nome;
    const nomePet = animalReal.nome;
    const texto = `Olá ${nomeCandidato}! Sou responsável pelo pet "${nomePet}" no PetResc. Analisei seu formulário de adoção e gostaria de conversar para te conhecer melhor. Podemos falar?`;
    
    // 3. Gera o link da API do WhatsApp
    // Adiciona o DDI 55 do Brasil se não estiver incluso
    const numeroFinal = telefoneLimpo.length <= 11 ? `55${telefoneLimpo}` : telefoneLimpo;
    
    const url = `https://api.whatsapp.com/send?phone=${numeroFinal}&text=${encodeURIComponent(texto)}`;
    
    // 4. Abre em nova aba
    window.open(url, '_blank');
  };

  const d = candidatoSelecionado.dados; 

  return (
    <Layout>
      <div className={styles.pageContainer}>
        
        {/* CABEÇALHO DO ANIMAL */}
        <section className={styles.animalHeader}>
          <div className={styles.animalImageWrapper}>
            {/* Imagem do animal */}
            <img 
              src={animalReal.foto} 
              alt={animalReal.nome} 
              className={styles.animalImg}
              onError={(e) => e.currentTarget.src = "https://via.placeholder.com/300?text=Foto+do+Pet"} 
            />
          </div>
          
          <div className={styles.animalContent}>
            <div className={styles.animalTitleRow}>
              <h1 className={styles.animalName}>{animalReal.nome}</h1>
              {/* Botão de mudar status rápido do animal */}
              <button className={styles.btnStatus}>{animalReal.status}</button>
            </div>
            
            <div className={styles.animalTags}>
              <span><FaPaw /> {animalReal.raca}</span>
              <span>• {animalReal.idade}</span>
              <span>• {animalReal.sexo}</span>
              <span>• {animalReal.porte}</span>
              <span>• {animalReal.cor}</span>
            </div>
            
            <p className={styles.animalStory}>{animalReal.historia}</p>
            
            <div className={styles.animalLocation}>
              <FaMapMarkerAlt color="#d9534f" /> {animalReal.local}
            </div>
          </div>
        </section>

        <h2 className={styles.sectionTitle}>Informações dos Candidatos à Adoção</h2>

        <div className={styles.mainGrid}>
          
          {/* COLUNA ESQUERDA: LISTA DE CANDIDATOS */}
          <aside className={styles.candidatesList}>
            {candidatosMock.map((cand) => (
              <div 
                key={cand.id}
                className={`${styles.candidateCard} ${candidatoSelecionado.id === cand.id ? styles.active : ''}`}
                onClick={() => setCandidatoSelecionado(cand)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardName}>{cand.dados.nome}</span>
                </div>
                <div className={styles.cardSummary}>
                  <p style={{fontSize: '0.85rem', color: '#666', marginBottom: '4px'}}>
                     Enviado em: {cand.dataEnvio}
                  </p>
                  <p style={{fontSize: '0.9rem', color: '#555'}}>
                    {cand.dados.tipoMoradiaChoice} • {cand.dados.cidade}-{cand.dados.estado}
                  </p>
                </div>
              </div>
            ))}
          </aside>

          {/* COLUNA DIREITA: DETALHES DO FORMULÁRIO SELECIONADO */}
          <section className={styles.detailsPanel}>
            
            <div className={styles.detailsHeader}>
              <div className={styles.headerTitleBlock}>
                <h3>Informações Pessoais</h3>
                <p className={styles.subInfo}>Nome Completo: <strong>{d.nome}</strong></p>
                <p className={styles.subInfo}>E-mail: {d.email}</p>
                <p className={styles.subInfo}>Telefone: {d.telefone}</p>
              </div>
            </div>

            <div className={styles.dataGrid}>
              {/* Coluna 1: Endereço e Moradia */}
              <div className={styles.dataColumn}>
                <h4 className={styles.columnTitle}>Endereço & Moradia</h4>
                
                <div className={styles.dataItem}>
                  <label>Endereço Completo:</label>
                  <p>{d.rua}, {d.numero} {d.complemento ? `- ${d.complemento}` : ""}</p>
                  <p>{d.bairro} - {d.cidade}/{d.estado}</p>
                  <p>CEP: {d.cep}</p>
                </div>

                <div className={styles.dataItem}>
                  <label>Tipo de Moradia:</label>
                  <p>{d.tipoMoradiaChoice}</p>
                </div>

                <div className={styles.dataItem}>
                  <label>Possui Quintal?</label>
                  <p>{d.quintal || "Não informado"}</p>
                </div>
              </div>

              {/* Coluna 2: Detalhes do Lar */}
              <div className={styles.dataColumn}>
                <h4 className={styles.columnTitle}>Detalhes do Lar</h4>
                
                <div className={styles.dataItem}>
                  <label>Número de Residentes:</label>
                  <p>{d.pessoasNoLar}</p>
                </div>

                <div className={styles.dataItem}>
                  <label>Outros Animais:</label>
                  {d.outrosAnimaisLocal && d.outrosAnimaisLocal.Quantidade !== "0" ? (
                    <p>{d.outrosAnimaisLocal.Quantidade} - {d.outrosAnimaisLocal["Tipo de Animal"]}</p>
                  ) : (
                    <p>Não possui outros animais.</p>
                  )}
                </div>

                <div className={styles.dataItem}>
                  <label>Alergias na família?</label>
                  <p className={d.alergia?.includes("Sim") ? styles.alertText : ""}>
                    {d.alergia || "Não"}
                  </p>
                </div>

                <div className={styles.dataItem}>
                  <label>Termo de Responsabilidade:</label>
                  <p style={{color: d.aceitaTermo ? 'green' : 'red'}}>
                    {d.aceitaTermo ? "Aceito" : "Pendente"}
                  </p>
                </div>
              </div>
            </div>

            {/* BARRA DE AÇÕES (BOTÕES) */}
            <div className={styles.actionButtons}>
              
              {/* Botão de WhatsApp (Estilo Entrevista) */}
              <button 
                className={styles.btnWhatsapp} 
                onClick={handleWhatsApp}
                title="Conversar com o candidato no WhatsApp"
              >
                <FaWhatsapp size={20} /> Conversar
              </button>

              {/* Divisor Visual */}
              <div className={styles.dividerVertical}></div>

              {/* Recusar */}
              <button className={styles.btnReject} onClick={handleRecusar}>
                <FaTimes /> Recusar
              </button>
              
              {/* Aprovar (Botão Principal) */}
              <button className={styles.btnApprove} onClick={handleAprovar}>
                Aprovar Adoção
              </button>
            </div>

          </section>
        </div>
      </div>
    </Layout>
  );
}