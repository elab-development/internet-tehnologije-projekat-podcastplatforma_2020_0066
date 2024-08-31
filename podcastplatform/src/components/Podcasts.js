import React, { useState, useEffect } from "react";
import "./Podcasts.css";
import PodItem from "./PodItem.js";
import pod1 from "./images/pod1.jpg";
import axios from "./services/axios.js";

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserDataAndPodcasts = async () => {
      try {
        const token = localStorage.getItem("token");
        let favorites = [];

        if (token) {
          try {
            const userResponse = await axios.get("/user", {
              headers: { Authorization: `Bearer ${token}` },
            });

            setCurrentUser(userResponse.data);

            const favoritesResponse = await axios.get("/user/favorites", {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (Array.isArray(favoritesResponse.data)) {
              favorites = favoritesResponse.data.map((podcast) => podcast.id);
            } else {
              console.error(
                "Favorites response is not an array:",
                favoritesResponse.data
              );
            }
          } catch (error) {
            console.error("Error fetching user or favorites:", error);
          }
        }

        const podcastsResponse = await axios.get(
          "http://127.0.0.1:8000/api/podcasts"
        );

        if (Array.isArray(podcastsResponse.data)) {
          const podcastsData = podcastsResponse.data
            .slice(4, 8)
            .map((podcast) => ({
              ...podcast,
              isFavorited: favorites.includes(podcast.id),
            }));

          setPodcasts(podcastsData);
        } else {
          console.error(
            "Podcasts response is not an array:",
            podcastsResponse.data
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndPodcasts();
  }, []);

  return (
    <div className="pod">
      <h1>Check out these popular podcasts!</h1>
      <div className="pod__container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="pod__items">
            {podcasts.length > 0 ? (
              podcasts.map((podcast) => (
                <PodItem
                  key={podcast.id}
                  src={
                    podcast.image
                      ? podcast.image.includes("http")
                        ? podcast.image
                        : `${process.env.REACT_APP_MEDIA_URL}/${podcast.image}`
                      : pod1
                  }
                  text={podcast.description}
                  label={podcast.category}
                  path={`/podcast/${podcast.id}`}
                  podcastId={podcast.id}
                  isFavorited={podcast.isFavorited}
                  currentUser={currentUser}
                />
              ))
            ) : (
              <p>No podcasts available</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Podcasts;
