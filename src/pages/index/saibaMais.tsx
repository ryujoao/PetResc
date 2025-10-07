import styles from './saibaMais.module.css';

export default function SaibaMais() {
    return (
        <>
        <div className={styles.containerSaibaMais}>
            <div className={styles.card}> 
                <h2>Faça sua doação</h2>
                <p>Contribua com suprimentos ou recursos e ajude a transformar a vida de animais resgatados.</p>
                <a href="/cadastro">Saiba mais &gt;</a>
            </div>
            <div className={styles.card}> 
                <h2>Registre um animal</h2>
                <p>Encontre um animal em situação de risco? Registre aqui e ajude a conectá-lo a uma ONG ou lar temporário.</p>
                <a href="/cadastro">Saiba mais &gt;</a>
            </div>
            <div className={styles.card}> 
                <h2>Crie um lar temporário</h2>
                <p>Ofereça seu espaço e carinho como lar temporário para um animal resgatado.</p>
                <a href="/cadastro">Saiba mais &gt;</a>
            </div>  
        </div>
        </>
    );
}