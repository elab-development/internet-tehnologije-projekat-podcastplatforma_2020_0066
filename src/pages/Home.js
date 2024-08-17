import React, { useState, useEffect } from 'react';
import PodcastCard from '../components/PodcastCard';

const Home = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Primer fetchovanja podataka sa API-ja
    fetch('/api/podcasts')
      .then(response => response.json())
      .then(data => setPodcasts(data));
  }, []);

  return (
    <div>
      <h1>Welcome to the Podcast Platform</h1>
      <div className="podcast-list">
        {podcasts.map(podcast => (
          <PodcastCard key={podcast.id} title={podcast.title} description={podcast.description} />
        ))}
      </div>
    </div>
  );
};

export default Home;
