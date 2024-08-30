/*import React, { useState, useEffect } from "react";
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
          const favoritesResponse = await axios.get("/user/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });
          favorites = favoritesResponse.data.map((podcast) => podcast.id);
        }

        const podcastsResponse = await axios.get(
          `http://127.0.0.1:8000/api/podcasts/all?page=` + currentPage
        );

        if (podcastsResponse.data && podcastsResponse.data.data) {
          const podcastsData = podcastsResponse.data.data.map((podcast) => ({
            ...podcast,
            isFavorited: favorites.includes(podcast.id),
          }));

          setPodcasts(podcastsData);
          setFilteredPodcasts(podcastsData);
          setTotalPages(podcastsResponse.data.last_page || 1);
        } else {
          console.error(
            "Unexpected podcastsResponse data structure:",
            podcastsResponse.data
          );
        }

        const usersResponse = await axios.get(
          "http://127.0.0.1:8000/api/admins"
        );
        if (usersResponse.data) {
          setUsers(usersResponse.data);
        } else {
          console.error(
            "Unexpected usersResponse data structure:",
            usersResponse.data
          );
        }
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    fetchPodcasts();
  }, [currentPage]);

  useEffect(() => {
    const fetchFilteredPodcasts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/search-podcasts?query=${searchQuery}&page=${currentPage}`
        );
        if (response.data && response.data.data) {
          setFilteredPodcasts(response.data.data);
          setTotalPages(response.data.last_page || 1);
        } else {
          console.error("Unexpected response data structure:", response.data);
        }
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
      if (response.data && response.data.data) {
        setFilteredPodcasts(response.data.data);
        setTotalPages(response.data.last_page || 1);
      } else {
        console.error("Unexpected response data structure:", response.data);
      }
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
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Podcasts;*/
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
          const favoritesResponse = await axios.get("/user/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });
          favorites = favoritesResponse.data.map((podcast) => podcast.id);
        }

        const podcastsResponse = await axios.get(
          "http://127.0.0.1:8000/api/podcasts/all"
        );

        const podcastsData = podcastsResponse.data.data.map((podcast) => ({
          ...podcast,
          isFavorited: favorites.includes(podcast.id),
        }));

        setPodcasts(podcastsData);
        setFilteredPodcasts(podcastsData);

        setTotalPages(podcastsResponse.data.last_page); // Update total pages

        const usersResponse = await axios.get(
          "http://127.0.0.1:8000/api/admins"
        );
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
        setFilteredPodcasts(response.data.data);
        setTotalPages(response.data.last_page); // Update total pages
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
      setFilteredPodcasts(response.data.data);
      setTotalPages(response.data.last_page); // Update total pages
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
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    setCurrentPage(1); // Reset to the first page on user change
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
