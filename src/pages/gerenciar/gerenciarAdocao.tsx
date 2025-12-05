import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./gerenciar.module.css"; // Usando O MESMO arquivo CSS
import Layout from "../../components/layout";

// --- DADOS MOCKADOS ---
const ANIMAL_INFO = {
  nome: "Branquinho",
  fotoUrl: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1887&auto=format&fit=crop",
  status: "Avaliando Formulários",
  codigo: "000000",
  ultimaAtualizacao: "05/10/2023",
};

const CANDIDATOS = [
  {
    id: 1,
    nome: "Ricardo Lerner",
    dataNascimento: "15/03/1985",
    dataEnvio: "04/10/2023",
    cpf: "123.456.789-00",
    telefone: "+55 (11) 98765-4321",
    email: "ricardo.lerner@email.com",
    endereco: {
      cep: "06700-000",
      rua: "Rua das Acácias",
      numero: "955",
      complemento: "Apto 101",
      bairro: "Vila Santo Antônio",
      cidade: "Cotia",
      estado: "SP"
    },
    moradia: {
      tipo: "Apartamento",
      outrosAnimais: "Não possui",
      residentes: "1 adulto"
    }
  },
  {
    id: 2,
    nome: "Ana Silva",
    dataNascimento: "12/05/1990",
    dataEnvio: "01/10/2023",
    cpf: "111.222.333-44",
    telefone: "+55 (11) 99999-8888",
    email: "ana.silva@email.com",
    endereco: {
      cep: "01310-100",
      rua: "Av. Paulista",
      numero: "1000",
      complemento: "Bloco B",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP"
    },
    moradia: {
      tipo: "Casa",
      outrosAnimais: "Sim (1 Gato)",
      residentes: "2 adultos, 1 criança"
    }
  }
];



