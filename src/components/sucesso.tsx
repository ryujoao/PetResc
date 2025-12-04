import styles from "../style/denuncie.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sucesso({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <span className={styles.sairPopUp} onClick={onClose}>
          ×
        </span>
        <h2 className={styles.titulo}>Formulário enviado</h2>
        <p className={styles.subtitulo}>
          Sua inscrição como Lar Temporário foi recebida com sucesso.
        </p>
        <p className={styles.subtitulo}>
          Em breve, nossa equipe entrará em contato para alinhar os próximos
          passos e apresentar o animal que poderá ficar sob seus cuidados.
        </p>
        <div className={styles.linha}></div>
        <div className={styles.botoes}>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}