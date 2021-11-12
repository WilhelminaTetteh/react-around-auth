import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegistration }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // use it in the submission handler
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   //TO-DO- handle Registration
  //   if (email && password) {
  //     auth
  //       .register(email, password)
  //       // We only want to redirect users after the registration form has been properly submitted
  //       .then((res) => {
  //         history.push("/signin");
  //         return res;
  //       });
  //     // console.log("res good");
  //   } else {
  //     // console.log("res bad");
  //     return setMessage(
  //       "400 - one of the fields was filled in incorrectly"
  //     );
  //   }
  // };

  //Handle Signin Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <p className="register__title">Sign Up</p>
        <input
          className="register__form-email register__input"
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register__form-password register__input"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ color: "#000" }}
          className="register__submit"
        >
          Sign up
        </button>
        {/* link to login page */}
        <p className="register__text">
          <Link className="register__link" to="/signin">
            {" "}
            Already a member? Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
