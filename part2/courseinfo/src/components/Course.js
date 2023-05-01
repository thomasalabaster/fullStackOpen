import Part from "./Part"
import Header from "./Header"
import Total from "./Total"

const Course = ({ courses }) => {
    return (
        <div>
            {courses.map(course => {
                return (
                    <div key={course.id}>
                        <Header header={course.name} />
                        {course.parts.map(part => (
                        <Part 
                            key={part.id} 
                            part={{ name: part.name, exercises: part.exercises}}/>
                        ))} 
                        <Total sum={course} /> 
                    </div>
                )
            })} 
        </div>
    )
}

export default Course