// src/pages/ongsProximas/ongsProximas.tsx (Versão Restaurada com iframe)

import React, { useState, useEffect } from "react";
import styles from "./ongsProximas.module.css";
// import { useAuth } from "../../../auth/AuthContext"; 

// --- Configuração ---
const GOOGLE_MAPS_API_KEY = "SUA_CHAVE_DE_API_AQUI"; 
const API_URL_ONGS = "https://petresc.onrender.com/api/ongs/proximas"; 


// --- TIPAGENS ---
interface Localizacao {
    lat: number;
    lng: number;
}

interface Ong {
    id: string;
    nome: string;
    endereco: string;
    cep: string;
    imagem_url: string; 
    latitude: number; 
    longitude: number; 
}

// ... (OngCard e outros tipos permanecem os mesmos)
interface OngCardProps {
    ong: Ong;
}

const OngCard: React.FC<OngCardProps> = ({ ong }) => (
    <div className={styles.card}>
        <img 
            src={ong.imagem_url || "/path/to/default/ong.png"} 
            alt={ong.nome} 
        />
        <div>
            <h3>{ong.nome}</h3>
            <p>{ong.endereco}</p>
            <p>{ong.cep}</p>
        </div>
    </div>
);


// --- Componente Principal ---
export default function OngsProximas() {
    const [localizacao, setLocalizacao] = useState<Localizacao | null>(null);
    const [ongsProximas, setOngsProximas] = useState<Ong[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [metodoLocalizacao, setMetodoLocalizacao] = useState<'GPS' | 'ENDERECO' | 'NENHUM'>('NENHUM');


    // 1. OBTER LOCALIZAÇÃO DO USUÁRIO VIA GPS DO NAVEGADOR (sem alteração)
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocalização não é suportada pelo seu navegador.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocalizacao({ lat: latitude, lng: longitude });
                setMetodoLocalizacao('GPS');
            },
            (err) => {
                console.warn(`Erro GPS (${err.code}): ${err.message}`);
                setError("Não foi possível obter sua localização via GPS. Verifique as permissões.");
                setLoading(false);
            }
        );
    }, []); 

    // 2. BUSCAR ONGS DO BACKEND (sem alteração)
    useEffect(() => {
        if (!localizacao) return;

        const fetchOngs = async () => {
            setLoading(true);
            setError(null);
            
            const params = new URLSearchParams({
                lat: localizacao.lat.toString(),
                lng: localizacao.lng.toString(),
                limite: "4" 
            });

            try {
                const response = await fetch(`${API_URL_ONGS}?${params.toString()}`);

                if (!response.ok) {
                    throw new Error("Falha ao buscar ONGs. (Status: " + response.status + ")");
                }

                const data: Ong[] = await response.json();
                setOngsProximas(data);

            } catch (err) {
                console.error("Erro ao buscar ONGs:", err);
                setError("Ocorreu um erro ao carregar as ONGs próximas."); 
            } finally {
                setLoading(false);
            }
        };

        fetchOngs();
    }, [localizacao]); 


    // 3. 🔄 FUNÇÃO AJUSTADA PARA IFRAME (EMBED API) 🔄
    const createMapEmbedUrl = () => {
        const centerLat = localizacao?.lat || -23.5505; // Default: São Paulo
        const centerLng = localizacao?.lng || -46.6333;
        
        // Constrói uma string de pesquisa ou visualização para o Embed API
        // Esta URL centraliza no usuário e tenta exibir ONGs próximas, ou
        // no mínimo, mostra um mapa interativo.
        let query = '';
        if (ongsProximas.length > 0) {
            // Se houver ONGs, centraliza em uma delas ou no usuário e lista as ONGs na pesquisa
            // O Map Embed API não é ideal para múltiplos pins, mas o modo 'view' é o mais próximo.
            query = ongsProximas.map(ong => ong.endereco).join(' e ');
        } else {
            // Se não houver ONGs, centraliza na localização do usuário
            query = `${centerLat},${centerLng}`;
        }
        
        // Usamos o formato Embed API 'place' ou 'view' para o iframe
        // A API KEY é OBRIGATÓRIA para o Map Embed API em produção.
        return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(query)}&center=${centerLat},${centerLng}&zoom=12`;
    };
    
    // Constrói a URL do mapa interativo
    const mapEmbedUrl = createMapEmbedUrl();

    // --- Renderização ---

    return (
        <div className={styles.pageOngsProximas}>
            
            <section className={styles.listaOngs}>
                <h2 className={styles.titulo}>ONGs próximas a você</h2>

                {loading && <p>Buscando {metodoLocalizacao === 'GPS' ? 'sua localização via GPS' : 'dados de localização'} e ONGs...</p>}
                
                {error && <p className={styles.erro}>Erro: {error}</p>}

                {!localizacao && !error && !loading && (
                    <p className={styles.aviso}>Por favor, permita o acesso à sua localização ou cadastre seu endereço nas Configurações.</p>
                )}

                {!loading && ongsProximas.length === 0 && localizacao && !error && (
                    <p>Não encontramos ONGs próximas à sua localização atual ({metodoLocalizacao}).</p>
                )}

                {ongsProximas.map(ong => (
                    <OngCard key={ong.id} ong={ong} />
                ))}
            </section>

            <section className={styles.mapa}>
                {/* 🎯 RESTAURAÇÃO: Voltamos ao IFRAME para manter a aparência interativa do mapa. */}
                {localizacao && !loading && !error && (
                    <iframe
                        key={mapEmbedUrl}
                        src={mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Mapa de ONGs próximas"
                    ></iframe>
                )}
                 {localizacao && (
                    <a 
                        href={`https://www.google.com/maps/search/ONG+de+animais/@${localizacao.lat},${localizacao.lng},12z`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.verMapaSimples}
                    >
                        Ver no Google Maps
                    </a>
                )}
            </section>
        </div>
    );
}