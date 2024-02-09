import React, { useState } from 'react';

function Books({books}) {
  const [readStatus, setReadStatus] = useState(Array(books.length).fill(false));

  const handleToggleReadStatus = (index) => {
    const newReadStatus = [...readStatus];
    newReadStatus[index] = !newReadStatus[index];
    setReadStatus(newReadStatus);
  };

 // Empty dependency array to ensure the effect runs only once on component mount
  return (
    <div>
      {/* Display books or search results below the navbar */}
      <div className='my-5'>
      {books.length === 0 ? (
        <div className='d-flex justify-content-center align-items-center'>
      <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
      </div>
    </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {books.map((entry, index) => (
            <div key={index} className="card mb-4 mx-1" style={{ width: '18rem', marginBottom: '1rem' }}>
            <img src={`https://covers.openlibrary.org/b/id/${entry?.work.cover_id}.jpg`} loading='lazy' style={{ height: '15rem' }} className="card-img-top" alt="" />
            <div className="card-body">
              <h5 className="card-title mb-2" style={{ minHeight: '3rem' }}>{entry?.work?.title}</h5>
              <p className="card-text mb-2">{entry?.work?.author_names}</p>
              <p className="card-text mb-2">{entry?.work?.first_publish_year}</p>
              <button
                className={`btn ${readStatus[index] ? 'btn-success' : 'btn-primary'} mt-2`}
                onClick={() => handleToggleReadStatus(index)}
              >
                {readStatus[index] ? 'Read' : 'Not Read'}
              </button>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default Books;
