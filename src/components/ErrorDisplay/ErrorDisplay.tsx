import React from 'react'
import { ErrorDisplayProps } from '../../interfaces/props/ErrorDisplayProps'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import './ErrorDisplay.css'

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => {
    return (
        <div className="error-display">
            <div className="error-title">
                <FontAwesomeIcon
                    className="error-icon"
                    icon={faTriangleExclamation}
                />
                <h1>ERROR</h1>
            </div>
            <p>{errorMessage}</p>
        </div>
    )
}

export default ErrorDisplay