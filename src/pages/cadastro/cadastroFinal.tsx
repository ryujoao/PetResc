import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api'; 
import styles from "./cadastro.module.css";
import axios from 'axios'; // Importamos o axios para fazer as chamadas às APIs externas

// --- Tipos para organizar os dados do IBGE ---
interface IBGEUFResponse {
  id: number;
  sigla: string;
  nome: string;
}

interface IBGECidadeResponse {
  id: number;
  nome: string;
}

export default function CadastroFinal() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- Estados para os campos do formulário ---
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState(''); // Agora será a Sigla (ex: 'SP')
  const [cidade, setCidade] = useState('');
  const [error, setError] = useState('');

  // --- Estados para as listas de localidades ---
  const [estados, setEstados] = useState<IBGEUFResponse[]>([]);
  const [cidades, setCidades] = useState<IBGECidadeResponse[]>([]);
  
  // --- Efeito para buscar a lista de ESTADOS (UFs) do IBGE ao carregar a página ---
  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then(response => {
        setEstados(response.data);
      });
  }, []);

  // --- Efeito para buscar as CIDADES sempre que um ESTADO for selecionado ---
  useEffect(() => {
    if (estado) {
      axios.get<IBGECidadeResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
        .then(response => {
          setCidades(response.data);
        });
    }
  }, [estado]); // Este efeito roda sempre que a variável 'estado' mudar

  // --- Efeito para buscar o endereço quando o CEP tiver 8 dígitos ---
  useEffect(() => {
    const cepFormatado = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cepFormatado.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cepFormatado}/json/`)
        .then(response => {
          if (!response.data.erro) {
            setRua(response.data.logradouro);
            setBairro(response.data.bairro);
            setEstado(response.data.uf);
            setCidade(response.data.localidade);
            setError(''); // Limpa o erro se a busca for bem sucedida
          } else {
            setError('CEP não encontrado.');
          }
        })
        .catch(() => setError('Erro ao buscar o CEP.'));
    }
  }, [cep]); // Este efeito roda sempre que a variável 'cep' mudar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... (sua lógica de submit continua a mesma)
  };

  return (
    <div className={styles.pagCadastro}>
      <div className={styles.containerForms2}>
        <div className={styles.logoHeader}>
          <a href="/">PetResc</a>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.titulo}>Endereço da ONG</h1>
          <p className={styles.subTitulo}>Complete os dados de localização para finalizar</p>

          <div>
            <label className={styles.grupoInput}>CEP</label>
            <input 
              className={styles.inputLogin} 
              type="text" 
              placeholder="Digite o CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              maxLength={9} // CEP tem 8 dígitos + hífen
            />
          </div>
          <div>
            <label className={styles.grupoInput}>Rua/Avenida</label>
            <input 
              className={styles.inputLogin} 
              type="text" 
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </div>

          <div className={styles.linhaCampos}>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Número</label>
              <input 
                className={styles.inputLogin} 
                type="text" 
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Complemento</label>
              <input 
                className={styles.inputLogin} 
                type="text" 
                placeholder="Opcional"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label className={styles.grupoInput}>Bairro</label>
            <input 
              className={styles.inputLogin} 
              type="text" 
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>

          <div className={styles.linhaCampos}>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Estado</label>
              {/* --- ALTERADO para SELECT (Dropdown) --- */}
              <select 
                className={styles.inputLogin} 
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Selecione um estado</option>
                {estados.map(uf => (
                  <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                ))}
              </select>
            </div>
            <div className={styles.campoMetade}>
              <label className={styles.grupoInput}>Cidade</label>
              {/* --- ALTERADO para SELECT (Dropdown) --- */}
              <select 
                className={styles.inputLogin} 
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                disabled={!estado} // Desabilita se nenhum estado for selecionado
              >
                <option value="">Selecione uma cidade</option>
                {cidades.map(cidade => (
                  <option key={cidade.id} value={cidade.nome}>{cidade.nome}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}

          <button type="submit" className={styles.botaoProx}>
            Finalizar Cadastro
          </button>

          <p className={styles.loginLink}>
            Já tem conta? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div className={styles.bannerSessao}></div>
    </div>
  );
}