import React from "react";

const Input=({type, value, onChange, name } )=>{
    return(
        <div>
            <input
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            />
        </div>
    )
}

export default Input;