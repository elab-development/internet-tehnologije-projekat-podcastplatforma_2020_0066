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
      console.log("Token:", token);

      if (user && token) {
        setCurrentUser(user);

        try {
          const favoritesResponse = await axios.get("/user/favorites", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Favorites response:", favoritesResponse.data);
          setFavorites(favoritesResponse.data);

          if (user.admin) {
            const allPodcastsResponse = await axios.get("/podcasts", {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log("All podcasts response:", allPodcastsResponse.data);

            const podcastsData = allPodcastsResponse.data.map((podcast) => ({
              ...podcast,
              isFavorited: favoritesResponse.data.some(
                (fav) => fav.id === podcast.id
              ),
            }));

            setAllPodcasts(podcastsData);
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
                    ? podcast.image.includes("http")
                      ? podcast.image
                      : `${process.env.REACT_APP_MEDIA_URL}/${podcast.image}`
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
                        ? podcast.image.includes("http")
                          ? podcast.image
                          : `${process.env.REACT_APP_MEDIA_URL}/${podcast.image}`
                        : pod1
                    }
                    text={podcast.title}
                    label={podcast.category || "Category"}
                    path={`/podcast/${podcast.id}`}
                    podcastId={podcast.id}
                    isFavorited={podcast.isFavorited}
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
                onClick={() => console.log("clicked")}
                to="/addpod"
              >
                Add new episode or podcast
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
