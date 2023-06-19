import React from "react";

import Header from "./Header";
import Sum from "./Sum";
import Content from "./Content";

// import { courses } from "./components";

const Course = ({course}) => {
    return(
    <div>
        <Header text={course}/>
        <Content parts={course.parts}/>
        <Sum sum={course.parts.reduce((sum, part)=>
        sum+part.exercises,0)}/>
    </div>
    )
}

export default Course;