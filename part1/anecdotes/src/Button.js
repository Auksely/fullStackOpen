import React from "react";

const Button=({handleSelection, text})=>(
    <div>
    <button onClick={handleSelection}>{text}</button>
    </div>
)

export default Button;