import { Link } from "react-router-dom";
import styles from "../config.module.css"; 
import formStyles from "../conta/conta.module.css"; 

export default function Contato() {
  return (
    <div className={styles.configContainer}>
      
      
      <h1 className={styles.titulo}>Contato</h1>

      <div className={styles.wideSection}>
        
      
        <div className={styles.introContainer}>
         
          <h2 className={styles.subtitulo} style={{paddingLeft: 0}}>Fale conosco!</h2>
          <p className={styles.contatoText}>
            Tem alguma dúvida, sugestão ou problema? 
            <br />
            Verifique nosso <Link to="/config/faq" className={styles.linkDestaque}>FAQ</Link> ou use os canais abaixo:
          </p>
        </div>

       
        <div className={styles.contatoGrid}>
          
          <div className={styles.contatoItem}>
            <h3 className={styles.contatoSubtitle}>1. E-mail</h3>
            <span className={styles.contatoText}>&bull; petresc@email.com</span>
          </div>

          <div className={styles.contatoItem}>
            <h3 className={styles.contatoSubtitle}>3. Chat online</h3>
            <span className={styles.contatoText}>&bull; Disponível: 09:00 - 18:00</span>
          </div>

          <div className={styles.contatoItem}>
            <h3 className={styles.contatoSubtitle}>2. Telefone/WhatsApp</h3>
            <div className={styles.contatoItem}> 
              <span className={styles.contatoText}>&bull; (11) 90000 - 0009</span>
              <span className={styles.contatoText}>&bull; 4009 - 9004</span>
            </div>
          </div>

          <div className={styles.contatoItem}>
            <h3 className={styles.contatoSubtitle}>4. Redes sociais</h3>
            <div className={styles.contatoItem}>
              <span className={styles.contatoText}>&bull; Instagram: @petco</span>
              <span className={styles.contatoText}>&bull; Facebook: /petco</span>
            </div>
          </div>

        </div>

        
        <div className={styles.formContato}>
           
           <h2 className={styles.subtitulo}>
             5. Formulário de contato
           </h2>

          
           <form className={formStyles.form} onSubmit={(e) => e.preventDefault()}>
            
            <div className={formStyles.inputGroup}>
              <label htmlFor="nome">Nome</label>
              <input 
                id="nome" 
                type="text" 
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className={formStyles.inputGroup}>
              <label htmlFor="email">E-mail</label>
              <input 
                id="email" 
                type="email" 
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div className={formStyles.inputGroup}>
              <label htmlFor="mensagem">Mensagem</label>
              <textarea 
                id="mensagem" 
                placeholder="Escreva sua mensagem aqui..."
              ></textarea>
            </div>

            <div className={formStyles.buttonContainer}>
              <button type="submit" className={formStyles.botaoSalvar}>
                Finalizar
              </button>
            </div>

           </form>
        </div>

      </div>
    </div>
  );
}