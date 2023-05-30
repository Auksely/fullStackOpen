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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const [part1, part2, part3]=course.parts;

  return (
    <div>
    <Header course={course.name}/>
    <Content> 
      <Part part={part1.name} exercise={part1.exercises}/>
      <Part part={part2.name} exercise={part2.exercises}/>
      <Part part={part3.name} exercise={part3.exercises}/>
    </Content>
    <Footer exercises={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App