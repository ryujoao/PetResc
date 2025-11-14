import { Link, Outlet } from "react-router-dom"; // Importe o Outlet!
// Recomendo criar um CSS novo, mas pode usar o de perfil se as classes baterem
import styles from "../perfil/perfil.module.css";
import { useState, useEffect } from "react";
import { IconAvatar, IconConfig } from "../../components/icons";
import Layout from "../../components/layout";

interface UserData {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  role: string;
}

export default function ConfigLayout() {

  const [usuario, setUsuario] = useState<UserData | null>(null);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("@AuthData:token");
      if (!token) {
        console.error("Usuário não autenticado");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do usuário");
        }
        const data: UserData = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Layout>

      <div className={styles.perfilContainer}>
        <Link to="/config" className={styles.configIcon}>
          <IconConfig />
        </Link>

        <div className={styles.banner}></div>

        <div className={styles.avatar}>
          <label htmlFor="uploadImagem" className={styles.avatarLabel}>
            {imagemSelecionada ? (
              <img
                src={imagemSelecionada}
                alt="Avatar"
                className={styles.avatarImage}
              />
            ) : (
              <IconAvatar className={styles.avatarIcon} />
            )}
          </label>
        </div>

        <p className={styles.username}>{usuario?.nome || "Username"}</p>

        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>

      </Layout>
    </>
  );
}
