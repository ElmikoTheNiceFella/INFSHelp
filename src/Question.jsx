import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './App.module.css'
import { useState } from 'react';

const Question = ({ question, code, answers, correctAnswer, generateQuestion, handleCorrectAnswer, addToTotal, hasEnded, handleEnd }) => {

  const [isAnswered, setIsAnswered] = useState(false)

  const toggleAnswer = () => setIsAnswered(p => !p)

  const handleAnswer = (i) => {
    if (!isAnswered) {
      addToTotal()
      toggleAnswer()
      if (i === correctAnswer) {
        handleCorrectAnswer()
      }
    }
  }

  const handleNext = () => {
    if (isAnswered) toggleAnswer()
    if (hasEnded) handleEnd()
    generateQuestion()
  }

  return (
    <>
      <h2 className={styles.question}>{question}</h2>
      {code && <SyntaxHighlighter showLineNumbers customStyle={{
        width: "350px",
        border: "2px solid #102C57",
        height: "300px"
      }} language="python" style={docco}>
        {code}
      </SyntaxHighlighter>}
      {answers.map((answer, i) => (
        <button type='button' key={i} style={{
          border: `5px solid ${isAnswered ? (i + 1 === correctAnswer ? "#41B06E" : "#8B322C") : "#102C57"}`
        }} onClick={() => handleAnswer(i + 1)} className={styles.answer}>
          <p>{i + 1}</p>
          <div className={styles.line}></div>
          <p>{answer}</p>
        </button>
      ))}
      <a href='#top' onClick={handleNext} className={styles.nextQuestion}>{isAnswered ? "Next" : "Skip"}</a>
    </>
  )
}

export default Question