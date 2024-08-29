import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavButton";

function PodItem({
  src,
  text,
  label,
  path,
  podcastId,
  isFavorited,
  currentUser,
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    scrollToTop();
    navigate(path);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <li className="pod__item">
        <Link className="pod__item__link" to={path} onClick={handleClick}>
          <figure className="pod__item__pic-wrap" data-category={label}>
            <img className="pod__item__img" alt="Podcast Image" src={src} />
          </figure>
          <div className="pod__item__info">
            <h5 className="pod__item__text">{text}</h5>
            <FavoriteButton
              podcastId={podcastId}
              isFavorited={isFavorited}
              currentUser={currentUser}
            />
          </div>
        </Link>
      </li>
    </>
  );
}

export default PodItem;
