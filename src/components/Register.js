import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth";
import { useHistory } from "react-router";

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  let history = useHistory();

  // use it in the submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    //TO-DO- handle Registration
    if (email && password) {
      auth
        .register(email, password)
        // We only want to redirect users after the registration form has been properly submitted
        .then((res) => {
          history.push("/signin");
          return res;
        });
    } else {
      return setMessage(
        "400 - one of the fields was filled in incorrectly"
      );
    }
  };
  return (
    <>
      <div className="register">
        <p className="register__title">Sign Up</p>
        <form className="register__form">
          <input
            className="register__form-email"
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register__form-password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className="register__submit">
            Sign up
          </button>
        </form>

        {/* link to login page */}
        <p>
          Already a member? Log in <Link to="/signin">here</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
