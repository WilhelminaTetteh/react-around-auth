import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  //Profile submit
  function handleSubmit(e) {
    e.preventDefault();
    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  // Subscription to the context
  const currentUser = React.useContext(CurrentUserContext);

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); //watch isOpen here to insert the user's data into the inputs
  return (
    <PopupWithForm
      name={`edit-profile`}
      title={`Edit profile`}
      buttonText={`Save`}
      isOpen={props.isOpen} //isEditProfilePopupOpen
      onClose={props.onClose} //closeAllPopups
      onSubmit={handleSubmit}
    >
      <label className="form__lable">
        <input
          // defaultValue={name}
          value={name || ""}
          onChange={handleNameChange}
          id="profile-name"
          type="text"
          placeholder="Name"
          style={{ color: "#000" }}
          className="form__input form__input_type_title"
          name="title"
        />
        <span id="profile-name-error" className="form__error"></span>
      </label>
      <label className="form__lable">
        <input
          // defaultValue={description}
          value={description || ""}
          onChange={handleDescriptionChange}
          id="profile-text"
          type="text"
          placeholder="About me"
          className="form__input form__input_type_description"
          name="description"
          style={{ color: "#000" }}
        />
        <span id="profile-text-error" className="form__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
