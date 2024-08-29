import React, { useState, useEffect } from "react";
import axios from "./services/axios";

function FavoriteButton({ podcastId, isFavorited, currentUser }) {
  const [favorited, setFavorited] = useState(isFavorited);

  useEffect(() => {
    setFavorited(isFavorited);
  }, [isFavorited]);

  const handleFavorite = async () => {
    if (!currentUser) {
      alert("You must be logged in to favorite a podcast.");
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        if (favorited) {
          await axios.delete(`/podcasts/${podcastId}/favorite`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          await axios.post(
            `/podcasts/${podcastId}/favorite`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
        setFavorited(!favorited);
      } catch (error) {
        console.error("Failed to update favorite status", error);
      }
    }
  };

  return (
    <button onClick={handleFavorite} className="favorite-button">
      {favorited ? "Unfavorite" : "Favorite"}
    </button>
  );
}

export default FavoriteButton;
