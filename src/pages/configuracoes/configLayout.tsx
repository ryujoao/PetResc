import { Link, Outlet } from "react-router-dom"; // Importe o Outlet!
import Footer from "../../components/footer";
import Nav from "../../components/navbar";
// Recomendo criar um CSS novo, mas pode usar o de perfil se as classes baterem
import styles from "../perfil/perfil.module.css";
import { useLayoutEffect, useRef, useState, useEffect } from "react";

interface UserData {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  role: string;
}

export default function ConfigLayout() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setTimeout(() => {
      const pageEl = pageRef.current;
      if (!pageEl) return;
      const topBar = document.querySelector(".topBar") as HTMLElement | null;
      const navBar = document.querySelector(".navbar") as HTMLElement | null;
      const topHeight = topBar?.offsetHeight ?? 0;
      const navHeight = navBar?.offsetHeight ?? 0;
      const totalHeight = topHeight + navHeight;
      pageEl.style.paddingTop = `${totalHeight}px`;
      pageEl.style.minHeight = `calc(100vh - ${totalHeight}px)`;
    }, 0);
  }, []);

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
      <Nav />

      <div className={styles.perfilContainer} ref={pageRef}>
        <Link to="/config" className={styles.configIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
          </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                className={styles.avatarIcon}
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            )}
          </label>
        </div>

        <p className={styles.username}>{usuario?.nome || "Username"}</p>

        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
}
