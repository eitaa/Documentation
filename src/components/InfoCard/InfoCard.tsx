import React from 'react';
import './infocard.css';

interface InfoCardProps {
  title: string;
  icon?: React.ReactNode;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  description,
  buttonText = 'بیشتر بدانید',
  onButtonClick,
}) => {
  return (
    <div
      className="info-card" onClick={onButtonClick}
    >
      <div className="info-card-header">
        <h4 className="info-card-title">{title}</h4>
        <div className="info-card-icon">{icon}</div>
      </div>
      <p className="info-card-desc">{description}</p>
      <button className="info-card-btn">
        {buttonText}
      </button>
    </div>
  );
};

export default InfoCard;
