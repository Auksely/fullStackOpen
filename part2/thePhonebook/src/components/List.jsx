import React from "react";

const List=({list})=>{
    return(
        <div>
            {list.map(element=>
            <li>{element.name} {element.number}</li>
            )}
        </div>
    )
}

export default List