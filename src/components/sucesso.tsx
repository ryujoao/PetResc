import React from "react";
import styles from "../style/denuncie.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mensagem?: string; // <--- ADICIONE ISSO (O ? torna opcional)
};

export default function Sucesso({ isOpen, onClose, mensagem }: Props) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <span className={styles.sairPopUp} onClick={onClose}>
          x
        </span>
        <h2 className={styles.titulo} style={{color: '#28a745'}}>
            {mensagem ? "Sucesso!" : "Formulário enviado"}
        </h2>

        {/* LÓGICA: Se tem mensagem personalizada, mostra ela. Se não, mostra o padrão de Lar Temporário. */}
        {mensagem ? (
            <p className={styles.subtitulo} style={{ marginTop: '1rem', whiteSpace: 'pre-line' }}>
                {mensagem}
            </p>
        ) : (
            <>
                <p className={styles.subtitulo}>
                  Sua inscrição como Lar Temporário foi recebida com sucesso.
                </p>
                <p className={styles.subtitulo}>
                  Em breve, nossa equipe entrará em contato para alinhar os próximos
                  passos e apresentar o animal que poderá ficar sob seus cuidados.
                </p>
            </>
        )}

        <div className={styles.linha}></div>
        <div className={styles.botoes}>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
}