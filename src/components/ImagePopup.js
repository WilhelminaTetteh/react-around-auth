function ImagePopup(props) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? "modal_open" : ""
      }`}
    >
      <button
        className="modal__button modal__button_type_popup-image"
        type="button"
        aria-label="modal button"
        onClick={props.onClose}
      ></button>
      <figure className="modal__figure">
        <img className="modal__image" src={props.card.link} alt="place popup" />
        <figcaption className="modal__image-caption">
          {props.card.name}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;

/* selectCard prop >>
req:The selectedCard value should be transmitted using the 
card props to the ImagePopup component
>>The card prop>> is the object 
  containing the name and image URL, which i pass in from wherever i have it.  ill pass it in anywhere that
  i need that data for a particular card*/
