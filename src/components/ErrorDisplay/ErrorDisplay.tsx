import React from 'react'
import { ErrorDisplayProps } from '../../interfaces/props/ErrorDisplayProps'
import './ErrorDisplay.css'

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errorMessage }) => {
    return (
        <div className="error-display">
            <div className="error-title">
                <img
                    src="/icons/error-icon.svg"
                    alt="Error Icon"
                    className="error-icon"
                />
                <h1>ERROR</h1>
            </div>
            <p>{errorMessage}</p>
        </div>
    )
}

export default ErrorDisplay