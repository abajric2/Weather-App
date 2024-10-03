import React from 'react'
import { NoResultsInfoProps } from '../../interfaces/props/NoResultsInfoProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './NoResultsInfo.css'

const NoResultsInfo: React.FC<NoResultsInfoProps> = ({ city }) => {
    return (
        <div className="no-result-info">
            <FontAwesomeIcon
                icon={faFrown}
                className="no-result-icon"
            />
            <h1>No results for "{city}"</h1>
        </div>
    )
}

export default NoResultsInfo