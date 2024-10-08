import React, { useState } from 'react';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchProps } from '../../interfaces/props/SearchProps';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleSearch = () => {
        if (inputValue.length) {
            onSearch(inputValue);
            setInputValue('');
        }
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-form">
            <input
                type='text'
                className="search-input"
                placeholder='Enter city name:'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleEnterPress}
            />
            <button
                type='button'
                className="search-button"
                onClick={handleSearch}
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

export default Search;