export default function GerenciarAdocao() {
  const [candidatoSelecionado, setCandidatoSelecionado] = useState(CANDIDATOS[0]);

  return (
    <Layout>
      <div className={styles.container}>
        
        {/* BOTÃO VOLTAR */}
        <button className={styles.btnVoltar} onClick={() => console.log("Voltar")}>
          <FaArrowLeft size={20} /> Voltar
        </button>

        {/* --- CABEÇALHO (REUTILIZADO DO REGISTRO) --- */}
        <div className={styles.secaoCabecalho}>
          <div className={styles.moldeFoto}>
            <img 
              src={ANIMAL_INFO.fotoUrl} 
              alt={ANIMAL_INFO.nome} 
              className={styles.fotoAnimal} 
            />
          </div>

          <div className={styles.painelInfoPrincipal}>
            <h1 className={styles.nomeAnimal}>{ANIMAL_INFO.nome}</h1>
            <div className={styles.linhaStatus}>
              Status: <strong>{ANIMAL_INFO.status}</strong>
              <br />
              Última atualização: {ANIMAL_INFO.ultimaAtualizacao}
            </div>
            
            <button className={styles.btnMudarStatus}>Mudar Status</button>
            <span className={styles.codigoAnimal}>Código: {ANIMAL_INFO.codigo}</span>
          </div>
        </div>

        {/* --- TÍTULO PRINCIPAL --- */}
        <h2 className={styles.tituloSecao}>Informações dos Candidatos à Adoção</h2>
        <div className={styles.divisorAzul}></div>

        {/* --- ÁREA MESTRE-DETALHE --- */}
        <div className={styles.layoutCandidatos}>
          
          {/* LADO ESQUERDO: LISTA DE CANDIDATOS */}
          <div className={styles.listaLateral}>
            {CANDIDATOS.map((candidato) => (
              <div 
                key={candidato.id}
                className={`${styles.cardCandidato} ${candidatoSelecionado.id === candidato.id ? styles.cardAtivo : ''}`}
                onClick={() => setCandidatoSelecionado(candidato)}
              >
                <span className={styles.nomeCandidatoLista}>{candidato.nome}</span>
                <span className={styles.resumoCandidato}>Enviado em: {candidato.dataEnvio}</span>
              </div>
            ))}
          </div>

          {/* LADO DIREITO: DETALHES DO CANDIDATO */}
          <div className={styles.painelDetalhes}>
            
            {/* Bloco: Info Pessoal */}
            <h3 className={styles.subtituloDetalhes}>Informações Pessoais</h3>
            <div className={styles.gridDetalhes}>
              <div className={styles.blocoDado}>
                <span className={styles.rotulo}>Nome Completo</span>
                <p className={styles.valor}>{candidatoSelecionado.nome}</p>
              </div>
              <div className={styles.blocoDado}>
                <span className={styles.rotulo}>CPF</span>
                <p className={styles.valor}>{candidatoSelecionado.cpf}</p>
              </div>
              <div className={styles.blocoDado}>
                <span className={styles.rotulo}>Data de Nascimento</span>
                <p className={styles.valor}>{candidatoSelecionado.dataNascimento}</p>
              </div>
              <div className={styles.blocoDado}>
                <span className={styles.rotulo}>Telefone</span>
                <p className={styles.valor}>{candidatoSelecionado.telefone}</p>
              </div>
              <div className={styles.blocoDado}>
                <span className={styles.rotulo}>E-mail</span>
                <p className={styles.valor}>{candidatoSelecionado.email}</p>
              </div>
            </div>

            {/* Bloco: Endereço & Moradia */}
            <div className={styles.gridDetalhes}>
              {/* Coluna 1: Endereço */}
              <div>
                <h3 className={styles.subtituloDetalhes}>Endereço</h3>
                <div className={styles.blocoDado}>
                  <span className={styles.rotulo}>CEP</span>
                  <p className={styles.valor}>{candidatoSelecionado.endereco.cep}</p>
                </div>
                <div className={styles.blocoDado}>
                  <span className={styles.rotulo}>Rua</span>
                  <p className={styles.valor}>{candidatoSelecionado.endereco.rua}</p>
                </div>
                <div className={styles.blocoDado}>
                  <span className={styles.rotulo}>Número</span>
                  <p className={styles.valor}>{candidatoSelecionado.endereco.numero}</p>
                </div>
                <div className={styles.blocoDado}>
                  <span className={styles.rotulo}>Complemento</span>
                  <p className={styles.valor}>{candidatoSelecionado.endereco.complemento}</p>
                </div>
                 <div className={styles.blocoDado}>
                  <span className={styles.rotulo}>Bairro</span>
                  <p className={styles.valor}>{candidatoSelecionado.endereco.bairro}</p>
                </div>
                <div className={styles.blocoDado}>
                  <span className={styles.rotulo}>Cidade / Estado</span>
                  <p className={styles.valor}>{candidatoSelecionado.endereco.cidade} - {candidatoSelecionado.endereco.estado}</p>
                </div>
              </div>

              {/* Coluna 2: Moradia */}
              <div>
                <h3 className={styles.subtituloDetalhes}>Moradia</h3>
                <div className={styles.blocoDado}>
                  <span className={styles.rotulo}>Tipo de Imóvel</span>
                  <p className={styles.valor}>{candidatoSelecionado.moradia.tipo}</p>
                </div>
                <div className={styles.blocoDado}>
                  <span className={styles.rotulo}>Outros Animais</span>
                  <p className={styles.valor}>{candidatoSelecionado.moradia.outrosAnimais}</p>
                </div>
                <div className={styles.blocoDado}>
                  <span className={styles.rotulo}>Residentes</span>
                  <p className={styles.valor}>{candidatoSelecionado.moradia.residentes}</p>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className={styles.rodapeAcoes}>
              <button 
                className={`${styles.btnAcao} ${styles.negativo}`}
                onClick={() => alert(`Adoção recusada para ${candidatoSelecionado.nome}`)}
              >
                Reprovar
              </button>
              <button 
                className={`${styles.btnAcao} ${styles.positivo}`}
                onClick={() => alert(`Adoção aprovada para ${candidatoSelecionado.nome}`)}
              >
                Aprovar Adoção
              </button>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}