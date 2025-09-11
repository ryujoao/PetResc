import { Link } from "react-router-dom";
import style from "../style/navbar.module.css";
import SearchBar from "../components/searchBar";

export default function Nav() {
  function handleSearch(term: string) {
    console.log("Buscando por:", term);
  }

  return (
    <>
      <div className={style.topBar}></div>

      <div className={style.navbar}>
        <div className={style.navLogo}>
          <Link to="/">
            <img src="/logo.png" alt="Logo" style={{ maxWidth: '150px', height: '98px' }} />
          </Link>
        </div>

        <ul className={style.navCategorias}>
          <li><a href="/adotar">Adotar</a></li>
          <li><a href="/voluntarios">Voluntários</a></li>
          <li><a href="/doar">Doar</a></li>
          <li><a href="/denuncie">Denuncie</a></li>
          <li><a href="">Registra Animal</a></li>

        </ul>

        <ul className={style.botaoCadastro}>
          <button className={style.cadastroONG}>Cadastre sua ONG</button>
          <Link to={"/cadastro"} style={{ textDecoration: 'none' }} >
          <button className={style.cadastro}>Cadastre-se</button>
          </Link>
        </ul>
      </div>
   </>
  );
}
