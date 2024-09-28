import React, { useState } from 'react';
import './Search.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search: React.FC<{ onSearch: (city: string) => void }> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.length) {
            onSearch(inputValue);
            setInputValue('');
        }
    }

    return (
        <form className="search-form" onSubmit={handleSearch}>
            <input
                type='text'
                className="search-input"
                placeholder='Enter city name:'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type='submit' className="search-button">
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </form>
    );
}

export default Search;
