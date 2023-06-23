import React from "react";

const Input=({type, value, onChange, name, label } )=>{
    return(
        <div>
        <label>{label}</label>
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