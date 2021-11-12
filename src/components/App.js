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
import InfoToolTip from "./InfoTooltip";
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
  // NOTE : info tooltip original state
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  //loggedin state
  const [loggedIn, setLoggedIn] = React.useState(false);
  // use userData to show user email on the nav
  // const [userData, setUserData] = useState({});
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  //HANDLE AUTHENTICATIONe

  useEffect(() => {
    tokenCheck();
  }, []);

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
  // NOTE :Handle info tooltip
  function handleInfoTooltip() {
    setIsInfoToolTipPopupOpen(true);
  }
  //close modals
  function closeAllPopups() {
    // console.log("Popup was closed");
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    // NOTE Close Info Tool Tip
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard({});
  }
  //ESC Close
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () =>
      document.removeEventListener("keydown", closeByEscape);
  }, []);

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
  // REGISTRATION
  const handleRegistration = (email, password) => {
    auth
      .register(email, password)
      // We only want to redirect users after the registration form has been properly submitted
      .then((res) => {
        if (email && password) {
          setIsSuccessful(true);
          setIsInfoToolTipPopupOpen(true);
          history.push("/signin");
          // console.log("res good");
          return res;
        } else {
          setIsSuccessful(false);
        }
      })
      .catch((err) => {
        setIsInfoToolTipPopupOpen(true);
        console.log(err);
        // console.log("res bad");
        return setMessage(
          "400 - one of the fields was filled in incorrectly"
        );
      });
  };
  // const handleRegistration = (email, password) => {
  //   if (email && password) {
  //     auth
  //       .register(email, password)
  //       // We only want to redirect users after the registration form has been properly submitted
  //       .then((res) => {
  //         setIsSuccessful(true);
  //         setIsInfoToolTipPopupOpen(true);
  //         history.push("/signin");
  //         console.log("res good");
  //         return res;
  //       })
  //       .catch((err) => {
  //         setIsSuccessful(false);
  //         setIsInfoToolTipPopupOpen(true);
  //         console.log(err);
  //       });
  //   } else {
  //     // console.log("res bad");
  //     return setMessage(
  //       "400 - one of the fields was filled in incorrectly"
  //     );
  //   }
  // };

  //LOG IN
  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          return setMessage(
            "one or more of the fields were not provided"
          );
        }
        if (data) {
          // set
          setEmail(email);
          // TODO  handle login
          setLoggedIn(true);
          // redirect user to cards
          history.push("/");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  };

  //LOGOUT
  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  }
  const tokenCheck = () => {
    // if user has a token in storage, check if it is valid
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      // make the request
      auth
        .getContent(jwt)
        .then((res) => {
          // if response is successful, log in the user
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            // also push user to the Home Page
            history.push("/");
            // NOTE  : set user data in header. use This method for more than one userData
            // const userData = {
            //   email: res.email,
            // };
            // setUserData(userData);
          }
          console.log("something went wrong- tokencheck");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            // userData={userData}
            email={email}
            loggedIn={loggedIn}
            handleLogOut={handleLogOut}
          />
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
              email={email}
            />
            <Route path="/signup">
              <Register handleRegistration={handleRegistration} />
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

          <PopupWithForm
            name={`delete`}
            title={`Are you sure?`}
            buttonText={`Yes`}
          ></PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />

          <InfoToolTip
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            onShowToolTip={handleInfoTooltip}
            isvalidRegistration={isSuccessful}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
