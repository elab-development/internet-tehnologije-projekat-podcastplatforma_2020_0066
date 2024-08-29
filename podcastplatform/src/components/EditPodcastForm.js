import React, { useState, useEffect } from "react";
import axios from "./services/axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditPodcastForm.css";

function EditPodcastForm() {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState("");
  const [updatedPodcast, setUpdatedPodcast] = useState({
    title: "",
    description: "",
    image: null,
    category: "",
  });

  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [updatedEpisode, setUpdatedEpisode] = useState({
    title: "",
    description: "",
    audio_file: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcastAndEpisodes = async () => {
      try {
        const podcastResponse = await axios.get(`/podcasts/${podcastId}`);
        setPodcast(podcastResponse.data);
        setUpdatedPodcast({
          title: podcastResponse.data.title,
          description: podcastResponse.data.description,
          image: podcastResponse.data.image,
          category: podcastResponse.data.category,
        });

        const episodesResponse = await axios.get(
          `/podcasts/${podcastId}/episodes`
        );
        setEpisodes(episodesResponse.data);
      } catch (error) {
        console.error("Failed to fetch podcast or episodes", error);
        setError("Failed to fetch podcast or episodes.");
      }
    };

    fetchPodcastAndEpisodes();
  }, [podcastId]);

  const handlePodcastChange = (e) => {
    const { name, value, files } = e.target;
    setUpdatedPodcast((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEpisodeChange = (e) => {
    const { name, value, files } = e.target;
    setUpdatedEpisode((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handlePodcastSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", updatedPodcast.title);
    formData.append("description", updatedPodcast.description);
    if (updatedPodcast.image) formData.append("image", updatedPodcast.image);
    formData.append("category", updatedPodcast.category);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      await axios.put(`/podcasts/${podcastId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        Authorization: `Bearer ${token}`,
      });
      alert("Podcast updated successfully!");
    } catch (error) {
      console.error("Failed to update podcast", error);
      setError("Failed to update podcast.");
    }
  };

  const handleEpisodeSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEpisode) {
      setError("Please select an episode to edit.");
      return;
    }

    const formData = new FormData();
    formData.append("title", updatedEpisode.title);
    formData.append("description", updatedEpisode.description);
    if (updatedEpisode.audio_file)
      formData.append("audio_file", updatedEpisode.audio_file);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      await axios.put(
        `/podcasts/${podcastId}/episodes/${selectedEpisode}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          Authorization: `Bearer ${token}`,
        }
      );
      alert("Episode updated successfully!");
    } catch (error) {
      console.error("Failed to update episode", error);
      setError("Failed to update episode.");
    }
  };

  const handleEpisodeSelect = async (e) => {
    const episodeId = e.target.value;
    setSelectedEpisode(episodeId);
    if (episodeId) {
      try {
        const episodeResponse = await axios.get(
          `/podcasts/${podcastId}/episodes/${episodeId}`
        );
        setUpdatedEpisode({
          title: episodeResponse.data.title,
          description: episodeResponse.data.description,
          audio_file: null,
        });
      } catch (error) {
        console.error("Failed to fetch episode", error);
        setError("Failed to fetch episode details.");
      }
    } else {
      setUpdatedEpisode({
        title: "",
        description: "",
        audio_file: null,
      });
    }
  };

  const handleDeletePodcast = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      await axios.delete(`/podcasts/${podcastId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Podcast deleted successfully!");
      navigate("/explore");
    } catch (error) {
      console.error("Failed to delete podcast", error);
      setError("Failed to delete podcast.");
    }
  };

  const handleDeleteEpisode = async () => {
    if (!selectedEpisode) {
      setError("Please select an episode to delete.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found.");
        return;
      }

      await axios.delete(`/podcasts/${podcastId}/episodes/${selectedEpisode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Episode deleted successfully!");
      setEpisodes((prev) => prev.filter((ep) => ep.id !== selectedEpisode));
      setSelectedEpisode(null);
    } catch (error) {
      console.error("Failed to delete episode", error);
      setError("Failed to delete episode.");
    }
  };

  return (
    <div className="edit-podcast-form">
      <h1>Edit Podcast and Episodes</h1>
      {error && <p className="error">{error}</p>}
      {podcast && (
        <form onSubmit={handlePodcastSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={updatedPodcast.title}
            onChange={handlePodcastChange}
            required
          />
          <label>Description</label>
          <textarea
            name="description"
            value={updatedPodcast.description}
            onChange={handlePodcastChange}
            required
          ></textarea>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={updatedPodcast.category}
            onChange={handlePodcastChange}
            required
          />
          <label>Podcast Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handlePodcastChange}
          />
          <button type="submit">Update Podcast</button>
          <button type="button" onClick={handleDeletePodcast}>
            Delete Podcast
          </button>
        </form>
      )}

      <h2>Edit Episodes</h2>
      <select onChange={handleEpisodeSelect} value={selectedEpisode || ""}>
        <option value="">Select Episode</option>
        {episodes.map((episode) => (
          <option key={episode.id} value={episode.id}>
            {episode.title}
          </option>
        ))}
      </select>
      {selectedEpisode && (
        <form onSubmit={handleEpisodeSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={updatedEpisode.title}
            onChange={handleEpisodeChange}
            required
          />
          <label>Description</label>
          <textarea
            name="description"
            value={updatedEpisode.description}
            onChange={handleEpisodeChange}
            required
          ></textarea>
          <label>Audio File</label>
          <input
            type="file"
            name="audio_file"
            accept="audio/*"
            onChange={handleEpisodeChange}
          />
          <button type="submit">Update Episode</button>
          <button type="button" onClick={handleDeleteEpisode}>
            Delete Episode
          </button>
        </form>
      )}
    </div>
  );
}

export default EditPodcastForm;
