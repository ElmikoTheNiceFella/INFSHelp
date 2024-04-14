import { useEffect } from 'react'
import styles from './App.module.css'

const Result = ({ score, numberOfQuestions, timer, handleStop, handleRestart }) => {

  useEffect(() => {
    handleStop()
  }, [])

  return (
    <div className={styles.result}>
      <h2 className={styles.result}>Out of {numberOfQuestions} question{score != 1 && "s"}, You answered {score} correctly in{!!Math.floor(timer / 60) && " " + Math.floor(timer / 60)}{timer / 60 == Math.floor(timer / 60) && timer >= 60 ? " minutes" : timer > 60 ? " minutes and " : ""}{timer % 60 !== 0 && " " + timer % 60}{timer % 60 && " seconds"}.</h2>
      <button type='button' onClick={handleRestart} className={styles.startQuiz}>Restart</button>
    </div>
  )
}

export default Result