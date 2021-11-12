import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const cardLinkRef = React.useRef();
  const cardNameRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    //added props.
    props.onAddPlace({
      link: cardLinkRef.current.value,
      name: cardNameRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={`add-card`}
      title={`New place`}
      buttonText={`Create`}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__lable">
        <input
          ref={cardNameRef}
          id="card-title"
          type="text"
          placeholder="Title"
          className="form__input form__input_type_card-title"
          name="name"
          style={{ color: "#000" }}
        />
        <span id="card-title-error" className="form__error"></span>
      </label>

      <label className="form__lable">
        <input
          ref={cardLinkRef}
          id="card-url"
          type="url"
          placeholder="Image link"
          className="form__input form__input_type_url"
          name="link"
          style={{ color: "#000" }}
        />
        <span id="card-url-error" className="form__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
// import React from 'react'
// import PopupWithForm from "./PopupWithForm";

// function AddPlacePopup(props) {
// const cardLinkRef = React.useRef();
// const cardNameRef = React.useRef();

//   function handleSubmit(e) {
//     e.preventDefault();
//     //added props.
//     props.onAddPlace({
//       link: cardLinkRef.current.value,
//       name: cardNameRef.current.value,
//     });
//   }

//   return (
//     <PopupWithForm
//       name={`add-card`}
//       title={`New place`}
//       buttonText={`Create`}
//       isOpen={props.isOpen}
//       onClose={props.onClose}
//       onSubmit={handleSubmit}
//     >
//       <label className="form__lable">
//         <input
//           ref={cardNameRef}
//           id="card-title"
//           type="text"
//           placeholder="Title"
//           className="form__input form__input_type_card-title"
//           name="name"
//         />
//         <span id="card-title-error" className="form__error"></span>
//       </label>

//       <label className="form__lable">
//         <input
//           ref={cardLinkRef}
//           id="card-url"
//           type="url"
//           placeholder="Image link"
//           className="form__input form__input_type_url"
//           name="link"
//         />
//         <span id="card-url-error" className="form__error"></span>
//       </label>
//     </PopupWithForm>
//   );
// }

// export default AddPlacePopup
