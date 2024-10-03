import React from 'react'
import './FavoritesList.css'
import { FavoritesListProps } from '../../interfaces/props/FavoritesListProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const FavoritesList: React.FC<FavoritesListProps> = ({ favoriteCities, onClose, isMenuOpen, onSelect }) => {
    return (
        <div className={`favorite-cities-menu ${isMenuOpen ? 'show' : 'hide'}`}>
            <div className='close-button-container'>
                <FontAwesomeIcon
                    className='close-button'
                    onClick={onClose}
                    icon={faXmark}
                />
            </div>
            <div className='favorite-cities-title'>
                <FontAwesomeIcon
                    className='heart-icon'
                    icon={faHeart}
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
            <FontAwesomeIcon
                className='favorite-city-location-icon'
                icon={faLocationDot}
            />
            <p>{city}</p>
        </div>
        <hr className="divider" />
    </div>
);

export default FavoritesList