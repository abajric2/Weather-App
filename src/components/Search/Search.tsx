import React, { useState } from 'react'
import { SearchProps } from '../../interfaces/SearchProps';

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
        <form onSubmit={handleSearch}>
            <input
                type='text'
                placeholder='Enter city name:'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
    )
}

export default Search