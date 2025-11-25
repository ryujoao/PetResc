// src/constants/opcoesAnimais.ts

// A interface Opcao só possui label e valor, conforme o erro indica
export interface Opcao {
    label: string;
    valor: string;
}

// --- GÊNERO ---
export const OPCOES_GENERO: Opcao[] = [
    { label: "Macho", valor: "MACHO" }, 
    { label: "Fêmea", valor: "FEMEA" },
];

// --- ESPÉCIE (Usando apenas strings) ---
export const OPCOES_ESPECIE: string[] = ["Cachorro", "Gato", "Pássaros", "Outro"];


// --- PORTE (Usando apenas strings) ---
export const OPCOES_PORTE: string[] = ["Pequeno", "Medio", "Grande"];


// --- IDADE (Usando apenas strings) ---
export const OPCOES_IDADE: string[] = ["Filhote", "Adulto", "Idoso"];


// --- CORES PREDOMINANTES ---
// CORREÇÃO: Substituí 'nome' por 'label' para seguir a interface Opcao
export const CORES_PREDOMINANTES: Opcao[] = [
    { label: "Preto", valor: "Preto" }, // Corrigido de 'nome' para 'label'
    { label: "Branco", valor: "Branco" },
    { label: "Marrom", valor: "Marrom" },
    { label: "Cinza", valor: "Cinza" },
    { label: "Caramelo", valor: "Caramelo" },
    { label: "Azul", valor: "Azul" },
    { label: "Vermelho", valor: "Vermelho" },
    { label: "Verde", valor: "Verde" },
    { label: "Laranja", valor: "Laranja" },
    { label: "Amarelo", valor: "Amarelo" },
];