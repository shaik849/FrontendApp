import React from 'react';
import '../searchDrop.css'; 

function SearchDropdown({books}) {

  return (
    <div className="card" style={{"width": "18rem"}}>
        <ul className="list-group list-group-flush">
        {books.map((entry, index) => {
             return <li className="list-group-item" key={index}>{entry?.work?.title}</li>
})}
        </ul>
    </div>
  )
}

export default SearchDropdown