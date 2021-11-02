import React from "react";
import pencil from "../images/pencil.svg";
import add from "../images/add.svg";
import Card from "./Card";
// import Footer from "./Footer";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  // subscribing Main to CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="avatar" onClick={props.onEditAvatarClick}>
          <img
            src={currentUser.avatar}
            alt="profile avatar"
            className="profile__image"
          />
          <div className="avatar__overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfileClick}
              className="profile__edit"
              type="button"
              aria-label="edit button"
            >
              <img
                className="profile__edit-icon"
                src={pencil}
                alt="pencil icon"
              />
            </button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add"
          type="button"
          aria-label="add"
          onClick={props.onAddPlaceClick}
        >
          <img
            className="profile__add-icon"
            src={add}
            alt="plus sign"
          />
        </button>
      </section>
      <section className="grid">
        <ul className="grid__container">
          {props.cards.map((card, id) => {
            return (
              <Card
                key={id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
