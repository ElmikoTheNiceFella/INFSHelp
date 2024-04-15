import { useEffect } from 'react'
import styles from './App.module.css'
import { useState } from 'react'
import Question from './Question'
import questionBank from '../questionBank.json'
import Result from './Result'

function App() {

  const [numberOfQuestions, setNumberOfQuestions] = useState(10)

  const [timer, setTimer] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)

  const [questionsIndexes, setQuestionsIndexes] = useState([])
  const [question, setQuestion] = useState(questionBank[0])
  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  const handleStart = () => {
    setHasEnded(false)
    setIsStarted(true)
  }
  const handleStop = () => {
    setHasEnded(false)
    setIsStarted(false)
    setTimer(0)
    setScore(0)
    setTotalScore(0)
  }
  const handleEnd = () => {
    setHasEnded(true)
  }

  const handleCorrectAnswer = () => setScore(p => p + 1)
  const addToTotal = () => setTotalScore(p => p + 1)


  const generateQuestion = () => {
    console.log(questionsIndexes[0])
    setQuestion(questionBank[questionsIndexes[0]])
    setQuestionsIndexes((p) => p.slice(1))
  }

  useEffect(() => {
    setQuestionsIndexes(() => {
      let arr = []
      // Generate indexes
      for (let i = 1; i < questionBank.length; i++) arr.push(i)
      // Shuffle
      let currentIndex = arr.length;
      while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
      }
      return arr
    })
  }, [])

  useEffect(() => {
    const timerInterval = setInterval(() => { if (isStarted && !hasEnded) setTimer(t => t + 1) }, 1000)
    return () => clearInterval(timerInterval)
  }, [isStarted, hasEnded])

  return (
    <>
      <div id='top' className={styles.timer}>
        <strong>{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}</strong>
        <strong>{score}/{numberOfQuestions}</strong>
      </div>

      <main className={styles.main}>
        {isStarted && !hasEnded && <Question
          hasEnded={totalScore === numberOfQuestions}
          handleEnd={handleEnd}
          handleCorrectAnswer={handleCorrectAnswer}
          addToTotal={addToTotal}
          generateQuestion={generateQuestion}
          question={question.question}
          code={question.code}
          answers={question.answers}
          correctAnswer={question.correctAnswer} />}
        {/* styles, score, numberOfQuestions, timer, handleStop, handleRestart */}
        {isStarted && hasEnded && <Result
          score={score}
          numberOfQuestions={numberOfQuestions}
          timer={timer}
          handleStop={handleEnd}
          handleRestart={handleStop}
        />}
        {!hasEnded && <button type='button' onClick={isStarted ? handleStop : handleStart} className={styles.startQuiz}>{isStarted ? "Stop" : "Start"} Quiz</button>}
        {/* {!isStarted && (
          <div className={styles.numberOfQuestions}>
            <h3>Number of questions</h3>
            <div>
              {[10, 20, 30].map(n => (
                <button type='button' onClick={() => setNumberOfQuestions(n)} key={n}>{n}</button>
              ))}
            </div>
          </div>
        )} */}
      </main>
    </>
  )
}

export default App
