import React from 'react';
import styles from '../ajuda/logout.module.css'

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function Logout({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.titulo}>Deseja sair?</h2>
        <p className={styles.subtitulo}>Você precisará fazer login novamente para acessar sua conta.</p>
        
        <div className={styles.botoesContainer}>
          <button className={styles.btnCancelar} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.btnSair} onClick={onConfirm}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}