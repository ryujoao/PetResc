import React from 'react';
import styles from '../style/notificacoes.module.css';

export default function Notificacoes() {
  const notificacoesExemplo = [
    { id: 1, message: 'Seu pet "Bolinha" foi cadastrado com sucesso!', time: 'Agora' },
    { id: 2, message: 'Lembrete: vacina da raiva para "Faisca" amanhã.', time: 'Ontem' },
    { id: 3, message: 'Novo agendamento de banho e tosa confirmado.', time: '2 dias atrás' },
  ];

  return (
    <div className={styles.containerNotificacoes}>
      <div className={styles.cabecalho}>
        <h3 className={styles.tituloCabecalho}>Notificações</h3>
      </div>
      <ul className={styles.lista}>
        {notificacoesExemplo.length > 0 ? (
          notificacoesExemplo.map((notificacao) => (
            <li key={notificacao.id} className={styles.itemLista}>
              <p className={styles.mensagem}>{notificacao.message}</p>
              <p className={styles.horario}>{notificacao.time}</p>
            </li>
          ))
        ) : (
          <li className={styles.semNotificacoes}>
            Nenhuma notificação nova.
          </li>
        )}
      </ul>
    </div>
  );
}