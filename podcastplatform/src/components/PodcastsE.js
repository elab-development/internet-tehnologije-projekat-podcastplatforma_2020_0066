import React, { useState, useEffect } from "react";
import "./PodcastsE.css";
import PodItem from "./PodItem.js";
import pod1 from "./images/pod1.jpg";
import axios from "./services/axios.js";

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const token = localStorage.getItem("token");
        let favorites = [];

        if (token) {
          const userResponse = await axios.get("/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(userResponse.data);

          const favoritesResponse = await axios.get("/user/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });
          favorites = favoritesResponse.data.map((podcast) => podcast.id);
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/podcasts/all"
        );

        const podcastsData = response.data.map((podcast) => ({
          ...podcast,
          isFavorited: favorites.includes(podcast.id),
        }));

        setPodcasts(podcastsData);
	setFilteredPodcasts(podcastsData); 
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, []);

useEffect(() => {
    const fetchFilteredPodcasts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/search-podcasts?query=${searchQuery}`
        );
        setFilteredPodcasts(response.data);
      } catch (error) {
        console.error("Error fetching filtered podcasts:", error);
      }
    };

    if (searchQuery.length > 0) {
      fetchFilteredPodcasts();
    } else {
      setFilteredPodcasts(podcasts);
    }
  }, [searchQuery, podcasts]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="pod">
      <h1>A wide variety of podcasts!</h1>
 <input
        type="text"
        placeholder="Search podcasts..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="pod__container">
        <div className="pod__wrapper ">
          <ul className="pod__items">

           {filteredPodcasts.map((podcast) => (
              <PodItem
                key={podcast.id}
                src={
                  podcast.image
                    ? `${process.env.REACT_APP_MEDIA_URL}/storage/${podcast.image}`
                    : pod1
                }
                text={podcast.title}
                label={podcast.category || "Category"}
                path={`/podcast/${podcast.id}`}
                isFavorited={podcast.isFavorited}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Podcasts;
