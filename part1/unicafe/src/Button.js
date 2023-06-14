import React from "react";

const Button =({handleSubmit, text})=>
    (
<button onClick={handleSubmit}>{text}</button>
    )


export default Button;