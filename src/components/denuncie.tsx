import styles from "../style/denuncie.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};



export default function Denuncie({ isOpen, onClose }: Props) {
  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  //  Fecha o modal se o clique for no fundo (overlay)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <span className={styles.sairPopUp} onClick={onClose}>×</span>
        <h2 className={styles.titulo}>Denuncie!</h2>
        <p className={styles.subtitulo}>Faça uma Denúncia</p>
        <ul>
          <li className={styles.vermelhoPopUp}><strong>Polícia Militar:</strong> 190</li>
          <li className={styles.vermelhoPopUp}><strong>Disque Denúncia:</strong> (181 ou números estaduais)</li>
          <li className={styles.vermelhoPopUp}><strong>IBAMA:</strong> 0800 61 8080</li>
        </ul>
        <p className={styles.divisoria}>ou</p>
        <p className={styles.divisoria}>Procure a Delegacia de Polícia mais próxima para fazer um Boletim de Ocorrência (B.O).</p>
      </div>
    </div>
  );
}
