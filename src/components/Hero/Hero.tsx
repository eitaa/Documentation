import React from 'react';
import './hero.css';

const Hero: React.FC = () => {
    return (
        <div className="hero-container">
            <div className="video-card">
                <video width="100%" height="100%" controls poster='/img/cover.webp'>
                    <source src={"/videos/MiniAppIntro.mp4"} type="video/mp4" />
                    مرورگر شما از این فرمت پشتیبانی نمی‌کند.
                </video>
            </div>
        </div>
    );
}

export default Hero;
