/*import React, { useState, useEffect } from "react";
import "./Fav.css";
import FavoriteButton from "./FavButton";
import PodItem from "./PodItem.js";
import { Button } from "./Button.js";
import pod1 from "./images/pod1.jpg";
import pod2 from "./images/pod2.avif";
import pod3 from "./images/pod3.jpg";
import pod4 from "./images/pod4.png";
import pod5 from "./images/pod5.jpeg";
import axios from "./services/axios";

function Podcasts() {
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (user && token) {
        setCurrentUser(user);

        axios
          .get("/user/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setFavorites(response.data);
          })
          .catch((error) => {
            console.error("Failed to fetch favorites", error);
            setFavorites([]);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pod">
      <h1>Favourites</h1>
      <div className="pod__container">
        {favorites.length > 0 ? (
          <ul className="pod__items">
            {favorites.map((podcast) => (
              <li key={podcast.id}>
                <PodItem
                  src={podcast.image}
                  text={podcast.description}
                  label={podcast.category}
                  path={`/podcast`}
                />
                <FavoriteButton
                  podcastId={podcast.id}
                  isFavorited={true}
                  currentUser={currentUser}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite podcasts yet.</p>
        )}

        {currentUser?.admin && (
          <>
            <h1>My Podcasts</h1>
            <ul className="pod__items">
              <PodItem
                src={pod3}
                text="A daily news podcast by The New York Times, offering in-depth analysis of current events."
                label="News"
                path="/podcast"
              />
              <PodItem
                src={pod4}
                text="A true crime podcast that explores one story over an entire season, known for its investigative journalism."
                label="True Crime"
                path="/podcast"
              />
              <PodItem
                src={pod5}
                text="Interviews with entrepreneurs and innovators, sharing the stories behind the founding of their companies."
                label="Business"
                path="/podcast"
              />
              <PodItem
                src={pod1}
                text="A weekly true crime podcast that dives into captivating and suspenseful cases."
                label="True Crime"
                path="/podcast"
              />
            </ul>
            <div className="hero-btns">
              <Button
                className="btns"
                buttonStyle="btn--primary"
                buttonSize="btn--large"
                onClick={() => console.log("hey")}
                to="/addpod"
              >
                Add new episode
                <i className="far fa-play-circle" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Podcasts;
*/

/*
import React, { useState, useEffect } from "react";
import "./Fav.css";
import FavoriteButton from "./FavButton";
import pod1 from "./images/pod1.jpg";
import PodItem from "./PodItem.js";
import { Button } from "./Button.js";
import axios from "./services/axios";

function Podcasts() {
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserDataAndPodcasts = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (user && token) {
        setCurrentUser(user);

        try {
          // Fetch favorite podcasts
          const favoritesResponse = await axios.get("/user/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorites(favoritesResponse.data);

          // Fetch all podcasts for admin users
          if (user.admin) {
            const allPodcastsResponse = await axios.get("/podcasts", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setAllPodcasts(allPodcastsResponse.data);
          }
        } catch (error) {
          console.error("Failed to fetch data", error);
          setFavorites([]);
          if (user.admin) {
            setAllPodcasts([]);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadUserDataAndPodcasts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pod">
      <h1>Favourites</h1>
      <div className="pod__container">
        {favorites.length > 0 ? (
          <ul className="pod__items">
            {favorites.map((podcast) => (
              <li key={podcast.id}>
                <PodItem
                  src={
                    podcast.image
                      ? `${process.env.REACT_APP_API_URL}/storage/${podcast.image}`
                      : pod1
                  }
                  text={podcast.description}
                  label={podcast.category || "Category"}
                  path={`/podcast/${podcast.id}`}
                />
                <FavoriteButton
                  podcastId={podcast.id}
                  isFavorited={true}
                  currentUser={currentUser}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite podcasts yet.</p>
        )}
      </div>

      {currentUser?.admin && (
        <>
          <h1>My Podcasts</h1>
          <div className="pod__container">
            {allPodcasts.length > 0 ? (
              <ul className="pod__items">
                {allPodcasts.map((podcast) => (
                  <li key={podcast.id}>
                    <PodItem
                      src={
                        podcast.image
                          ? `${process.env.REACT_APP_API_URL}/storage/${podcast.image}`
                          : pod1
                      }
                      text={podcast.description}
                      label={podcast.category || "Category"}
                      path={`/podcast/${podcast.id}`}
                      podcastId={podcast.id}
                      isFavorited={false}
                      currentUser={currentUser}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No podcasts available.</p>
            )}
            <div className="hero-btns">
              <Button
                className="btns"
                buttonStyle="btn--primary"
                buttonSize="btn--large"
                onClick={() => console.log("hey")}
                to="/addpod"
              >
                Add new episode
                <i className="far fa-play-circle" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Podcasts;
*/

import React, { useState, useEffect } from "react";
import "./Fav.css";
import FavoriteButton from "./FavButton";
import PodItem from "./PodItem.js";
import pod1 from "./images/pod1.jpg";
import { Button } from "./Button.js";
import axios from "./services/axios";

function Podcasts() {
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserDataAndPodcasts = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (user && token) {
        setCurrentUser(user);

        try {
          // Fetch favorite podcasts
          const favoritesResponse = await axios.get("/user/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorites(favoritesResponse.data);

          // Fetch all podcasts for admin users
          if (user.admin) {
            const allPodcastsResponse = await axios.get("/podcasts", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setAllPodcasts(allPodcastsResponse.data);
          }
        } catch (error) {
          console.error("Failed to fetch data", error);
          setFavorites([]);
          if (user.admin) {
            setAllPodcasts([]);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadUserDataAndPodcasts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pod">
      <h1>Favourites</h1>
      <div className="pod__container">
        {favorites.length > 0 ? (
          <div className="pod__items">
            {favorites.map((podcast) => (
              <PodItem
                key={podcast.id}
                src={
                  podcast.image
                    ? `${process.env.REACT_APP_API_URL}/storage/${podcast.image}`
                    : pod1
                }
                text={podcast.description}
                label={podcast.category || "Category"}
                path={`/podcast/${podcast.id}`}
                podcastId={podcast.id}
                isFavorited={true}
                currentUser={currentUser}
              />
            ))}
          </div>
        ) : (
          <p>No favorite podcasts yet.</p>
        )}
      </div>

      {currentUser?.admin && (
        <>
          <h1>My Podcasts</h1>
          <div className="pod__container">
            {allPodcasts.length > 0 ? (
              <div className="pod__items">
                {allPodcasts.map((podcast) => (
                  <PodItem
                    key={podcast.id}
                    src={
                      podcast.image
                        ? `${process.env.REACT_APP_API_URL}/storage/${podcast.image}`
                        : pod1
                    }
                    text={podcast.description}
                    label={podcast.category || "Category"}
                    path={`/podcast/${podcast.id}`}
                    podcastId={podcast.id}
                    isFavorited={false}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            ) : (
              <p>No podcasts available.</p>
            )}
            <div className="hero-btns">
              <Button
                className="btns"
                buttonStyle="btn--primary"
                buttonSize="btn--large"
                onClick={() => console.log("hey")}
                to="/addpod"
              >
                Add new episode
                <i className="far fa-play-circle" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Podcasts;
