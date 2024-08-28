import React, { useState } from "react";
import axios from "./services/axios";

function FavoriteButton({ podcastId, isFavorited, currentUser }) {
  const [favorited, setFavorited] = useState(isFavorited);

  if (!currentUser) {
    alert("You must be logged in to favorite a podcast.");
    return;
  }

  const handleFavorite = async () => {
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
    <button onClick={handleFavorite}>
      {favorited ? "Unfavorite" : "Favorite"}
    </button>
  );
}

export default FavoriteButton;
