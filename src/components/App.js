import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth";

function App() {
  // State variable and setters
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =
    useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  //loggedin state
  const [loggedIn, setLoggedIn] = React.useState(false);
  // NOTE  use userData to show user email on the nav
  const [userData, setUserData] = useState({});
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");

  const history = useHistory();
  //HANDLE AUTHENTICATION

  useEffect(() => {
    tokenCheck();
  }, []);

  //LOG IN
  const handleLogin = () => {
    // e.preventDefault(); ..
    //Do something
    setLoggedIn(true);
  };

  const tokenCheck = () => {
    // if user has a token in storage, check if it is valid
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      // make the request
      auth.getContent(jwt).then((res) => {
        // if response is successful, log in the user
        if (res) {
          const userData = {
            email: res.email,
          };
          handleLogin();
          setUserData(userData);
          // also push user to the Home Page
          return history.push("/");
        }
        console.log("something went wrong- tokencheck");
      });
    }
  };

  useEffect(() => {
    api
      .getInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    api
      .getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //handlers for opening modals
  function handleEditAvatarClick() {
    // console.log("The Avatar was clicked.");
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    // console.log("The Profile was clicked.");
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    // console.log("The Place button  was clicked.");
    setIsAddPlacePopupOpen(true);
  }
  //Image Popup
  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  }
  //close modals
  function closeAllPopups() {
    // console.log("Popup was closed");
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }
  //Handle User Update
  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Handle avatar update
  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    if (!isLiked) {
      api
        .changeLikeCardStatus(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function handleCardDelete(card) {
    // After the API request, update the cards state using the filter() method. Create a copy
    // of the array and exclude the deleted card from it.
    api
      .removeCard(card._id)
      .then(() => {
        const cardList = cards.filter((c) => c._id !== card._id);
        setCards(cardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header userData={userData} />
          <Switch>
            <ProtectedRoute
              component={Main}
              exact
              path="/"
              loggedIn={loggedIn}
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/signup">
              <Register />
            </Route>
            <Route path="/signin">
              <Login
                handleLogin={handleLogin}
                tokenCheck={tokenCheck}
              />
            </Route>
            <Route exact path="/">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Redirect to="/signin" />
              )}
            </Route>
          </Switch>
          {loggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm name={`delete`} title={`Are you sure?`}>
            <button
              type="button"
              className="form__button form__delete-confirmation"
            >
              Yes
            </button>
          </PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
