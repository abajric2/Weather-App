import React from 'react'
import { NoResultsInfoProps } from '../../interfaces/props/NoResultsInfoProps'
import './NoResultsInfo.css'

const NoResultsInfo: React.FC<NoResultsInfoProps> = ({ city }) => {
    return (
        <div className="no-result-info">
            <img
                src="/icons/face-frown-icon.svg"
                alt="Face Frown Icon"
                className="no-result-icon"
            />
            <h1>No results for "{city}"</h1>
        </div>
    )
}

export default NoResultsInfo