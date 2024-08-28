import React, { useState, useEffect } from "react";
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
  /*
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await axios.get("/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(userResponse.data);
          console.log("Fetched user data:", userResponse.data);

          const favResponse = await axios.get("/user/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorites(favResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);*/

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
