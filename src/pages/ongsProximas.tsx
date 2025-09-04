import styles from "../style/ongsProximas.module.css";

export default function OngsProximas() {
  return (
    <div className={styles.pageOngsProximas}>
      <section className={styles.listaOngs}>
        <h2 className={styles.titulo}>ONGs próximas a você</h2>

        <div className={styles.card}>
          <img src="/ong1.png" alt="ONG 1" />
          <div>
            <h3>ONG 1</h3>
            <p>Rua do Saber, 223 - Vila Santo Antônio, Cotia - SP</p>
            <p>06708-281</p>
          </div>
        </div>

        <div className={styles.card}>
          <img src="/ong2.png" alt="ONG 2" />
          <div>
            <h3>ONG 2</h3>
            <p>Avenida da Inovação, 1420 - Vila Santo Antônio, Cotia - SP</p>
            <p>06708-262</p>
          </div>
        </div>

        <div className={styles.card}>
          <img src="/ong3.png" alt="ONG 3" />
          <div>
            <h3>ONG 3</h3>
            <p>Travessa dos Estudos, 48 - Vila Santo Antônio, Cotia - SP</p>
            <p>06708-283</p>
          </div>
        </div>
      </section>

      <section className={styles.mapa}>
        {/* Aqui você pode integrar um mapa real depois */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18..."
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
}
