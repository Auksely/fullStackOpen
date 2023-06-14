import { useState } from 'react'
import Button from './Button'
import Statistic from './Statistic'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleSubmit={handleGood} text={"good"} />
      <Button handleSubmit={handleNeutral} text={"neutral"} />
      <Button handleSubmit={handleBad} text={"bad"} />
      <h1>statistics</h1>
<Statistic good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App