import React from 'react';
import styles from "./animaisCadastrados.module.css";
import { Link } from "react-router-dom";

export default function AnimaisCadastrados() {
  return (
    <div className={styles.containerPrincipal}>
      {/* Seção de Pedidos de Adoção */}
      <section className={styles.secaoAnimais}>
        <h2>Pedidos de Adoção</h2>
        <div className={styles.listaCards}>
          <div className={styles.card}>
            <img src="/animais/placeholder.jpg" alt="Animal" className={styles.cardImagem} />
            <div className={styles.cardInfo}>
              <h3>Animal sem nome</h3>
              <p>Sem raça definida</p>
              <span className={styles.status}>Status: Em análise</span>
              <Link to="/detalhes-pedido" className={styles.verMais}>
                Ver mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Animais em Lares Temporários */}
      <section className={styles.secaoAnimais}>
        <h2>Animais em Lares Temporários</h2>
        <div className={styles.listaCards}>
          <div className={styles.card}>
            <img src="/animais/placeholder.jpg" alt="Animal" className={styles.cardImagem} />
            <div className={styles.cardInfo}>
              <h3>Animal sem nome</h3>
              <p>Sem raça definida</p>
              <span className={styles.status}>Status: Lar temporário</span>
              <Link to="/detalhes-animal" className={styles.verMais}>
                Ver mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Animais Registrados Recentemente */}
      <section className={styles.secaoAnimais}>
        <h2>Animais registrados recentemente</h2>
        <div className={styles.listaCards}>
          <div className={styles.card}>
            <img src="/animais/placeholder.jpg" alt="Animal" className={styles.cardImagem} />
            <div className={styles.cardInfo}>
              <h3>Animal sem nome</h3>
              <p>Sem raça definida</p>
              <span className={styles.status}>Status: Disponível</span>
              <Link to="/detalhes-animal" className={styles.verMais}>
                Ver mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Adoções Concluídas */}
      <section className={styles.secaoAnimais}>
        <h2>Adoções concluídas</h2>
        <div className={styles.listaCards}>
          <div className={styles.card}>
            <img src="/animais/placeholder.jpg" alt="Animal" className={styles.cardImagem} />
            <div className={styles.cardInfo}>
              <h3>Animal sem nome</h3>
              <p>Sem raça definida</p>
              <span className={styles.status}>Status: Adotado</span>
              <Link to="/detalhes-adocao" className={styles.verMais}>
                Ver mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Campanhas */}
      <section className={styles.secaoCampanhas}>
        <h2>Minhas campanhas</h2>
        <p>
          Crie novas campanhas para arrecadar doações e ajuda a transformar a vida
          de mais animais.
        </p>
        <div className={styles.botoesCampanha}>
          <Link to="/nova-campanha" className={styles.botaoPrimario}>
            Nova campanha
          </Link>
          <Link to="/campanhas-anteriores" className={styles.botaoSecundario}>
            Campanhas anteriores
          </Link>
        </div>
      </section>
    </div>
  );
}