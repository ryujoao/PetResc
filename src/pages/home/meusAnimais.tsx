
import React, { useState, useEffect } from "react";
import styles from "./meusAnimais.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api"; 

interface Animal {
    id: string;
    nome: string;
    raca: string;
    idade: string; // Ex: 'ADULTO', 'FILHOTE'
    status: 'PERDIDO' | 'ENCONTRADO' | 'DISPONIVEL' | 'EM_TRATAMENTO' | 'ADOTADO';
    photoURL: string; 
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
    
    const formatStatus = (status: string) => status ? status.replace(/_/g, ' ') : 'Desconhecido';

    const statusSuperior = tipoStatus === 'CADASTRO' ? formatStatus(animal.status) : 'Adoção Solicitada';
    // Se for adoção, mostra o status do pedido. Se for cadastro, não repete o status (já está em cima).
    const statusInferior = tipoStatus === 'ADOCAO' ? `Status: ${statusAdocao}` : '';
    
    // Tenta usar a foto do animal, senão usa um placeholder confiável
    const imagemSrc = animal.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto";

    return (
        <div className={styles.card}>
            <div className={styles.imgWrapper}>
                <img 
                    src={imagemSrc} 
                    alt={animal.nome || "Animal"} 
                    onError={(e) => {
                        // Se a imagem falhar, substitui por placeholder
                        e.currentTarget.src = "https://placehold.co/300x300/f8f8f8/ccc?text=Erro+Imagem";
                    }}
                />
            </div>

            <div className={styles.infoCard}>
                <h3 className={styles.cardNome}>{animal.nome || "Sem Nome"}</h3>
                <p className={styles.descricaoCard}>
                    {animal.raca || "SRD"} • {animal.idade || "?"} anos
                </p>
                {/* Se quiser mostrar ID ou outra info */}
                <span className={styles.tagId}>#{animal.id}</span>
            </div>

            {/* Status Flutuantes */}
            <div className={styles.statusSuperior}>{statusSuperior}</div>
            {statusInferior && <div className={styles.statusInferior}>{statusInferior}</div>}
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
        // Se não tiver usuário, nem tenta buscar (o AuthContext deve lidar com redirect se for rota protegida)
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchMeusDados = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // Requisições paralelas para ganhar tempo
                const [resAnimais, resAdocoes] = await Promise.all([
                    api.get("/animais/gerenciar/lista"), // Rota de Animais Cadastrados
                    api.get("/pedidos-adocao/meus-pedidos")      // Rota de Pedidos feitos (Ajuste se sua rota for diferente no server.js)
                ]);

                setAnimaisCadastrados(resAnimais.data);
                setAdocoesEmProcesso(resAdocoes.data);

            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError("Falha ao carregar seus registros. Tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchMeusDados();
    }, [user]);

    // --- Renderização ---
    if (loading) return <div className={styles.loadingContainer}><p>Carregando seus registros...</p></div>;
    
    // Se o usuário não estiver logado, mostre uma mensagem ou redirecione
    if (!user) return <div className={styles.containerPrincipal}><p>Faça login para ver seus animais.</p></div>;
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