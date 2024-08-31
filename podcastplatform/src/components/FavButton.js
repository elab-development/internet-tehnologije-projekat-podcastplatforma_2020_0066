import React, { useState, useEffect } from "react";
import axios from "./services/axios";

function FavoriteButton({ podcastId, isFavorited, currentUser }) {
  const [favorited, setFavorited] = useState(isFavorited);

  useEffect(() => {
    setFavorited(isFavorited);
  }, [isFavorited]);

  const handleFavorite = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to favorite a podcast.");
      return;
    }

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
        alert(
          `Successfully ${favorited ? "removed from" : "added to"} favorites`
        );
        //alert("Successfully added to favorites");
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
