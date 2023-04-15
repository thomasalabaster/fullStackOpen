import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Heading = (props) => (
  <h1>{props.text}</h1>
)
const Statistics = (props) => {
  if (props.total < 1) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="total" value={props.total} />
      <StatisticLine text="average" value={props.average} />
      <StatisticLine text="positive" value={props.positiveAmount} />
  </div>
  )
}
const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td width="52px">{props.text} </td>
              <td> {props.value} %</td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td width="52px">{props.text} </td>
            <td> {props.value}</td>
          </tr>
        </tbody>
      </table>
  </div>
  )
}

const App = () => {
  const [good, increaseGood] = useState(0)
  const [neutral, increaseNeutral] = useState(0)
  const [bad, increaseBad] = useState(0)
  const total = good + neutral + bad;
  const average = ((good*1 + bad * -1)/total).toFixed(2)
  const positiveAmount = (good/total).toFixed(2)

  const increaseInGood = newValue => {
    increaseGood(newValue);
  }
  const increaseInNeutral = newValue => {
    increaseNeutral(newValue);
  }
  const increaseInBad = newValue => {
    increaseBad(newValue);
  }

  return (
    <div>
      <Heading text="give feedback"/>
      <Button handleClick={() => increaseInGood(good + 1)}  text="good" />
      <Button handleClick={() => increaseInNeutral(neutral + 1)}  text="neutral" />
      <Button handleClick={() => increaseInBad(bad + 1)}  text="bad" />
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} 
              average={average} positiveAmount={positiveAmount}/>
    </div>
  )
}

export default App
