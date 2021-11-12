import React from "react";
import successIcon from "../images/Success-icon.svg";
import errorIcon from "../images/Error-icon.svg";
const InfoToolTip = (props) => {
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
        <div action="#" className="modal__infotooltip">
          <img
            src={props.isvalidRegistration ? successIcon : errorIcon}
            alt="Success Icon"
            className="modal__infotooltip-icon"
          />
          {props.isvalidRegistration ? (
            <p className="modal__infotooltip-text">
              Success! You have now been registered
            </p>
          ) : (
            <p className="modal__infotooltip-text">
              Oops, something went wrong! Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoToolTip;
