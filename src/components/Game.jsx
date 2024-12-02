import {useState,useRef} from 'react';
import styles from './Game.module.css';

const Game = ({verifyLetter, pickedWord,pickedCategory, letters, guessesLetters, wrongLetters, guesses,score}) => {
    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter);
        setLetter("");
        letterInputRef.current.focus();
    }
    return (
    <div className={styles.game}>
        <p className={styles.points}>Pontução: {score}</p>
        <h1>Adivinhe a palavra</h1>
        <h3 className={styles.tip}>Dicas sobre a palavra: <span>{pickedCategory}</span></h3>

        <p>Você ainda tem {guesses} tentativ(s)</p>
        <div className={styles.wordContainer}>
            {letters.map((letter, index) => (
                guessesLetters.includes(letter) ? (
                    <span key={index} className={styles.letter}>{letter}</span> 
                ) : (
                    <span key={index} className={styles.blankSquare}></span>
                )
            ))}
        </div>
        <div >
            <p>Tente adivinhar a palavra: </p>
            <form className={styles.letterContainer} onSubmit={handleSubmit}>
                <input ref={letterInputRef} type="text" name='letter' maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} />
                <button className={styles.button}>Jogar</button>
            </form>
           
        </div>
        <div className={styles.wrongLettersContainer}>
            <p>Letras Já utilizadas</p>
            {wrongLetters.map((letter, index) => (
                <span key={index} >{letter}, </span>
                ))}
        </div>
       
    </div>
    
  )
}

export default Game