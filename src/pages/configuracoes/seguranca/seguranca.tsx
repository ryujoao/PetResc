import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../config.module.css"; 

// Ícones
import { IoIosArrowForward } from "react-icons/io";
import { MdKey } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { BsTrashFill } from "react-icons/bs";

import ExcluirConta from "./excluirConta";

export default function Seguranca() {
  const [showExcluir, setShowExcluir] = useState(false);

  const handleConfirmExcluir = () => {
    console.log("Conta excluída!");
    setShowExcluir(false);
    // Adicione aqui a lógica de logout ou redirecionamento
  };

  return (
    <div className={styles.configContainer}>
      <h1 className={styles.titulo}>Segurança</h1>

      <section className={styles.configSection}>
      
        
        
        <Link to="/config/alterar-senha" className={styles.configItem}>
          <div className={styles.iconCircle}>
            <MdKey />
          </div>
          <span className={styles.itemTexto}>Alterar senha</span>
          <IoIosArrowForward className={styles.seta} />
        </Link>

        
        <Link to="/config/historico" className={styles.configItem}>
          <div className={styles.iconCircle}>
            <FaHistory />
          </div>
          <span className={styles.itemTexto}>Histórico</span>
          <IoIosArrowForward className={styles.seta} />
        </Link>

        
        <button 
          className={styles.configItem} 
          onClick={() => setShowExcluir(true)}
        >
          <div 
            className={styles.iconCircle} 
            style={{ backgroundColor: '#ffebee', color: '#c62828' }}
          >
            <BsTrashFill />
          </div>
          
          <span className={styles.itemTexto} style={{ color: '#c62828' }}>
            Excluir Conta
          </span>
          
          <IoIosArrowForward className={styles.seta} />
        </button>
      </section>

      <ExcluirConta 
        isOpen={showExcluir} 
        onClose={() => setShowExcluir(false)} 
        onConfirm={handleConfirmExcluir} 
      />
    </div>
  );
}