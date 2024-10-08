import React from 'react'
import './FavoritesList.css'
import { FavoritesListProps } from '../../interfaces/props/FavoritesListProps'
import classNames from 'classnames';

const FavoritesList: React.FC<FavoritesListProps> = ({ favoriteCities, onClose, isMenuOpen, onSelect }) => {
    return (
        <div className={classNames('favorite-cities-menu', { 'show': isMenuOpen, 'hide': !isMenuOpen })}>
            <div className='close-button-container'>
                <img
                    src="/icons/close-icon.svg"
                    alt="Close Icon"
                    onClick={onClose}
                    className="close-button"
                />
            </div>
            <div className='favorite-cities-title'>
                <img
                    src="/icons/heart-icon.svg"
                    alt="Heart Icon"
                    className='heart-icon'
                />
                <h2>Favorite Cities</h2>
            </div>
            <div className="cities-list">
                {favoriteCities.map((city, index) => (
                    <CityItem
                        key={index}
                        city={city}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    )
}

interface CityItemProps {
    city: string;
    onSelect: (city: string) => void;
}

const CityItem: React.FC<CityItemProps> = ({ city, onSelect }) => (
    <div className="city-item" onClick={() => onSelect(city)}>
        <div className='favorite-city-name'>
            <img
                src="/icons/location-dot-icon.svg"
                alt="Location Dot Icon"
                className='favorite-city-location-icon'
            />
            <p>{city}</p>
        </div>
        <hr className="divider" />
    </div>
);

export default FavoritesList