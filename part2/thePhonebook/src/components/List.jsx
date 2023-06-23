import React from "react";

const List=({list, handleDelete})=>{
    return(
        <div>
            {list.map(element=>
            <li key={element.id}>
            {element.name} 
            {element.number}
            <button onClick={() => handleDelete(element.id)}>Delete</button>
            </li>
            )}
        </div>
    )
}

export default List