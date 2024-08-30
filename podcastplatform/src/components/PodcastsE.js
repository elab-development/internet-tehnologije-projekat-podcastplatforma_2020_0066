import React, { useState, useEffect } from "react";
import "./PodcastsE.css";
import PodItem from "./PodItem.js";
import pod1 from "./images/pod1.jpg";
import axios from "./services/axios.js";

function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const token = localStorage.getItem("token");
        let favorites = [];

        if (token) {
          try {
            const favoritesResponse = await axios.get("/user/favorites", {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Favorites Response:", favoritesResponse);

            const favoritesData = favoritesResponse.data ?? [];

            if (Array.isArray(favoritesData)) {
              favorites = favoritesData.map((podcast) => podcast.id);
            } else {
              console.log("Favorites data is not an array.");
            }
          } catch (error) {
            console.error("Error fetching favorites:", error);
          }
        } else {
          console.log("No token found, skipping favorites fetch.");
        }

        const podcastsResponse = await axios.get(
          "http://127.0.0.1:8000/api/podcasts/all"
        );
        console.log("Podcasts Response:", podcastsResponse);

        if (podcastsResponse.data) {
          const podcastsData = podcastsResponse.data.map((podcast) => ({
            ...podcast,
            isFavorited: favorites.includes(podcast.id),
          }));

          setPodcasts(podcastsData);
          setFilteredPodcasts(podcastsData);
          setTotalPages(podcastsResponse.data.last_page);
        } else {
          console.log("Podcasts data is not an array or is undefined.");
        }

        const usersResponse = await axios.get(
          "http://127.0.0.1:8000/api/admins"
        );
        console.log("Users Response:", usersResponse);

        setUsers(usersResponse.data);
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
          `http://127.0.0.1:8000/api/search-podcasts?query=${searchQuery}&page=${currentPage}`
        );
        console.log("Filtered Podcasts Response:", response);
        setFilteredPodcasts(response.data.data);
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error("Error fetching filtered podcasts:", error);
      }
    };

    if (searchQuery.length > 0) {
      fetchFilteredPodcasts();
    } else {
      setFilteredPodcasts(podcasts);
    }
  }, [searchQuery, podcasts, currentPage]);

  const fetchPodcastsByUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/podcasts/filter/${userId}?page=${currentPage}`
      );
      console.log("Podcasts By User Response:", response);
      setFilteredPodcasts(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching podcasts by user:", error);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchPodcastsByUser(selectedUser);
    } else {
      setFilteredPodcasts(podcasts);
    }
  }, [selectedUser, podcasts, currentPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
      <select
        value={selectedUser}
        onChange={handleUserChange}
        className="user-select"
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <div className="pod__container">
        <div className="pod__wrapper">
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
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Podcasts;
