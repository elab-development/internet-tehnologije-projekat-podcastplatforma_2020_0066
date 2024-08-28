import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavButton";

function PodItem({ src, text, label, path, podcastId, isFavorited }) {
  return (
    <>
      <li className="pod__item">
        <Link className="pod__item__link" to={path}>
          <figure className="pod__item__pic-wrap" data-category={label}>
            <img className="pod__item__img" alt="Podcast Image" src={src} />
          </figure>
          <div className="pod__item__info">
            <h5 className="pod__item__text">{text}</h5>
            <FavoriteButton podcastId={podcastId} isFavorited={isFavorited} />
          </div>
        </Link>
      </li>
    </>
  );
}

export default PodItem;
