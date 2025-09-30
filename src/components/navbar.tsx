import { Link } from "react-router-dom";
import styles from "../style/navbar.module.css";
// import SearchBar from "../components/searchBar";
 
export default function Nav() {
  // function handleSearch(term: string) {
  //   console.log("Buscando por:", term);
  // }
 
  return (
    <>
      <div className={styles.topBar}></div>
 
      <div className={styles.navbar}>
        <div className={styles.navLogo}>
          <Link to="/home">
            <img
              src="/logo.png"
              alt="Logo"
              style={{ maxWidth: "150px", height: "98px" }}
            />
          </Link>
        </div>
 
        <ul className={styles.navCategorias}>
          <li>
            <a href="/adotar">Adotar</a>
          </li>
          <li>
            <a href="/larTemporario">Lar Temporário</a>
          </li>
          <li>
            <a href="/doar">Doar</a>
          </li>
          <li>
            <a href="/denuncie">Denuncie</a>
          </li>
          <li>
            <a href="/registrarAnimal">Registrar Animal</a>
          </li>
        </ul>
 
        <ul className={styles.perfilUsuario}>
          <Link to="/perfil">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
            color="black"
            style={{ cursor: "pointer" }}
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
          </Link>
          <span>@username</span>
        </ul>
      </div>
    </>
  );
}