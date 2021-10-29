import React from "react";
function PopupWithForm(props) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? "modal_open" : ""
      }`}
    >
      <div className="modal__container">
        <button
          className="modal__button"
          type="button"
          aria-label="modal button"
          onClick={props.onClose}
        ></button>
        {/* Add the onSubmit prop to the PopupWithForm component and set it as the value of the attribute of the same name of the form tag */}
        <form action="#" className="form" method="POST" name={props.name} onSubmit={props.onSubmit}>
          <h2 className="form__heading">{`${props.title}`}</h2>
          {props.children}
          <button className="form__button " type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
