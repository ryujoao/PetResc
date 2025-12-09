import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./animaisCadastrados.module.css";
import { Link, useNavigate } from "react-router-dom";

interface Animal {
  id: number;
  nome?: string;
  raca?: string;
  idade?: number;
  status: string;
  photoURL?: string;
}

// Interface auxiliar para cruzar dados
interface Pedido {
    id: number;
    animalId: number;
    status: string; // 'PENDENTE', 'APROVADO', 'RECUSADO'
}

export default function AnimaisCadastrados() {
  const navigate = useNavigate();
  
  const [listas, setListas] = useState({
    adocao: [] as Animal[],
    lar: [] as Animal[],
    pedidos: [] as Animal[],
    concluidas: [] as Animal[]
  });
  const [loading, setLoading] = useState(true);

  const normalizar = (texto: string) => {
    if (!texto) return "";
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const token = localStorage.getItem('@AuthData:token'); // Verifique se sua chave é 'token' ou '@AuthData:token'
    
    // Função assíncrona para buscar tudo junto
    async function fetchData() {
        try {
            // 1. Buscamos Animais E Pedidos
            const [resAnimais, resPedidos] = await Promise.all([
                api.get("/animais/gerenciar/lista", { headers: { Authorization: `Bearer ${token}` } }),
                api.get("/pedidos-adocao/gerenciar", { headers: { Authorization: `Bearer ${token}` } })
            ]);

            const todosAnimais: Animal[] = resAnimais.data;
            const todosPedidos: Pedido[] = resPedidos.data;
            
            const adocaoArr: Animal[] = [];
            const larArr: Animal[] = [];
            const pedidosArr: Animal[] = [];
            const concluidasArr: Animal[] = [];

            todosAnimais.forEach(animal => {
                const s = normalizar(animal.status);
                
                // Verifica se existe algum pedido PENDENTE para este animal específico
                const temPedidoPendente = todosPedidos.some(p => p.animalId === animal.id && p.status === 'PENDENTE');

                // LÓGICA DE DISTRIBUIÇÃO
                
                // 1. Concluídas (Prioridade máxima: se já foi adotado, sai das outras listas)
                if (s.includes('adotado') || s.includes('concluido')) {
                    concluidasArr.push(animal);
                } 
                // 2. Pedidos Pendentes (Se tem pedido no banco OU se o status diz pendente)
                else if (temPedidoPendente || s.includes('pendente') || s.includes('solicitado')) {
                    pedidosArr.push(animal);
                }
                // 3. Lar Temporário
                else if (s.includes('lar') || s.includes('temporario')) {
                    larArr.push(animal);
                }
                // 4. Disponível para Adoção (Caso não tenha caido em nenhum acima)
                else {
                    adocaoArr.push(animal);
                }
            });

            setListas({
                adocao: adocaoArr,
                lar: larArr,
                pedidos: pedidosArr,
                concluidas: concluidasArr
            });

        } catch (err) {
            console.error("Erro ao buscar dados:", err);
        } finally {
            setLoading(false);
        }
    }

    fetchData();
  }, []);

  const handleCardClick = (id: number) => {
      navigate(`/gerenciar-adocao/${id}`);
  };

  if (loading) return <p style={{textAlign:'center', padding:'2rem'}}>Carregando animais...</p>;

  // Card do Animal (Design inalterado, apenas onClick)
  const renderCard = (animal: Animal, labelStatus: string, corStatus: string) => (
    <div 
        key={animal.id} 
        className={styles.card} 
        onClick={() => handleCardClick(animal.id)} 
        style={{ cursor: 'pointer' }}
        title="Clique para gerenciar"
    >
        <div className={styles.imgCard}>
            <img
                src={animal.photoURL || "https://placehold.co/300x300/f8f8f8/ccc?text=Sem+Foto"}
                alt={animal.nome || "Sem Nome"}
                onError={(e) => (e.currentTarget.src = "https://placehold.co/300")}
            />
        </div>

        <div className={styles.infoCard}>
            <div className={styles.cardNome}>
                <h1>{animal.nome || "Sem Nome"}</h1>
                <p className={styles.descricaoCard}>
                    {animal.raca || "Raça n/d"} • {animal.idade ? `${animal.idade} anos` : "?"}
                </p>
            </div>
        </div>

        <div className={styles.statusBadge} style={{ backgroundColor: corStatus }}>
            {labelStatus}
        </div>
    </div>
  );

  const EmptyList = ({ msg }: { msg: string }) => (
    <div className={styles.emptyBox}>
        <p>{msg}</p>
    </div>
  );

  return (
    <div className={styles.containerPrincipal}>
      
      {/* 1. ANIMAIS PARA ADOÇÃO */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Animais para Adoção ({listas.adocao.length})</h2>
        <div className={styles.listaScroll}>
            {listas.adocao.length > 0 ? listas.adocao.map(a => renderCard(a, 'Disponível', '#e3f2fd')) : <EmptyList msg="Nenhum animal disponível." />}
        </div>
        <Link to="/registrar-animal" className={styles.verMais}>Cadastrar Novo</Link>
      </div>

      {/* 2. LAR TEMPORÁRIO */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Em Lar Temporário ({listas.lar.length})</h2>
        <div className={styles.listaScroll}>
            {listas.lar.length > 0 ? listas.lar.map(a => renderCard(a, 'Em Lar', '#fff3e0')) : <EmptyList msg="Nenhum animal em LT." />}
        </div>
        {/* Link pode ser removido ou mantido conforme seu design original */}
      </div>

      {/* 3. PEDIDOS DE ADOÇÃO */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Pedidos de Adoção ({listas.pedidos.length})</h2>
        <div className={styles.listaScroll}>
            {listas.pedidos.length > 0 ? listas.pedidos.map(a => renderCard(a, 'Pendente', '#fff8e1')) : <EmptyList msg="Nenhuma solicitação pendente." />}
        </div>
      </div>

      {/* 4. ADOÇÕES CONCLUÍDAS */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Adoções Concluídas ({listas.concluidas.length})</h2>
        <div className={styles.listaScroll}>
            {listas.concluidas.length > 0 ? listas.concluidas.map(a => renderCard(a, 'Adotado', '#e8f5e9')) : <EmptyList msg="Nenhuma adoção concluída ainda." />}
        </div>
      </div>

    </div>
  );
}