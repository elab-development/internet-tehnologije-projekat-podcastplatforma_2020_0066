import React, { useRef, useState, useEffect } from "react";
import "./FullPodcast.css";
import axios from "./services/axios";
import { useParams } from "react-router-dom";
import pod1 from "./images/pod1.jpg";

function PodcastPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);

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

  useEffect(() => {
    const fetchPodcastAndEpisodes = async () => {
      try {
        setLoading(true);
        const podcastResponse = await axios.get(`/podcasts/${podcastId}`);
        setPodcast(podcastResponse.data);

        const episodesResponse = await axios.get(
          `/podcasts/${podcastId}/episodes`
        );
        setEpisodes(episodesResponse.data);
      } catch (error) {
        console.error("Failed to fetch podcast or episodes", error);
        setPodcast(null);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastAndEpisodes();
  }, [podcastId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!podcast) {
    return <p>Podcast not found.</p>;
  }

  return (
    <div className="podcast-page">
      <div className="podcast-details">
        <img
          src={
            podcast.image
              ? podcast.image.includes("http")
                ? podcast.image
                : `${process.env.REACT_APP_MEDIA_URL}/${podcast.image}`
              : pod1
          }
          alt={podcast.title}
          className="podcast-image"
        />

        <h2 className="podcast-name">{podcast.title}</h2>
        <p className="podcast-description">{podcast.description}</p>
        <div className="episodes-list">
          <h3>Episodes</h3>
          <ul>
            {episodes.length > 0 ? (
              episodes.map((episode) => {
                const audioUrl = episode.audio_file
                  ? episode.audio_file.includes("http") // Ensure URL is correctly formed
                    ? episode.audio_file
                    : `${process.env.REACT_APP_MEDIA_URL}/storage/${episode.audio_file}`
                  : null;
                console.log("Episode Audio URL:", audioUrl);
                return (
                  <li key={episode.id} className="episode-item">
                    <h4>{episode.title}</h4>
                    <p>{episode.description}</p>
                    {audioUrl ? (
                      <AudioPlayer
                        audioUrl={audioUrl}
                        currentUser={currentUser}
                      />
                    ) : (
                      <p>No audio available.</p>
                    )}
                  </li>
                );
              })
            ) : (
              <p>No episodes available.</p>
            )}
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
