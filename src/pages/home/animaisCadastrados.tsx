import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "./animaisCadastrados.module.css";
import { Link } from "react-router-dom";

interface Animal {
  id: number;
  nome?: string;
  raca?: string;
  idade?: number;
  status: string; // 'Disponível', 'Lar Temporário', 'Pendente', 'Adotado'
  photoURL?: string;
}

export default function AnimaisCadastrados() {
  const [listas, setListas] = useState({
    adocao: [] as Animal[],
    lar: [] as Animal[],
    pedidos: [] as Animal[],
    concluidas: [] as Animal[]
  });
  const [loading, setLoading] = useState(true);

  // Função para normalizar texto (remove acentos e minúsculas)
  const normalizar = (texto: string) => {
    if (!texto) return "";
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    api.get("/animais/gerenciar/lista", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const todos: Animal[] = res.data;
        
        // Arrays temporários
        const adocaoArr: Animal[] = [];
        const larArr: Animal[] = [];
        const pedidosArr: Animal[] = [];
        const concluidasArr: Animal[] = [];

        todos.forEach(animal => {
            const s = normalizar(animal.status);

            // 1. Concluídas
            if (s.includes('adotado') || s.includes('concluido')) {
                concluidasArr.push(animal);
            } 
            // 2. Pedidos Pendentes
            else if (s.includes('pendente') || s.includes('aguardando') || s.includes('solicitado')) {
                pedidosArr.push(animal);
            }
            // 3. Lar Temporário (CORREÇÃO: Verifica se o status diz que está em LT)
            else if (s.includes('lar') || s.includes('temporario')) {
                larArr.push(animal);
            }
            // 4. Adoção (Resto)
            else if (!s || s.includes('disponivel') || s.includes('adocao') || s.includes('ativo')) {
                adocaoArr.push(animal);
            }
        });

        setListas({
            adocao: adocaoArr,
            lar: larArr,
            pedidos: pedidosArr,
            concluidas: concluidasArr
        });
      })
      .catch(err => console.error("Erro ao buscar animais:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{textAlign:'center', padding:'2rem'}}>Carregando animais...</p>;

  // Card do Animal
  const renderCard = (animal: Animal, labelStatus: string, corStatus: string) => (
    <div key={animal.id} className={styles.card}>
        <div className={styles.imgCard}>
            <img
                src={animal.photoURL || "/animais/animalSemNome.png"}
                alt={animal.nome || "Sem Nome"}
                onError={(e) => (e.currentTarget.src = "/animais/animalSemNome.png")}
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

      {/* 2. LAR TEMPORÁRIO (CORRIGIDO) */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Em Lar Temporário ({listas.lar.length})</h2>
        <div className={styles.listaScroll}>
            {listas.lar.length > 0 ? listas.lar.map(a => renderCard(a, 'Em Lar', '#fff3e0')) : <EmptyList msg="Nenhum animal em LT no momento." />}
        </div>
        {/* Agora leva para a gestão geral, apenas mudando o texto para indicar a ação de ver */}
        <Link to="/gerenciar-adocao" className={styles.verMais}>Ver Animais em Lar</Link>
      </div>

      {/* 3. PEDIDOS DE ADOÇÃO */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Pedidos de Adoção ({listas.pedidos.length})</h2>
        <div className={styles.listaScroll}>
            {listas.pedidos.length > 0 ? listas.pedidos.map(a => renderCard(a, 'Pendente', '#fff8e1')) : <EmptyList msg="Nenhuma solicitação pendente." />}
        </div>
        <Link to="/gerenciar-adocao" className={styles.verMais}>Ver Solicitações</Link>
      </div>

      {/* 4. ADOÇÕES CONCLUÍDAS */}
      <div className={styles.containerSection}>
        <h2 className={styles.titulo}>Adoções Concluídas ({listas.concluidas.length})</h2>
        <div className={styles.listaScroll}>
            {listas.concluidas.length > 0 ? listas.concluidas.map(a => renderCard(a, 'Adotado', '#e8f5e9')) : <EmptyList msg="Nenhuma adoção concluída ainda." />}
        </div>
        <div className={styles.verMaisDisable}>Histórico Completo</div>
      </div>

    </div>
  );
}