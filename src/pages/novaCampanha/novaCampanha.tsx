import React, { useState } from "react";
import styles from "./novaCampanha.module.css";
import Layout from "../../components/layout";
import { BsImage } from "react-icons/bs";
import { useAuth } from "../../auth/AuthContext"; 

export default function NovaCampanha() {
  // Agora o TypeScript reconhece 'token' vindo do useAuth
  const { token } = useAuth(); 

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    dataLimite: "",
    meta: "",
    itens: "", 
  });

  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagemArquivo(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagemPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificação se usuário está logado
    if (!token) {
        alert("Sessão expirada ou não iniciada. Por favor, faça login novamente.");
        return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("titulo", formData.nome);
      data.append("descricao", formData.descricao);
      data.append("meta_financeira", formData.meta);
      data.append("data_limite", formData.dataLimite);
      
      const itensArray = formData.itens.split(',').map(item => item.trim()).filter(i => i);
      data.append("itens_descricao", JSON.stringify(itensArray));

      if (imagemArquivo) {
        data.append("imagem", imagemArquivo);
      }

      const response = await fetch("https://petresc.onrender.com/api/campanhas", {
        method: "POST",
        headers: {
            // Header de Autorização
            "Authorization": `Bearer ${token}` 
        },
        body: data,
      });

      if (response.ok) {
        alert("Campanha criada com sucesso!");
        setFormData({ nome: "", descricao: "", dataLimite: "", meta: "", itens: "" });
        setImagemPreview(null);
        setImagemArquivo(null);
      } else {
        const errData = await response.json();
        alert(`Erro: ${errData.message || "Falha ao criar campanha"}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        
        <div className={styles.contentWrapper}>
          
          <div className={styles.headerSection}>
            <h1 className={styles.tituloPrincipal}>Nova Campanha</h1>
            <p className={styles.subtitulo}>Preencha os dados que aparecerão na página de doação.</p>
          </div>

          <form className={styles.formCampanha} onSubmit={handleSubmit}>
            
            {/* Coluna Esquerda */}
            <div className={styles.colunaEsquerda}>
              <div className={styles.inputGroup}>
                <label>Nome da campanha (Título):</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Ex. Resgate de animais abandonados"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Data limite (Encerramento):</label>
                <input
                  type="date"
                  name="dataLimite"
                  value={formData.dataLimite}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Meta financeira (R$):</label>
                <input
                  type="number"
                  name="meta"
                  placeholder="Ex. 20000"
                  value={formData.meta}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Itens de Impacto (Separe por vírgula):</label>
                <input
                  type="text"
                  name="itens"
                  placeholder="Ex: Ração, Vacinas, Castração"
                  value={formData.itens}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                <small className={styles.helperText}>
                  Aparecerá como lista: "Com sua doação você garante..."
                </small>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className={styles.colunaDireita}>
              <div className={styles.inputGroup} style={{ flexGrow: 1 }}>
                <label>Descrição detalhada:</label>
                <textarea
                  name="descricao"
                  placeholder="Conte a história e o objetivo da campanha."
                  value={formData.descricao}
                  onChange={handleChange}
                  className={styles.textareaField}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Capa da campanha:</label>
                <label className={styles.uploadBox}>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  {imagemPreview ? (
                    <img src={imagemPreview} alt="Preview" className={styles.previewImg} />
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <BsImage size={40} color="#286699" />
                      <p>Clique para selecionar imagem</p>
                    </div>
                  )}
                </label>
              </div>
              
              <button 
                type="submit" 
                className={styles.botaoCriar} 
                disabled={loading}
              >
                {loading ? "Enviando..." : "Publicar Campanha"}
              </button>
            </div>
          </form>

        </div> 

        <img src="/cachorroFofo.png" alt="Cachorro Fofo" className={styles.dogImage} />

      </div>
    </Layout>
  );
}