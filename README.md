# 🐾 PetResc

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

## 💻 Sobre o projeto

**PetResc** é uma plataforma desenvolvida para conectar ONGs, protetores e adotantes. O objetivo é facilitar a adoção de animais, o encontro de lares temporários e a divulgação de animais perdidos/encontrados.

O sistema permite que ONGs gerenciem seus animais e que usuários comuns se candidatem para adoção ou ofereçam lar temporário.

---

## 🤖 Diferencial: Descrições com IA

O projeto utiliza a API do **Google Gemini** para auxiliar no cadastro de animais.
O objetivo é resolver a dificuldade que muitos usuários têm em criar textos atraentes para adoção.

**Como funciona:**

1. O utilizador insere as características técnicas (espécie, cor, temperamento).
2. O sistema envia um prompt estruturado para a IA.
3. A IA retorna uma narrativa emocionante em primeira pessoa.
4. O resultado é pré-preenchido no campo de descrição, agilizando o cadastro e aumentando o apelo emocional do perfil do animal.

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- **[React](https://reactjs.org/)** + **[Vite](https://vitejs.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Node.js](https://nodejs.org/en/)** (Backend)
- **[Prisma](https://www.prisma.io/)** (ORM)
- **[PostgreSQL](https://www.postgresql.org/)** (Banco de Dados)
- **[CSS Modules](https://github.com/css-modules/css-modules)**

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disso é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

### Acessando o site

É possível acessar o site pelo link:
(https://pet-resc.vercel.app/)

### 🎲 Rodando a Aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/ryujoao/PetResc.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd petresc

# Instale as dependências
$ npm install
$ npm i react-icons

# O servidor iniciará na porta:5173 - acesse <http://localhost:5173>
```
