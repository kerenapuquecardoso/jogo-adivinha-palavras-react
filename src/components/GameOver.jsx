import React from 'react'
import styles from './GameOver.module.css'

const GameOver = (score) => {
  return (
    <div>
      <h1 className={styles.title}>Game Over</h1>
      <h2>A sua pontuação foi: {score}</h2>
      <button className={styles.button}>Retry</button>
    </div>
  )
}

export default GameOver