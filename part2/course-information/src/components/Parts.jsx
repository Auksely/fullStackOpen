import React from "react";

const Part=({part})=>{
    return(
    <li>{part.name} <span/> {part.exercises}</li>
    )
}

export default Part;