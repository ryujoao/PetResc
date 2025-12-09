import styles from '../style/modal.module.css';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: 'success' | 'error';
}

export default function Modal({ isOpen, title, message, onClose, type = 'success' }: ModalProps) {
  if (!isOpen) return null;

  // Define a cor do título: Azul (#2D68A6) para sucesso, Vermelho para erro
  const titleColor = type === 'error' ? '#dc3545' : '#2D68A6';

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 style={{ color: titleColor }}>
          {title}
        </h2>
        <p className={styles.message}>{message}</p>
        
        <button 
            onClick={onClose} 
            // Aplica a classe base + a classe específica de cor
            className={`${styles.btnModal} ${type === 'error' ? styles.btnError : styles.btnSuccess}`}
        >
          OK
        </button>
      </div>
    </div>
  );
}