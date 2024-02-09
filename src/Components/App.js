import React, { useEffect, useState } from 'react'
import Books from './Books'
import Navbar from './Navbar'
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/people/mekBot/books/already-read.json');
        setBooks(response?.data?.reading_log_entries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
       <Navbar books={books}></Navbar>
       <Books books={books}></Books>
       </>
  )
}

export default App