// src/pages/meusAnimais/meusAnimais.tsx

import React, { useState, useEffect } from "react";
import styles from "./meusAnimais.module.css";
import { useAuth } from "../../auth/AuthContext"; // Importa o contexto de autenticação

// --- TIPAGENS (Adapte conforme sua API) ---
interface Animal {
    id: string;
    nome: string;
    raca: string;
    idade: string; // Ex: 'ADULTO', 'FILHOTE'
    status: 'PERDIDO' | 'ENCONTRADO' | 'DISPONIVEL' | 'EM_TRATAMENTO' | 'ADOTADO';
    imagem_url: string; 
    // Outros campos relevantes...
}

interface Adocao {
    id: string;
    animal: Animal;
    status_adocao: string; // Ex: 'EM_ANALISE', 'APROVADO', 'REPROVADO'
}

// --- Componente de Card Reutilizável ---
interface AnimalCardProps {
    animal: Animal;
    statusAdocao?: string; // Usado apenas para seção "Adoção em Processo"
    tipoStatus: 'CADASTRO' | 'ADOCAO';
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, statusAdocao, tipoStatus }) => {
    
    // Simulação: Transforma o status do backend em algo legível para o frontend
    const formatStatus = (status: string) => status.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ');

    const statusSuperior = tipoStatus === 'CADASTRO' ? formatStatus(animal.status) : 'Adoção Solicitada';
    const statusInferior = tipoStatus === 'CADASTRO' ? `Status: ${formatStatus(animal.status)}` : `Status: ${statusAdocao}`;
    
    // Substitua 'animal.imagem_url' pela URL correta da imagem (pode ser necessário ajuste de caminhos)
    const imagemSrc = animal.imagem_url || "/path/to/default/image.png"; 

    return (
        <div className={styles.card}>
            <div className={styles.imgCard}>
                <img 
                    // Tente usar caminhos relativos ou a URL completa da API
                    src={imagemSrc} 
                    alt={animal.nome || "Animal sem nome"} 
                />
            </div>

            <div className={styles.infoCard}>
                <div className={styles.cardNome}>
                    <h1>{animal.nome || "Não possui nome"}</h1>
                    <p className={styles.descricaoCard}>
                        {animal.raca || "Sem raça definida"}, {animal.idade ? animal.idade.substring(0, 2) : "Idade não informada"}.
                    </p>
                    <p className={styles.descricaoCard}>({animal.raca ? 'Raça informada' : 'SRD'})</p>
                </div>
            </div>

            <div className={styles.statusSuperior}>{statusSuperior}</div>
            <div className={styles.statusInferior}>{statusInferior}</div>
        </div>
    );
};

// --- Componente Principal ---
export default function MeusAnimais() {
    const { user } = useAuth();
    const [animaisCadastrados, setAnimaisCadastrados] = useState<Animal[]>([]);
    const [adocoesEmProcesso, setAdocoesEmProcesso] = useState<Adocao[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("@AuthData:token");

    useEffect(() => {
        if (!token) {
            setError("Usuário não autenticado.");
            setLoading(false);
            return;
        }

        // Função para buscar dados do Backend
        const fetchMeusDados = async () => {
            setLoading(true);
            setError(null);
            
            // 1. URL para buscar animais cadastrados PELO USUÁRIO (seja ONG ou usuário comum)
            // OBS: Esta rota ('/api/animais/meus') é uma suposição, adapte-a ao seu backend.
            try {
                const responseAnimais = await fetch("https://petresc.onrender.com/api/animais/meus", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (responseAnimais.ok) {
                    const data: Animal[] = await responseAnimais.json();
                    setAnimaisCadastrados(data);
                } else {
                    console.error("Erro ao buscar animais cadastrados:", await responseAnimais.json());
                }

                // 2. URL para buscar processos de adoção iniciados PELO USUÁRIO
                // OBS: Esta rota ('/api/adocoes/minhas') é uma suposição.
                const responseAdocoes = await fetch("https://petresc.onrender.com/api/adocoes/minhas", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (responseAdocoes.ok) {
                    const data: Adocao[] = await responseAdocoes.json();
                    setAdocoesEmProcesso(data.filter(a => a.status_adocao !== 'APROVADO' && a.status_adocao !== 'REPROVADO'));
                } else {
                    console.error("Erro ao buscar adoções em processo:", await responseAdocoes.json());
                }

            } catch (err) {
                console.error("Erro de rede:", err);
                setError("Falha ao carregar dados. Verifique a conexão.");
            } finally {
                setLoading(false);
            }
        };

        fetchMeusDados();
    }, [token]);

    // --- Renderização de Status ---
    if (loading) {
        return <div className={styles.containerPrincipal}><p>Carregando seus registros...</p></div>;
    }

    if (error) {
        return <div className={styles.containerPrincipal}><p className={styles.erro}>Erro: {error}</p></div>;
    }
    
    // --- Renderização Principal ---
    return (
        <div className={styles.containerPrincipal}>
            
            {/* Seção 1: Animais Cadastrados (Apenas se o usuário tiver algum, tipicamente ONG) */}
            <div className={styles.containerMeusAnimais}>
                <h2 className={styles.titulo}>Animais Cadastrados</h2>
                
                {animaisCadastrados.length === 0 ? (
                    <p className={styles.mensagemVazio}>
                        Você não possui animais cadastrados.
                    </p>
                ) : (
                    <div className={styles.gridAnimais}>
                        {animaisCadastrados.map(animal => (
                            <AnimalCard 
                                key={animal.id} 
                                animal={animal} 
                                tipoStatus="CADASTRO" 
                            />
                        ))}
                    </div>
                )}
            </div>

            <hr className={styles.divisor} />

            {/* Seção 2: Adoção em Processo (Para todos os usuários) */}
            <div className={styles.adocaoProcesso}>
                <h2 className={styles.titulo}>Adoção em Processo</h2>

                {adocoesEmProcesso.length === 0 ? (
                    <p className={styles.mensagemVazio}>
                        Você não possui pedidos de adoção em análise.
                    </p>
                ) : (
                    <div className={styles.gridAnimais}>
                        {adocoesEmProcesso.map(adocao => (
                            <AnimalCard 
                                key={adocao.id} 
                                animal={adocao.animal} 
                                statusAdocao={adocao.status_adocao} 
                                tipoStatus="ADOCAO"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}