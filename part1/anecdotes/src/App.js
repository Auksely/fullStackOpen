import { useState } from 'react'
import { anecdotes } from './anecdotes'
import Button from './Button'

const App = () => {


  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length - 1).fill(0));
  console.log("points", points)

  let randomNumber = Math.floor(Math.random() * (anecdotes.length - 1))
  console.log("randomNum", randomNumber)


  const handleSelection = () => {
    setSelected(randomNumber);
  }

  const handlePoints = () => {
    const copyPoints = [...points];
    copyPoints[selected] += 1;
    setPoints(copyPoints);
  }

  const findMostPoints=()=>{
  let indexMost=0;
  let maxPoints=0;
points.forEach((item, index)=>{
  if (item>maxPoints){
maxPoints=item
indexMost=index
  }
});
return indexMost;
  }


  return (
    <div>
      <h1> Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>this anecdote has {points[selected]} votes</p>
      <Button handleSelection={handlePoints} text={"add vote"} />
      <Button handleSelection={handleSelection} text={"next anecdote"} />
      <h1> Anecdote with the most votes</h1>
      {anecdotes[findMostPoints()]}
    </div>
  )
};



export default App