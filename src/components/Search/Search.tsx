import React, { useState } from 'react';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchProps } from '../../interfaces/props/SearchProps';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.length) {
            onSearch(inputValue);
            setInputValue('');
        }
    }

    return (
        <div className="search-form" onSubmit={handleSearch}>
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
        </div>
    );
}

export default Search;
