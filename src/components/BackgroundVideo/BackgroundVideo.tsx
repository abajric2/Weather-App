import React, { useEffect, useRef } from 'react'
import { BackgroundVideoProps } from '../../interfaces/props/BackgroundVideoProps';
import './BackgroundVideo.css'

const dayBackground = '/videos/daySky.mp4';
const nightBackground = '/videos/nightSky.mp4';

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({isDay}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = isDay ? dayBackground : nightBackground;
            videoRef.current.load(); 

            const handleCanPlayThrough = () => {
                videoRef.current?.play(); 
                videoRef.current?.removeEventListener('canplaythrough', handleCanPlayThrough); 
            };

            videoRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
        }
    }, [isDay])

    return (
        <video ref={videoRef} autoPlay muted loop className={`background-video ${isDay ? 'day' : 'night'}`}>
            <source src={isDay ? dayBackground : nightBackground} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

export default BackgroundVideo