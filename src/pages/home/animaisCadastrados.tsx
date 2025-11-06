import styles from "./animaisCadastrados.module.css";

export default function AnimaisCadastrados() {
  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerMeusAnimais}>
        <h2 className={styles.titulo}>Pedidos de adoção</h2>
        <h2 className={styles.titulo}>Pedidos de adoção pendentes: 5</h2>

        <div className={styles.card}>
          <div className={styles.imgCard}>
            <img src="../../../public/animais/animalSemNome.png" alt="Animal Sem Nome" />
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardNome}>
              <h1>Não possui nome</h1>
              <p className={styles.descricaoCard}>Sem raça definida, AD.</p>
              <p className={styles.descricaoCard}>(SRD)</p>
            </div>
          </div>

          <div className={styles.statusSuperior}>Animal cadastrado</div>
          <div className={styles.statusInferior}>Status: Em tratamento</div>
        </div>

        <div className={styles.card}>
          <div className={styles.imgCard}>
            <img src="../../../public/animais/amendoim.png" alt="Amendoim" />
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardNome}>
              <h1>Amendoim</h1>
            </div>

            <p className={styles.descricaoCard}>Sem raça definida, FI.</p>
            <p className={styles.descricaoCard}>(SRD)</p>

            <div className={styles.statusSuperior}>Lar temporário</div>
            <div className={styles.statusInferior}>Status: Disponível</div>
          </div>
        </div>
        <button className={styles.verMais}>
          <a href="/perfilOng">Ver Mais</a>
        </button>
      </div>

      <div className={styles.adocaoProcesso}>
        <h2 className={styles.titulo}>Animais em Lares Temporários</h2>
        <h2 className={styles.titulo}>Animais em lares temporários ativos: 6</h2>

        <div className={styles.card}>
          <div className={styles.imgCard}>
            <img src="../../../public/animais/estrela.png" alt="Estrela" />
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardNome}>
              <h1>Estrela</h1>
            </div>

            <p className={styles.descricaoCard}>Sem raça definida, AD.</p>
            <p className={styles.descricaoCard}>(SRD)</p>

            <div className={styles.statusInferior}>
              Status: Documentação em Análise
            </div>
          </div>
        </div>
        <button className={styles.verMais}>
          <a href="/perfilOng">Ver Mais</a>
        </button>
      </div>

      <div className={styles.adocaoProcesso}>
        <h2 className={styles.titulo}>Animais registrados recentemente</h2>
        <h2 className={styles.titulo}> Animais aguardando vaga: 8</h2>

        <div className={styles.card}>
          <div className={styles.imgCard}>
            <img src="../../../public/animais/estrela.png" alt="Estrela" />
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardNome}>
              <h1>Estrela</h1>
            </div>

            <p className={styles.descricaoCard}>Sem raça definida, AD.</p>
            <p className={styles.descricaoCard}>(SRD)</p>

            <div className={styles.statusInferior}>
              Status: Documentação em Análise
            </div>
          </div>
        </div>
        <button className={styles.verMais}>
          <a href="/perfilOng">Ver Mais</a>
        </button>
      </div>

      <div className={styles.adocaoProcesso}>
        <h2 className={styles.titulo}>Adoções concluídas</h2>
        <h2 className={styles.titulo}> Adoções concluídas este mês: 7</h2>

        <div className={styles.card}>
          <div className={styles.imgCard}>
            <img src="../../../public/animais/estrela.png" alt="Estrela" />
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardNome}>
              <h1>Estrela</h1>
            </div>

            <p className={styles.descricaoCard}>Sem raça definida, AD.</p>
            <p className={styles.descricaoCard}>(SRD)</p>

            <div className={styles.statusInferior}>
              Status: Documentação em Análise
            </div>
          </div>
        </div>
        <button className={styles.verMais}>
          <a href="/perfilOng">Ver Mais</a>
        </button>
      </div>
    </div>
  );
}
