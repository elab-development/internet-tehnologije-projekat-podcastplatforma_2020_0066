import React from "react";
import "./Podcasts.css";
import PodItem from "./PodItem.js";
import pod1 from "./images/pod1.jpg";
import pod2 from "./images/pod2.avif";
import pod3 from "./images/pod3.jpg";
import pod4 from "./images/pod4.png";
import pod5 from "./images/pod5.jpeg";

function Podcasts() {
  return (
    <div className="pod">
      <h1>A wide variety of podcasts!</h1>
      <div className="pod_container">
        <ul className="pod_items">
          <PodItem
            src={pod1}
            text="Stuff You Should Know is a great podcast for avid learners, offering a basic introduction into a range of fascinating topics."
            label="Informational"
            path="/podcast"
          />
          <PodItem
            src={pod2}
            text="Huberman Lab discusses neuroscience - how our brain and its connections with the organs of our body control our perceptions, our behaviors, and our health."
            label="Health"
            path="/podcast"
          />
          <PodItem
            src={pod5}
            text="Dax Shepard interviews celebrities and experts, exploring human behavior and personal stories."
            label="Interview"
            path="/podcast"
          />
        </ul>

        <ul className="pod_items">
          <PodItem
            src={pod3}
            text="A daily news podcast by The New York Times, offering in-depth analysis of current events."
            label="News"
            path="/podcast"
          />
          <PodItem
            src={pod2}
            text="A weekly true crime podcast that dives into captivating and suspenseful cases."
            label="True Crime"
            path="/podcast"
          />
          <PodItem
            src={pod1}
            text="A podcast about the internet, culture, and the weird, wonderful, and sometimes dark side of online life."
            label="Technology"
            path="/podcast"
          />
        </ul>

        <ul className="pod_items">
          <PodItem
            src={pod2}
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
        </ul>
        <ul className="pod_items">
          <PodItem
            src={pod3}
            text="Daily episodes featuring insightful talks on various topics from the renowned TED stage."
            label="Education"
            path="/podcast"
          />
          <PodItem
            src={pod4}
            text="A weekly true crime podcast that dives into captivating and suspenseful cases."
            label="True Crime"
            path="/podcast"
          />
          <PodItem
            src={pod2}
            text="A podcast about the internet, culture, and the weird, wonderful, and sometimes dark side of online life."
            label="Technology"
            path="/podcast"
          />
        </ul>
      </div>
    </div>
  );
}
export default Podcasts;
