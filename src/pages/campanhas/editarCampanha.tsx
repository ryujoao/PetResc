import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout";
import styles from "./novaCampanha.module.css";
import { BsImage } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";

export default function EditarCampanha() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    dataLimite: "",
    meta: "",
    itens: ""
  });

  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchCampanha() {
      try {
        const resp = await api.get(`/campanha/${id}`);
        const data = resp.data;
        setFormData({
          nome: data.titulo ?? data.nome ?? "",
          descricao: data.descricao ?? data.texto ?? "",
          dataLimite: (data.dataLimite ?? data.data_limite ?? "").slice(0,10),
          meta: String(data.metaFinanceira ?? data.meta_financeira ?? data.meta ?? ""),
          itens: Array.isArray(data.itens_descricao) ? data.itens_descricao.join(", ") : (data.itens_descricao ?? data.itens ?? "").toString().replace(/^\[|\]$/g, "")
        });
        const imageUrl = data.imagemUrl ?? data.imagem ?? data.photoUrl ?? null;
        if (imageUrl) setImagemPreview(imageUrl);
      } catch (err) {
        console.error("Erro ao carregar campanha:", err);
      }
    }
    fetchCampanha();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImagemArquivo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagemPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!token) {
      alert("Sessão inválida. Faça login novamente.");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("titulo", formData.nome);
      payload.append("descricao", formData.descricao);
      payload.append("meta_financeira", formData.meta);
      payload.append("data_limite", formData.dataLimite);
      const itensArray = formData.itens.split(",").map(i => i.trim()).filter(i => i);
      payload.append("itens_descricao", JSON.stringify(itensArray));
      if (imagemArquivo) payload.append("imagem", imagemArquivo);

      await api.put(`/campanha/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShowModal(true);
    } catch (error) {
      console.error("Erro ao atualizar campanha:", error);
      alert("Erro ao atualizar campanha. Veja o console para detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.headerSection}>
            <h1 className={styles.tituloPrincipal}>Editar Campanha</h1>
            <p className={styles.subtitulo}>Atualize os dados da campanha e salve.</p>
          </div>

          <form className={styles.formCampanha} onSubmit={handleSubmit}>
            <div className={styles.colunaEsquerda}>
              <div className={styles.inputGroup}>
                <label>Nome da campanha (Título):</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className={styles.inputField} />
              </div>

              <div className={styles.inputGroup}>
                <label>Data limite (Encerramento):</label>
                <input type="date" name="dataLimite" value={formData.dataLimite} onChange={handleChange} required className={styles.inputField} />
              </div>

              <div className={styles.inputGroup}>
                <label>Meta financeira (R$):</label>
                <input type="number" name="meta" value={formData.meta} onChange={handleChange} required className={styles.inputField} />
              </div>

              <div className={styles.inputGroup}>
                <label>Itens de Impacto (Separe por vírgula):</label>
                <input type="text" name="itens" value={formData.itens} onChange={handleChange} className={styles.inputField} />
                <small className={styles.helperText}>Aparecerá como lista: "Com sua doação você garante..."</small>
              </div>
            </div>

            <div className={styles.colunaDireita}>
              <div className={styles.inputGroup} style={{ flexGrow: 1 }}>
                <label>Descrição detalhada:</label>
                <textarea name="descricao" value={formData.descricao} onChange={handleChange} className={styles.textareaField} required />
              </div>

              <div className={styles.inputGroup}>
                <label>Capa da campanha:</label>
                <label className={styles.uploadBox}>
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                  {imagemPreview ? (
                    <img src={imagemPreview} alt="Preview" className={styles.previewImg} onError={(e)=> (e.currentTarget.src="/cachorroFofo.png")} />
                  ) : (
                    <div className={styles.uploadPlaceholder}>
                      <BsImage size={40} color="#286699" />
                      <p>Clique para selecionar imagem</p>
                    </div>
                  )}
                </label>
              </div>

              <button type="submit" className={styles.botaoCriar} disabled={loading}>
                {loading ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </div>

        <img src="/cachorroFofo.png" alt="Cachorro Fofo" className={styles.dogImage} />

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <FaCheckCircle size={60} color="#28a745" className={styles.iconSuccess} />
              <h2>Atualizado</h2>
              <p>A campanha foi atualizada com sucesso.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button className={styles.btnModal} onClick={() => { setShowModal(false); navigate(-1); }}>
                  Voltar
                </button>
                <button className={styles.btnModal} onClick={() => { setShowModal(false); }}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}