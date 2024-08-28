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
        /*const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await axios.get("/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUser(userResponse.data);
        }*/

        const response = await axios.get("http://127.0.0.1:8000/api/podcasts");
        console.log("Fetched podcasts data:", response.data);
        setPodcasts(response.data.slice(0, 4));
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
          <div>
            <ul className="pod__items">
              {podcasts.length > 0 ? (
                podcasts.map((podcast) => (
                  <PodItem
                    key={podcast.id}
                    src={
                      podcast.image
                        ? `${process.env.REACT_APP_API_URL}/storage/${podcast.image}`
                        : pod1
                    }
                    text={podcast.description}
                    label={podcast.category || "Category"} // Adjust as needed
                    path={`/podcast`}
                    //podcastId={podcast.id}
                    //isFavorited={false}
                    //currentUser={currentUser}
                  />
                ))
              ) : (
                <p>No podcasts available</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Podcasts;
