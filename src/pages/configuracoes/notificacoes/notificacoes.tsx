import React, { useState } from "react";
import { Link } from "react-router-dom";

import tabStyles from "../../perfil/perfil.module.css"; 
import listStyles from "../config.module.css"; 
import { BsCheckCircleFill } from "react-icons/bs";
import { FaPaw } from "react-icons/fa";
import { IoIosArrowForward, IoIosInformationCircle } from "react-icons/io";
import { GoGift } from "react-icons/go";

interface Notificacao {
  id: number;
  icon: React.ReactNode;
  texto: string;
  status: "lida" | "nao_lida";
  path?: string;
}

const todasNotificacoes: Notificacao[] = [
  { 
    id: 1, 
    icon: <FaPaw />, 
    texto: "Bem-vindo ao PetCo!", 
    status: "lida" 
  },
  { 
    id: 2, 
    icon: <BsCheckCircleFill />, 
    texto: "Seu cadastro foi concluído", 
    status: "lida" 
  },
  { 
    id: 3, 
    icon: <IoIosInformationCircle />,
    texto: "Termos de uso e privacidade", 
    status: "nao_lida",
    path: "/config/privacidade"
  },
  { 
    id: 4, 
    icon: <FaPaw />, 
    texto: "Uma nova ONG parceira entrou na plataforma!", 
    status: "nao_lida" 
  },
  {
    id: 5,
    icon: <GoGift />,
    texto: "Nova campanha de doação iniciada!",
    status: "nao_lida"
  },
];

export default function Notificacoes() {
  
  const [activeView, setActiveView] = useState<"nao_lida" | "lida">("nao_lida");

  const notificacoesParaExibir = todasNotificacoes.filter(
    (n) => n.status === activeView
  );

  return (
    <div className={listStyles.configContainer}>
      <h1 className={listStyles.titulo}>Notificações</h1>

      <div className={tabStyles.btnContainer} style={{ marginBottom: '2.5rem' }}>
        <button
          className={activeView === "lida" ? tabStyles.tabUm : tabStyles.tabDois}
          onClick={() => setActiveView("lida")}
        >
          Lidas
        </button>
        <button
          className={activeView === "nao_lida" ? tabStyles.tabUm : tabStyles.tabDois}
          onClick={() => setActiveView("nao_lida")}
        >
          Não lidas
        </button>
      </div>
      
      <section className={listStyles.configSection}>
        {notificacoesParaExibir.length > 0 ? (
          notificacoesParaExibir.map((notificacao) => (
            <Link to={notificacao.path || "#"} className={listStyles.configItem} key={notificacao.id}>
              <div className={listStyles.iconCircle}>{notificacao.icon}</div>
              <span className={listStyles.itemTexto}>{notificacao.texto}</span>
              <IoIosArrowForward className={listStyles.seta} />
            </Link>
          ))
        ) : (
          <p className={listStyles.itemTexto} style={{ textAlign: 'center', marginTop: '2rem' }}>
            Nenhuma notificação por aqui.
          </p>
        )}
      </section>
    </div>
  );
}