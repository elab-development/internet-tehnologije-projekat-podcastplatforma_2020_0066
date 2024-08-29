import React, { useState, useEffect } from "react";
import "./PodForm.css";
import axios from "./services/axios";

function AddEpisode() {
  const [action, setAction] = useState("newPodcast");
  const [podcastName, setPodcastName] = useState("");
  const [podcastDescription, setPodcastDescription] = useState("");
  const [podcastImage, setPodcastImage] = useState(null);
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [episodeDescription, setEpisodeDescription] = useState("");
  const [episodeFile, setEpisodeFile] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState("");
  const [error, setError] = useState("");
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/podcasts", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPodcasts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch podcasts", error);
        setError("Failed to fetch podcasts.");
      }
    };

    fetchPodcasts();
  }, []);

  const handleActionChange = (e) => {
    setAction(e.target.value);
    setError("");
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (action === "newPodcast") {
        if (
          !podcastName ||
          !podcastDescription ||
          !podcastImage ||
          !episodeTitle ||
          !episodeDescription ||
          !episodeFile
        ) {
          setError(
            "All fields are required for adding a new podcast and episode."
          );
          return;
        }

        const formDataPodcast = new FormData();
        formDataPodcast.append("title", podcastName);
        formDataPodcast.append("description", podcastDescription);
        formDataPodcast.append("image", podcastImage);

        const podcastResponse = await axios.post("/podcasts", formDataPodcast, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const podcastId = podcastResponse.data.id;

        const formDataEpisode = new FormData();
        formDataEpisode.append("title", episodeTitle);
        formDataEpisode.append("description", episodeDescription);
        formDataEpisode.append("audio_file", episodeFile);

        await axios.post(`/podcasts/${podcastId}/episodes`, formDataEpisode, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        if (
          !selectedPodcast ||
          !episodeTitle ||
          !episodeDescription ||
          !episodeFile
        ) {
          setError(
            "All fields are required for adding an episode to an existing podcast."
          );
          return;
        }

        const formData = new FormData();
        formData.append("title", episodeTitle);
        formData.append("description", episodeDescription);
        formData.append("audio_file", episodeFile);

        await axios.post(`/podcasts/${selectedPodcast}/episodes`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
    } catch (error) {
      console.error("Failed to submit form", error);
      setError("Failed to submit form.");
    }
  };

  const resetForm = () => {
    setPodcastName("");
    setPodcastDescription("");
    setPodcastImage(null);
    setEpisodeTitle("");
    setEpisodeDescription("");
    setEpisodeFile(null);
    setSelectedPodcast("");
  };

  return (
    <div className="add-episode-container">
      <h1>Add Episode</h1>
      <form onSubmit={handleSubmit}>
        <div className="option-selection">
          <label>
            <input
              type="radio"
              name="action"
              value="newPodcast"
              checked={action === "newPodcast"}
              onChange={handleActionChange}
            />
            Add New Podcast and Episode
          </label>
          <label>
            <input
              type="radio"
              name="action"
              value="existingPodcast"
              checked={action === "existingPodcast"}
              onChange={handleActionChange}
            />
            Add Episode to Existing Podcast
          </label>
        </div>

        {action === "newPodcast" && (
          <>
            <div className="input-field">
              <label>Podcast Name</label>
              <input
                type="text"
                value={podcastName}
                onChange={(e) => setPodcastName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label>Podcast Description</label>
              <textarea
                value={podcastDescription}
                onChange={(e) => setPodcastDescription(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label>Podcast Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPodcastImage(e.target.files[0])}
                required
              />
            </div>
          </>
        )}

        {action === "existingPodcast" && (
          <div className="input-field">
            <label>Select Podcast</label>
            <select
              value={selectedPodcast}
              onChange={(e) => setSelectedPodcast(e.target.value)}
              required
            >
              <option value="">-- Select Podcast --</option>
              {podcasts.map((podcast) => (
                <option key={podcast.id} value={podcast.id}>
                  {podcast.title} {/* Display podcast title */}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="input-field">
          <label>Episode Title</label>
          <input
            type="text"
            value={episodeTitle}
            onChange={(e) => setEpisodeTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label>Episode Description</label>
          <textarea
            value={episodeDescription}
            onChange={(e) => setEpisodeDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label>Episode MP3 File</label>
          <input
            type="file"
            accept="audio/mp3"
            onChange={(e) => setEpisodeFile(e.target.files[0])}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button">
          {action === "newPodcast" ? "Add Podcast and Episode" : "Add Episode"}
        </button>
      </form>
    </div>
  );
}

export default AddEpisode;
