import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const DisplayVotes = (props) => (
  <div>
    <p>has {props.votes} votes</p>
  </div>
)

const Header = (props) => (
  <div>
    <h1>{props.text}</h1>
  </div>
)
const DisplayMostVotes = (props) => {
  const largestNumber = props.vote.indexOf(Math.max(...props.vote))
  if (props.vote.every(num => num === 0))
  {
    return
  }
  return (
    <div>
      <Header text="Anecdote with the most votes" />
      <p>{props.anecdotes[largestNumber]}</p>
      <p>has {props.vote[largestNumber]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVotes] = useState(Array(anecdotes.length).fill(0))

  const updateVote = () => {
    const newVote = [...vote];
    newVote[selected]++;
    setVotes(newVote)
  }

  const randomAnecdote = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <DisplayVotes votes={vote[selected]}/>
      <Button text="vote" handleClick={updateVote} />
      <Button text="next anecdote" handleClick={randomAnecdote} />
      <DisplayMostVotes vote={vote} anecdotes={anecdotes} />
    </div>
  )
}

export default App