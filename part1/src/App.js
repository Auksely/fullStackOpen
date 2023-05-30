const Header=({course})=>{
  return (
    <h1>{course}</h1>
  )
}

const Content=({children})=>{
  return(
    <div>
        {children}
    </div>
  )
}

const Footer=({exercises})=>{
  return(
    <p>Number of exercises {exercises}</p>
  )
}

const Part=({part, excercise})=>{
  return(
    <p>{part} {excercise}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
    <Header course={course}/>
    <Content> 
      <Part part={part1} exercise={exercises1}/>
      <Part part={part2} exercise={exercises2}/>
      <Part part={part3} exercise={exercises3}/>
    </Content>
    <Footer exercises={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App