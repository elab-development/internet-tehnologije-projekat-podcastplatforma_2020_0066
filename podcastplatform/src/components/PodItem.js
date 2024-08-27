import React from "react";
import { Link } from "react-router-dom";

function PodItem(props) {
  return (
    <>
      <li className="pod__item">
        <Link className="pod__item__link" to={props.path}>
          <figure className="pod__item__pic-wrap" data-category={props.label}>
            <img
              className="pod__item__img"
              alt="Podcast Image"
              src={props.src}
            />
          </figure>
          <div className="pod__item__info">
            <h5 className="pod__item__text">{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default PodItem;
