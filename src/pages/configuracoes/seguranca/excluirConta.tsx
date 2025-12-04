import styles from '../ajuda/logout.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ExcluirConta({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.titulo}>Excluir Conta?</h2>
        <p className={styles.subtitulo}>
          Recebemos sua solicitação de exclusão de conta. Antes de prosseguir, precisamos confirmar se realmente deseja continuar com este processo.
        </p>

        <p className={styles.subtitulo}><strong>Importante: a exclusão é definitiva e resultará na perda de todos os dados associados ao seu cadastro, incluindo histórico, preferências e informações salvas e qualquer solicitação de adoção e cadastro de lar temporário </strong></p>
        
        <div className={styles.botoesContainer}>
          <button className={styles.btnCancelar} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.btnSair} onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}