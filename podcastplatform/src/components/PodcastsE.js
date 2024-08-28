import React, { useState, useEffect } from "react";
import "./PodcastsE.css";
import PodItem from "./PodItem.js";
import pod1 from "./images/pod1.jpg";
import axios from "./services/axios.js";

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/podcasts");
        setPodcasts(response.data);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="pod">
      <h1>A wide variety of podcasts!</h1>
      <div className="pod_container">
        <ul className="pod_items">
          {podcasts.map((podcast) => (
            <PodItem
              key={podcast.id}
              src={
                podcast.image
                  ? `${process.env.REACT_APP_API_URL}/storage/${podcast.image}`
                  : pod1
              }
              text={podcast.description}
              label={podcast.category || "Category"}
              path={`/podcast/`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Podcasts;
