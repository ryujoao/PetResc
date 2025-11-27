import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Layout from "../../components/layout";
import styles from "./perfilAnimal.module.css";
import { useAuth } from "../../auth/AuthContext";
import api from '../../services/api';

// --- TIPAGEM ---
interface FichaTecnica {
  vacinado: boolean;
  vermifugado: boolean;
  castrado: boolean;
  temperamento: string;
  saude: string;
  observacoes: string;
}

interface AccountInfo {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  ong?: {
    cidade: string;
    estado: string;
  }
}

interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca: string | null;
  idade: number | null;
  status: string;
  porte: string | null;
  sexo: string | null;
  descricao: string | null;
  photoURL: string | null;
  corPredominante: string | null;
  createdAt: string;
  accountId: number;
  account: AccountInfo; 
  ficha?: FichaTecnica; 
}

export default function PerfilAnimal() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnimal() {
      if (!id || id === "undefined") return;

      try {
        const response = await api.get(`/animais/${id}`);
        setAnimal(response.data);
      } catch (error) {
        console.error("Erro ao buscar animal:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimal();
  }, [id]);

  // --- QUERO ADOTAR (DISPONÍVEL) ---
  const handleQueroAdotar = () => {
    // 1. Verifica se está logado
    if (!user) {
      // Salva a intenção para redirecionar depois do login (opcional)
      alert("Você precisa fazer login para preencher o formulário de adoção!");
      navigate("/login");
      return;
    }

    // 2. Verifica se é dono do animal
    if (user.id === animal?.accountId) {
      alert("Você não pode adotar seu próprio animal. Edite as informações no painel de controle.");
      return;
    }

    // 3. REDIRECIONA PARA O FORMULÁRIO COM O ID DO ANIMAL
    // Agora o formulário vai abrir sabendo quem é o animal e preenchendo os dados do usuário
    navigate(`/formulario-adotar/${animal?.id}`);
  };

  // --- ENTRAR EM CONTATO (ENCONTRADO) ---
  const handleEntrarEmContato = () => {
    if (!animal?.account.telefone) {
      alert("O responsável não cadastrou telefone para contato.");
      return;
    }

    const telefone = animal.account.telefone.replace(/\D/g, "");
    const mensagem = `Olá! Vi o animal "${animal.nome}" listado como ENCONTRADO no PetResc. Acredito ser meu. Podemos falar?`;

    window.open(
      `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );
  };

  // --- LOADING ---
  if (loading) {
     return (
      <Layout>
        <div style={{ textAlign: "center", padding: "4rem", color: "#666" }}>
          <h2>Carregando perfil do pet...</h2>
        </div>
      </Layout>
    );
  }

  // --- ANIMAL NÃO EXISTE ---
  if (!animal) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <h1 style={{ color: "#2b6b99" }}>Animal não encontrado</h1>
          <button
            onClick={() => navigate("/central-adocao")}
            style={{ marginTop: 20, padding: 10, cursor: "pointer" }}
          >
            Voltar para o Feed
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.profileWrapper}>
          
          {/* FOTO */}
          <div className={styles.imagemContainer}>
            <div className={styles.imagem}>
              <img
                src={
                  animal.photoURL ||
                  "https://placehold.co/400x400/f8f8f8/ccc?text=Sem+Foto"
                }
                alt={animal.nome}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src =
                    "https://placehold.co/400x400/f8f8f8/ccc?text=Erro+Imagem";
                }}
              />
            </div>
          </div>

          {/* INFORMAÇÕES PRINCIPAIS */}
          <div className={styles.infoContainer}>
            <h1 className={styles.nome}>{animal.nome}</h1>

            <p className={styles.status}>
              {animal.status === "DISPONIVEL" ? "Para Adoção" : "Encontrado"}
            </p>

            <section className={styles.dados}>
              <p className={styles.infoLine}>
                <strong>
                  {animal.sexo === "MACHO" ? "Macho" : "Fêmea"}
                </strong>{" "}
                • {animal.idade ? `${animal.idade} anos` : "Idade desconhecida"}{" "}
                • {animal.raca || "SRD"}
              </p>

              <p className={styles.infoLine}>
                Responsável: <strong>{animal.account.nome}</strong>
                {animal.account.ong && (
                  <span>
                    {" "}
                    ({animal.account.ong.cidade} -{" "}
                    {animal.account.ong.estado})
                  </span>
                )}
              </p>
            </section>

            {/* BOTÃO PRINCIPAL — ATUALIZADO */}
            {animal.status === "DISPONIVEL" ? (
              <button
                className={styles.botaoAdotar}
                onClick={handleQueroAdotar}
              >
                QUERO ADOTAR {animal.nome.toUpperCase()}!
              </button>
            ) : (
              <button
                className={styles.botaoAdotar}
                style={{ background: "#f6a21a" }}
                onClick={handleEntrarEmContato}
              >
                ENTRAR EM CONTATO
              </button>
            )}
          </div>

          {/* DESCRIÇÃO */}
          <div className={styles.comentarioContainer}>
            <h2>Sobre o {animal.nome}</h2>
            <p>
              {animal.descricao ||
                "O responsável não forneceu uma descrição detalhada."}
            </p>

            {animal.ficha?.observacoes && (
              <p style={{ marginTop: 10 }}>
                <strong>Obs:</strong> {animal.ficha.observacoes}
              </p>
            )}
          </div>
        </div>

        <hr className={styles.divider} />

        {/* CARACTERÍSTICAS */}
        <div className={styles.caracteristicasGrid}>
          
          <div className={styles.caracteristicaColuna}>
            <h3>Características</h3>
            <ul>
              <li>
                <strong>Espécie:</strong> {animal.especie}
              </li>
              <li>
                <strong>Raça:</strong> {animal.raca || "SRD"}
              </li>
              <li>
                <strong>Porte:</strong> {animal.porte}
              </li>
              <li>
                <strong>Cor:</strong>{" "}
                {animal.corPredominante || "Não informada"}
              </li>
            </ul>
          </div>

          <div className={styles.caracteristicaColuna}>
            <h3>Cuidados Veterinários</h3>
            <ul className={styles.tagsList}>
              {animal.ficha ? (
                <>
                  <li>
                    {animal.ficha.vacinado ? "✅ Vacinado" : "❌ Não Vacinado"}
                  </li>
                  <li>
                    {animal.ficha.castrado ? "✅ Castrado" : "❌ Não Castrado"}
                  </li>
                  <li>
                    {animal.ficha.vermifugado
                      ? "✅ Vermifugado"
                      : "❌ Não Vermifugado"}
                  </li>
                </>
              ) : (
                <li>Informações não cadastradas</li>
              )}
            </ul>
          </div>

          <div className={styles.caracteristicaColuna}>
            <h3>Temperamento</h3>
            <ul className={styles.tagsList}>
              <li>{animal.ficha?.temperamento || "Não informado"}</li>
            </ul>
          </div>

          <div className={styles.caracteristicaColuna}>
            <h3>Saúde Geral</h3>
            <ul className={styles.tagsList}>
              <li>{animal.ficha?.saude || "Sem histórico médico detalhado"}</li>
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}