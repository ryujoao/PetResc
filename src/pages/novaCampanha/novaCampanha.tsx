import React, { useState } from "react";
import styles from "./novaCampanha.module.css";
import Layout from "../../components/layout";
import { BsImage } from "react-icons/bs"; // Ícone para o upload

export default function NovaCampanha() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    dataLimite: "",
    meta: "",
  });

  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados da Campanha:", formData);
    alert("Campanha criada com sucesso! (Simulação)");
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          
          {/* Títulos */}
          <div className={styles.headerSection}>
            <h1 className={styles.tituloPrincipal}>
              Veja a Diferença Que Você Pode Fazer
            </h1>
            <p className={styles.subtitulo}>
              Preencha os dados abaixo para criar uma nova campanha
            </p>
          </div>

          {/* Formulário */}
          <form className={styles.formCampanha} onSubmit={handleSubmit}>
            
            {/* Coluna Esquerda */}
            <div className={styles.colunaEsquerda}>
              <div className={styles.inputGroup}>
                <label>Nome da campanha:</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Ex. Resgate de animais abandonados"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Data limite:</label>
                <input
                  type="text" // Pode mudar para type="date" se preferir o calendário nativo
                  name="dataLimite"
                  placeholder="Ex. Duração de 5 a 7 meses"
                  value={formData.dataLimite}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Meta financeira:</label>
                <input
                  type="text"
                  name="meta"
                  placeholder="Ex. 20.000,00"
                  value={formData.meta}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Coluna Direita */}
            <div className={styles.colunaDireita}>
              <div className={styles.inputGroup} style={{ flexGrow: 1 }}>
                <label>Descrição da campanha:</label>
                <textarea
                  name="descricao"
                  placeholder="Ex. Qual o propósito da campanha"
                  value={formData.descricao}
                  onChange={handleChange}
                  className={styles.textareaDescricao}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Capa/Imagem da campanha:</label>
                <label className={styles.uploadBox}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    style={{ display: 'none' }} 
                  />
                  
                  {imagemPreview ? (
                    <img src={imagemPreview} alt="Preview" className={styles.previewImg} />
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <BsImage size={40} color="#8baec7" />
                      <p>Arraste uma imagem nesta área,</p>
                      <p>ou clique para selecionar uma imagem.</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Botão flutuante ou fixo se necessário, ou envio automático */}
            {/* Para este layout específico, o botão de envio não está explícito na imagem, 
                mas você pode adicionar um botão "Criar Campanha" aqui se desejar. */}
          </form>
        </div>

        {/* Imagem do Cachorro (Decorativa) */}
        {/* Certifique-se de colocar a imagem 'image 62.jpg' na pasta public/assets ou similar */}
        <img 
          src="../../../public/cachorroFofo" // CAMINHO PARA A IMAGEM DO CACHORRO QUE VOCÊ ENVIOU
          alt="Cachorro Fofo" 
          className={styles.dogImage} 
        />
        
        {/* Patinhas de fundo (Opcional - decorativo via CSS ou img) */}
        <div className={styles.backgroundPaws}></div>
      </div>
    </Layout>
  );
}