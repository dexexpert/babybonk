import React from 'react';
import './VideoBackground.css'; // Import your CSS file
import backgroundVideo from './bgvid.mp4'

const VideoBackground = () => {
    return (
        <video autoPlay loop muted playsInline className="video-background">
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
};

export default VideoBackground;
