import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Card(props) {
  // subscribing Card to CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  // Checking if you are the owner of the current card
  const isOwn = props.card.owner._id === currentUser._id;
  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `grid__delete-icon ${
    isOwn ? "grid__delete-show" : "grid__delete-hide"
  }`;
  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `grid__icon ${
    isLiked ? "grid__icon_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="grid__template">
      <li className="grid__item">
        <button
          type="button"
          aria-label="modal button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
        <div
          className="grid__image"
          style={{ backgroundImage: `url(${props.card.link})` }}
          onClick={handleClick}
        ></div>
        <div className="grid__caption">
          <p className="grid__text">{props.card.name}</p>
          <div className="grid__like-column">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
              aria-label="grid icon"
              type="button"
            ></button>
            <p className="grid__likes">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Card;

// pass it on to the Card component through the Main component — in the form of onCardClick props
