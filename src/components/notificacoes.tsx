import React from 'react';

export default function Notificacoes() {
  const notifications = [
    { id: 1, message: 'Seu pet "Bolinha" foi cadastrado com sucesso!', time: 'Agora' },
    { id: 2, message: 'Lembrete: vacina da raiva para "Faisca" amanhã.', time: 'Ontem' },
    { id: 3, message: 'Novo agendamento de banho e tosa confirmado.', time: '2 dias atrás' },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%', 
        right: '0', // ALTERADO: de '20px' para '0' para alinhar à direita do ícone
        marginTop: '15px', // Um pouco mais de espaço para não colar no ícone
        width: '320px',
        zIndex: 50,
      }}
      className="bg-white rounded-lg shadow-xl border border-gray-200"
    >
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-800">Notificações</h3>
      </div>
      <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {/* ... (o resto do código continua igual) ... */}
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification.id} className="p-4 hover:bg-gray-50 cursor-pointer">
              <p className="text-sm text-gray-700">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
            </li>
          ))
        ) : (
          <li className="p-4 text-center text-gray-500">
            Nenhuma notificação nova.
          </li>
        )}
      </ul>
    </div>
  );
}