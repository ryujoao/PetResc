import React, { useState } from "react";
import styles from "./fomularioLarTemporario.module.css";
import Nav from "../../components/navbar";

export default function FormularioLarTemporario() {
  return (
    <>
      <Nav />
      <div className={styles.pageFormularioLarTemporario}>
        <h1 className={styles.titulo}>Seja um lar temporário</h1>
        <p className={styles.subtitulo}>
          Crie a conta do pet seguindo suas necessidades
        </p>
        <div className={styles.colunaUm}>
          <h1 className={styles.titulo}>Informações Pesoais</h1>
          <label className={styles.label} htmlFor="nome">
            Nome Completo
          </label>
          <input
            className={styles.barraInfos}
            type="text"
            id="nome"
            placeholder="Deixe em branco se não tiver nome"
            required
          />

          <label className={styles.grupoInput}>CPF</label>
          <input
            className={styles.barraInfos}
            type="text"
            placeholder="000.000.000-00"
          />

          <label className={styles.label} htmlFor="dataNascimento">
            Data de Nascimento
          </label>
          <input
            className={styles.barraInfos}
            type="date"
            id="dataNascimento"
            required
          />
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.barraInfos}
            type="email"
            id="email"
            placeholder="
Digite seu email"
            required
          />

          <h1 className={styles.labelTitulo}>Endereço</h1>
          <label className={styles.label} htmlFor="cep">
            CEP
          </label>
          <input
            className={styles.barraInfos}
            type="text"
            id="cep"
            placeholder="Digite o CEP"
            required
          />

          <label className={styles.label} htmlFor="rua/avenida"></label>
          <input
            className={styles.barraInfos}
            type="text"
            id="rua/avenida"
            placeholder="Rua/Avenida"
            required
          />

          <label className={styles.label} htmlFor="numero"></label>
          <input
            className={styles.barraInfos}
            type="text"
            id="numero"
            placeholder="Número"
            required
          />

            <label className={styles.label} htmlFor="complemento"></label>
            <input
                className={styles.barraInfos}
                type="text"
                id="complemento"
                placeholder="Complemento (Opcional)"
            />

            <label className={styles.label} htmlFor="bairro"></label>
            <input
                className={styles.barraInfos}
                type="text"
                id="bairro"
                placeholder="Bairro"
                required
            />

            <label className={styles.label} htmlFor="cidade"></label>
            <input
                className={styles.barraInfos}
                type="text"
                id="cidade"
                placeholder="Cidade"
                required
            />

            <label className={styles.label} htmlFor="estado"></label>
            <input
                className={styles.barraInfos}
                type="text"
                id="estado"
                placeholder="Estado"
                required
            />


        </div>

        <div className={styles.colunaDois}>
          <form className={styles.formulario}>
            <label className={styles.label} htmlFor="situacao">
              Situação
            </label>
            <select className={styles.barraInfos} id="situacao" required>
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="perdido">Perdido</option>
              <option value="encontrado">Encontrado</option>
              <option value="paraAdocao">Para Adoção</option>
            </select>

            <label className={styles.label} htmlFor="especie">
              Espécie
            </label>
            <select className={styles.barraInfos} id="especie" required>
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="cachorro">Cachorro</option>
              <option value="gato">Gato</option>
            </select>

            <label className={styles.label} htmlFor="genero">
              Genêro
            </label>
            <select className={styles.barraInfos} id="genero" required>
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
            </select>

            <label className={styles.label} htmlFor="raca">
              Raça
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="raca"
              placeholder="Deixe em branco se não souber a raça"
            />

            <label className={styles.label} htmlFor="porte">
              Porte:
            </label>
            <select className={styles.barraInfos} id="porte" required>
              <option value="" disabled selected>
                Selecione
              </option>
              <option value="pequeno">Pequeno</option>
              <option value="medio">Médio</option>
              <option value="grande">Grande</option>
            </select>

            <label className={styles.label} htmlFor="cor">
              Cor Predominante
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="cor"
              placeholder="Digite a cor predominante do pet"
            />

            <label className={styles.label} htmlFor="idade">
              Idade
            </label>
            <input
              className={styles.barraInfos}
              type="text"
              id="idade"
              placeholder="Deixe em branco se não souber a idade"
            />

            <button type="submit" className={styles.botao}>
              Enviar Formulário
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
