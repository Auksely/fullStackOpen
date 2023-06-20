import React from "react";

const Button=({text, type='submit'})=>{
    return(
        <div>
            <button type={type}>
                {text}
            </button>
        </div>
    )
}

export default Button