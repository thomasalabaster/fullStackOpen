import { useState } from "react"

const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [value, setValue] = useState(10)
  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }
  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" /> 
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}

export default App;


// import { useState } from "react"

// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])
//   const [total, setTotal] = useState(0)

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     const updatedLeft = left + 1;
//     setLeft(updatedLeft)
//     setTotal(updatedLeft + right)
//   }
     
//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     const updatedRight = right + 1;
//     setRight(updatedRight)
//     setTotal(updatedRight + left)
//   }

//   return (
//     <div>
//       <div>
//         {left}
//         <Button handleClick={handleLeftClick} text="left" />
//         <Button handleClick={handleRightClick} text="right" />
//         {right}
//         <History allClicks={allClicks} />
//         <p>total {total}</p>
//       </div>
//     </div>
//   )
// }

// const History = (props) => {
//   console.log("props value is", props)
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(" ")}
//     </div>
//   )
// }

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )




// import { useState } from "react"

// const App = () => {
//   const [ counter, setCounter ] = useState(0)

//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const setToZero = () => setCounter(0)

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button handeClick={increaseByOne} text='plus'/>
//       <Button handeClick={setToZero} text='zero' />
//       <Button handeClick={decreaseByOne} text='minus' />
//     </div>
//   )
// }

// const Display = ({ counter }) => <div>{counter}</div>

// const Button = ({ handeClick, text }) => (
//   <button onClick={handeClick}>
//     {text}
//   </button>
// )



// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age
//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>
//         So you were probably born in {bornYear()}
//       </p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10
//   return (
//     <div>
//       <hi>Greetings</hi>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age ={age} />
//     </div>
//   )
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }
//   return (
//     <div>
//       <Header course={course}/>
//       <Content course={course}/>
//       <Total course={course}/>
//     </div> 
//   )
// }
// const Header = (prop) => {
//   return (
//     <div>
//       <h1>{prop.course.name}</h1>
//     </div>
//   )
// }
// const Content = (courseContent) => {
//   return (
//     <div>
//       <Part exerciseName={courseContent.course.parts[0].name} exerciseCount={courseContent.course.parts[0].exercises}/>
//       <Part exerciseName={courseContent.course.parts[1].name} exerciseCount={courseContent.course.parts[1].exercises}/>
//       <Part exerciseName={courseContent.course.parts[2].name} exerciseCount={courseContent.course.parts[2].exercises}/> 
//     </div>
//   )
// }

// const Part = (prop) => {
//   return (
//     <div>
//       <p>
//         {prop.exerciseName} {prop.exerciseCount}
//       </p>
//     </div>
//   )
// }

// const Total = (prop) => {
//   return (
//     <div>
//       <p>
//         Number of exercises {
//         prop.course.parts[0].exercises + 
//         prop.course.parts[1].exercises +
//         prop.course.parts[2].exercises}
//       </p>
//     </div>
//   )
// }
