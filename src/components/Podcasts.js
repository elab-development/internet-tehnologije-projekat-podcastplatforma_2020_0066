import React from "react";
import "./Podcasts.css";
import PodItem from "./PodItem.js";

function Podcasts() {
  return (
    <div className="pod">
      <h1>Check out these popular podcasts!</h1>
      <div className="pod__container">
        <ul className="pod__items">
          <PodItem
            src="./images/pod1.jpg"
            text="Stuff You Should Know is a great podcast for avid learners, offering a basic introduction into a range of fascinating topics."
            label="Informational"
            path="/explore"
          />
          <PodItem
            src="./images/pod2.avif"
            text="Huberman Lab discusses neuroscience — how our brain and its connections with the organs of our body control our perceptions, our behaviors, and our health."
            label="Health"
            path="/explore"
          />
        </ul>
        <ul className="pod__items">
          <PodItem
            src="./images/pod3.jpg"
            text="A daily news podcast by The New York Times, offering in-depth analysis of current events."
            label="News"
            path="/explore"
          />
          <PodItem
            src="./images/pod4.png"
            text="A true crime podcast that explores one story over an entire season, known for its investigative journalism."
            label="True Crime"
            path="/explore"
          />
          <PodItem
            src="./images/pod5.jpeg"
            text="Interviews with entrepreneurs and innovators, sharing the stories behind the founding of their companies."
            label="Business"
            path="/explore"
          />
        </ul>
      </div>
    </div>
  );
}

export default Podcasts;
