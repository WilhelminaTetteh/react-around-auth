import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
  const avatarRef = React.useRef(); // assigning the object returned by a hook to a variable
  function handleSubmit(e) {
    e.preventDefault();
    //added props.
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name={`avatar`}
      title={`Change profile picture`}
      buttonText={`Save`}
      isOpen={props.isOpen} //isEditProfilePopupOpen
      onClose={props.onClose} //closeAllPopups
      onSubmit={handleSubmit}
    >
      <label className="form__lable">
        <input
          ref={avatarRef}
          id="avatar-url"
          type="url"
          placeholder="Image link"
          className="form__input form__input_type_url form__input_type_avatar-url"
          name="link"
          style={{ color: "#000" }}
        />
        <span id="avatar-url-error" className="form__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
