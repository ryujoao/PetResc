import { Link } from "react-router-dom";
import style from "../style/navbar.module.css";

export default function Nav() {

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
          <li><a href="/cadastro">Adotar</a></li>
          <li><a href="/cadastro">Lar Temporário</a></li>
          <li><a href="/cadastro">Doar</a></li>
          <li><a href="/cadastro">Denuncie</a></li>
          <li><a href="/cadastro">Registrar Animal</a></li>

        </ul>

        <ul className={style.botoesCadastro}>
          <button className={style.cadastroONG}>Cadastre sua ONG</button>
          <Link to={"/cadastro"} style={{ textDecoration: 'none' }} >
          <button className={style.cadastro}>Cadastre-se</button>
          </Link>
        </ul>
      </div>
   </>
  );
}
