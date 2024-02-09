import React, { useEffect, useState } from 'react';

import SearchDropdown from './SearchDropdown';
import '../searchDrop.css'
import '../search.css'; 
import axios from 'axios';

function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const [newBooks, setNewBooks] = useState([])

  const [books, setBooks] = useState([]);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("All");
  // const [dropData, setDropData] = useState("")

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (value) => {
     
    setSelectedValue(value);
    setDropdownOpen(false);
  };

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

  const handleSearch = (value) => {
    // valu.preventDefault();
    setSearchValue(value);
   setTimeout(() => {
    const filteredBooks = books.filter((book) => {
      // Check if book.work.title is not null before using includes
      if (book?.work?.title !== null && book?.work?.title.includes(value)) {
        return book?.work?.title 
      } // Or you can omit this line if you don't want to include null values
    });
   setNewBooks(filteredBooks);
   }, 500)
   
    // You can use the searchValue here or pass it to a parent component or function
  };



  return (
    
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand text-primary" href="/">
            Books
          </a>
          <form className="d-flex">
          <div className="search-container">
      <div className="search-bar">
        <button className='drop-button' onClick={toggleDropdown}>{selectedValue}</button>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <p onClick={() => handleOptionClick("All")}>All</p>
          <p onClick={() => handleOptionClick("Title")}>Title</p>
          <p onClick={() => handleOptionClick("Author")}>Author</p>
        </div>
      )}
    </div>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              value={searchValue}
              aria-label="Search"
              onChange={(e) => handleSearch(e.target.value)}
              onBlur={(e) => setNewBooks(([]))}
            />
            {newBooks.length>0 && 
            (<div className='search-down'>
              <SearchDropdown books={newBooks}></SearchDropdown>
              </div>
            )
              }
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
