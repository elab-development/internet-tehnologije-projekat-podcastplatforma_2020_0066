import React, { useState, useEffect } from "react";
import "./Podcasts.css";
import PodItem from "./PodItem.js";
import pod1 from "./images/pod1.jpg";
import pod2 from "./images/pod2.avif";
import pod3 from "./images/pod3.jpg";
import pod4 from "./images/pod4.png";
import pod5 from "./images/pod5.jpeg";
import axios from "./services/axios.js";

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/podcasts");
        setPodcasts(response.data.slice(0, 4));
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
      <h1>Check out these popular podcasts!</h1>
      <div className="pod__container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul className="pod__items">
              {podcasts.length > 0 ? (
                podcasts.map((podcast) => (
                  <PodItem
                    key={podcast.id}
                    src={
                      podcast.image
                        ? `${process.env.REACT_APP_API_URL}/storage/${podcast.image}`
                        : pod1
                    }
                    text={podcast.description}
                    //label={podcast.category || "Category"} // Adjust as needed
                    path={`/podcast`}
                  />
                ))
              ) : (
                <p>No podcasts available</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Podcasts;
