import styles from './saibaMais.module.css';
import { TbBoneFilled, TbPawFilled } from 'react-icons/tb';
import { BsFillHouseFill } from 'react-icons/bs';

export default function SaibaMais() {
    return (
        <>
        <div className={styles.containerSaibaMais}>
            <div className={styles.card}> 
                <div className={styles.iconCircle}>
                    <TbBoneFilled />
                </div>
                <h2>Faça sua doação</h2>
                <p>Contribua com suprimentos ou recursos e ajude a transformar a vida de animais resgatados.</p>
                <a href="/login">Saiba mais &gt;</a>
            </div>
            <div className={styles.card}> 
                <div className={styles.iconCircle}>
                    <TbPawFilled />
                </div>
                <h2>Registre um animal</h2>
                <p>Encontre um animal em situação de risco? Registre aqui e ajude a conectá-lo a uma ONG ou lar temporário.</p>
                <a href="/login">Saiba mais &gt;</a>
            </div>
            <div className={styles.card}> 
                <div className={styles.iconCircle}>
                    <BsFillHouseFill />
                </div>
                <h2>Crie um lar temporário</h2>
                <p>Ofereça seu espaço e carinho como lar temporário para um animal resgatado.</p>
                <a href="/login">Saiba mais &gt;</a>
            </div>  
        </div>
        </>
    );
}