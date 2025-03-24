import React from "react";
import "./Podcasts.css";
import PodItem from "./PodItem.js";
import pod1 from "./images/pod1.jpg";
import pod2 from "./images/pod2.avif";
import pod3 from "./images/pod3.jpg";
import pod4 from "./images/pod4.png";
import pod5 from "./images/pod5.jpeg";
import pod6 from "./images/pod6.jpg";
import pod7 from "./images/pod7.png";
import pod8 from "./images/pod8.png";
import pod9 from "./images/pod9.png";

function Podcasts() {
  return (
    <div className="pod">
      <h1>A wide variety of podcasts!</h1>
      <div className="pod__container">
        <ul className="pod__items">
          <PodItem
            src={pod1}
            text="Stuff You Should Know is a great podcast for avid learners, offering a basic introduction into a range of fascinating topics."
            label="Informational"
            path="/explore"
          />
          <PodItem
            src={pod2}
            text="Huberman Lab discusses neuroscience — how our brain and its connections with the organs of our body control our perceptions, our behaviors, and our health."
            label="Health"
            path="/explore"
          />
          <PodItem
            src={pod6}
            text="Dax Shepard interviews celebrities and experts, exploring human behavior and personal stories."
            label="Interview"
            path="/explore"
          />
        </ul>
        <ul className="pod__items">
          <PodItem
            src={pod3}
            text="A daily news podcast by The New York Times, offering in-depth analysis of current events."
            label="News"
            path="/explore"
          />
          <PodItem
            src={pod4}
            text="A true crime podcast that explores one story over an entire season, known for its investigative journalism."
            label="True Crime"
            path="/explore"
          />
          <PodItem
            src={pod5}
            text="Interviews with entrepreneurs and innovators, sharing the stories behind the founding of their companies."
            label="Business"
            path="/explore"
          />
        </ul>
        <ul className="pod__items">
          <PodItem
            src={pod7}
            text="Daily episodes featuring insightful talks on various topics from the renowned TED stage."
            label="Education"
            path="/explore"
          />
          <PodItem
            src={pod8}
            text="A weekly true crime podcast that dives into captivating and suspenseful cases."
            label="True Crime"
            path="/explore"
          />
          <PodItem
            src={pod9}
            text="A podcast about the internet, culture, and the weird, wonderful, and sometimes dark side of online life."
            label="Technology"
            path="/explore"
          />
        </ul>
      </div>
    </div>
  );
}

export default Podcasts;
