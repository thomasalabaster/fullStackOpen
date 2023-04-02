const App = () => {
  const course = 'Half Stack application development'
  const part1test = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content 
        part1={part1test} exercises1={exercises1} 
        part2={part2} exercises2={exercises2} 
        part3={part3} exercises3={exercises3}
      />
      <Total 
        exercises1={exercises1} 
        exercises2={exercises2} 
        exercises3={exercises3}
      />
    </div>
  )
}
const Header = (course) => {
  return (
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}
const Content = (courseContent) => {
  return (
    <div>
      <Part exerciseName={courseContent.part1} exerciseCount={courseContent.exercises1}/>
      <Part exerciseName={courseContent.part2} exerciseCount={courseContent.exercises2}/>
      <Part exerciseName={courseContent.part3} exerciseCount={courseContent.exercises3}/>
    </div>
  )
}

const Part = (newParts) => {
  return (
    <div>
      <p>
        {newParts.exerciseName} {newParts.exerciseCount}
      </p>
    </div>
  )
}
const Total = (numExercises) => {
  return (
    <div>
      <p>
      Number of exercises {
        numExercises.exercises1 + 
        numExercises.exercises2 + 
        numExercises.exercises3
      }
      </p>
    </div>
  )
}

export default App