const Total = ({ sum }) => {
    const total = sum.parts.reduce((runTotal, exerciseCount) => runTotal + exerciseCount.exercises, 0)
    return (
        <p><strong>total of {total} exercises</strong></p>
    )
}

export default Total