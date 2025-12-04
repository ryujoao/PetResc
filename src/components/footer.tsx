import style from '../style/footer.module.css';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.containerFooter}>
        <div className={style.rowFooter}>
          
          <div className={style.footerCol}>
            <h4 className={style.animaFooter}>PetResc</h4>
            <p className={style.animaDescricao}>
              PetResc conecta ONGs, protetores e a comunidade para facilitar resgates, adoções e cuidados com animais.
            </p>
          </div>

          <div className={style.footerCol}>
            <h4>Menu</h4>
            <ul>
              <li><a href="/">Início</a></li>
              <li><a href="/central-adocao">Animais para Adoção</a></li>
              <li><a href="/registrar-animal">Registrar Animal</a></li>
              <li><a href="/doar">Doações</a></li>
              <li><a href="/lar-temporario">Seja um Lar Temporário</a></li>
            </ul>
          </div>

          <div className={style.footerCol}>
            <h4>Redes Sociais</h4>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>

          <div className={style.footerCol}>
            <h4>Contato</h4>
            <ul>
              <li><a href="#">E-mail: contato@petresc.org</a></li>
              <li><a href="#">Telefone/WhatsApp: (11) 99999-9999</a></li>
              <li><a href="#">Endereço: Rua Exemplo, 123 - São Paulo/SP</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
