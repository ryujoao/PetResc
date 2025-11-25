export interface Opcao {
    label: string;
    valor: string;
}

// --- GÊNERO ---
export const OPCOES_GENERO: Opcao[] = [
    { label: "Macho", valor: "MACHO" }, 
    { label: "Fêmea", valor: "FEMEA" },
];

// --- ESPÉCIE ---
export const OPCOES_ESPECIE: string[] = ["Cachorro", "Gato", "Pássaros", "Outro"];


// --- PORTE ---
export const OPCOES_PORTE: string[] = ["Pequeno", "Medio", "Grande"];


// --- IDADE ---
export const OPCOES_IDADE: string[] = ["Filhote", "Adulto", "Idoso"];


// --- CORES PREDOMINANTES ---
export const CORES_PREDOMINANTES: Opcao[] = [
    { nome: "Preto", valor: "Preto" },
    { nome: "Branco", valor: "Branco" },
    { nome: "Marrom", valor: "Marrom" },
    { nome: "Cinza", valor: "Cinza" },
    { nome: "Caramelo", valor: "Caramelo" },
    { nome: "Azul", valor: "Azul" },
    { nome: "Vermelho", valor: "Vermelho" },
    { nome: "Verde", valor: "Verde" },
    { nome: "Laranja", valor: "Laranja" },
    { nome: "Amarelo", valor: "Amarelo" },
];