import React from 'react'
import styles from './StartScreen.module.css'
const StartScreen = ({stratGame}) => {
  return (
    <div>
        <h1 className={styles.txt}>StartScreen</h1>
        <p className={styles.paragraph}>Clique abaixo para começar a jogar</p>
        <div className={styles.container}>
            <button className={styles.button} onClick={stratGame}><span className={styles.button_top}>Jogar</span></button>
        </div>
    </div>
  )
}

export default StartScreen