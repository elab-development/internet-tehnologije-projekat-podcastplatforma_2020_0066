import React, { useRef, useState, useEffect } from "react";
import "./FullPodcast.css";
import pod5 from "./images/pod5.jpeg";
import episode1Audio from "./audio/episode1.mp3";
import episode2Audio from "./audio/episode2.mp3";
import episode3Audio from "./audio/episode3.mp3";
import axios from "./services/axios";

const podcastData = {
  id: 1,
  name: "How I built this",
  description:
    "Interviews with entrepreneurs and innovators, sharing the stories behind the founding of their companies.",
  image: pod5,
  episodes: [
    {
      id: 1,
      title: "Episode 1: Introduction",
      description: "Welcome to our first episode!",
      audioUrl: episode1Audio,
    },
    {
      id: 2,
      title: "Episode 2: Deep Dive",
      description: "We dive deep into a fascinating topic.",
      audioUrl: episode2Audio,
    },
    {
      id: 3,
      title: "Episode 3: Special Guest",
      description: "An episode with a special guest.",
      audioUrl: episode3Audio,
    },
  ],
};

function PodcastPage() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setCurrentUser(null);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="podcast-page">
      <div className="podcast-details">
        <img
          src={podcastData.image}
          alt={podcastData.name}
          className="podcast-image"
        />
        <h2 className="podcast-name">{podcastData.name}</h2>
        <p className="podcast-description">{podcastData.description}</p>
        <div className="episodes-list">
          <h3>Episodes</h3>
          <ul>
            {podcastData.episodes.map((episode) => (
              <li key={episode.id} className="episode-item">
                <h4>{episode.title}</h4>
                <p>{episode.description}</p>
                <AudioPlayer
                  audioUrl={episode.audioUrl}
                  currentUser={currentUser}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AudioPlayer({ audioUrl, currentUser }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setCurrentTime(audio.currentTime);
        if (!currentUser) {
          if (audio.currentTime > 60) {
            audio.currentTime = 60;
            audio.pause();
          }
        }
      }
    };

    const setAudioData = () => {
      if (!isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioData);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, []);

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} controls></audio>
    </div>
  );
}

export default PodcastPage;
