import { useState, useEffect } from 'react'
import './App.css'

const CHOICES = [
  { name: 'rock', emoji: '🪨' },
  { name: 'paper', emoji: '📄' },
  { name: 'scissors', emoji: '✂️' }
]

function App() {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [cpuChoice, setCpuChoice] = useState(null)
  const [playerScore, setPlayerScore] = useState(0)
  const [cpuScore, setCpuScore] = useState(0)
  const [result, setResult] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const playRound = (choice) => {
    if (isShaking) return

    setPlayerChoice(null)
    setCpuChoice(null)
    setResult('')
    setIsShaking(true)

    // Wait for shake animation
    setTimeout(() => {
      const cpu = CHOICES[Math.floor(Math.random() * CHOICES.length)]
      setPlayerChoice(choice)
      setCpuChoice(cpu)
      setIsShaking(false)
      determineWinner(choice, cpu)
    }, 1000)
  }

  const determineWinner = (player, cpu) => {
    if (player.name === cpu.name) {
      setResult('DRAW')
    } else if (
      (player.name === 'rock' && cpu.name === 'scissors') ||
      (player.name === 'paper' && cpu.name === 'rock') ||
      (player.name === 'scissors' && cpu.name === 'paper')
    ) {
      setResult('YOU WIN!')
      setPlayerScore(s => s + 1)
    } else {
      setResult('CPU WINS')
      setCpuScore(s => s + 1)
    }
  }

  const resetGame = () => {
    setPlayerScore(0)
    setCpuScore(0)
    setPlayerChoice(null)
    setCpuChoice(null)
    setResult('')
  }

  return (
    <div className="game-container">
      <h1>RPS</h1>

      <div className="scoreboard">
        <div className="score-item">
          <span className="score-label">Player</span>
          <span className="score-value">{playerScore}</span>
        </div>
        <div className="score-item">
          <span className="score-label">CPU</span>
          <span className="score-value">{cpuScore}</span>
        </div>
      </div>

      <div className="arena">
        <div className="choice-display">
          <span className="player-label">YOU</span>
          <div className={`choice-icon ${isShaking ? 'shaking' : ''}`}>
            {isShaking ? '👊' : (playerChoice?.emoji || '❔')}
          </div>
        </div>

        <div className="result-container">
          <div className={`result-message ${result === 'YOU WIN!' ? 'result-win' :
              result === 'CPU WINS' ? 'result-loss' :
                result === 'DRAW' ? 'result-draw' : ''
            }`}>
            {result}
          </div>
        </div>

        <div className="choice-display">
          <span className="player-label">CPU</span>
          <div className={`choice-icon ${isShaking ? 'shaking' : ''}`}>
            {isShaking ? '👊' : (cpuChoice?.emoji || '❔')}
          </div>
        </div>
      </div>

      <div className="controls">
        {CHOICES.map((choice) => (
          <button
            key={choice.name}
            className="control-btn"
            onClick={() => playRound(choice)}
            disabled={isShaking}
          >
            <span className="btn-emoji">{choice.emoji}</span>
            <span className="btn-text">{choice.name}</span>
          </button>
        ))}
      </div>

      {(playerScore > 0 || cpuScore > 0) && (
        <button className="reset-btn" onClick={resetGame}>
          Reset Scores
        </button>
      )}
    </div>
  )
}

export default App