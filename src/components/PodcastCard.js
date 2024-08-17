import React from 'react';

const PodcastCard = ({ title, description }) => {
  return (
    <div className="podcast-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default PodcastCard;