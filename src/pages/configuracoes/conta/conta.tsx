import styles from "./conta.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import Modal from "../../../components/modal";

export default function Conta() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const { setUser } = useAuth();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", msg: "", type: "success" as "success" | "error" });

  const showModal = (title: string, msg: string, type: "success" | "error" = "success") => {
    setModalData({ title, msg, type });
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("@AuthData:token");
      if (!token) return;

      try {
        const response = await fetch("https://petresc.onrender.com/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do usuário");
        }

        const data = await response.json();
        setNome(data.nome || "");
        setEmail(data.email || "");
        setTelefone(data.telefone || "");
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("@AuthData:token");
    if (!token) return;

    try {
      const response = await fetch("https://petresc.onrender.com/api/auth/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, telefone }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil");
      }

      const result = await response.json();
      setUser(result.user);
      localStorage.setItem("@AuthData:user", JSON.stringify(result.user));
      
      // SUCESSO
      showModal("Sucesso", "Seus dados foram atualizados!", "success");

    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      showModal("Erro", "Falha ao salvar alterações.", "error");
    }
  };

  return (
    <div className={styles.formContainer}>
      <Modal 
        isOpen={modalOpen} 
        title={modalData.title} 
        message={modalData.msg} 
        type={modalData.type} 
        onClose={() => setModalOpen(false)} 
      />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} readOnly />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.botaoSalvar}>
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}