// eslint-disable-next-line
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as auth from "../utils/auth";
import { useHistory } from "react-router";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  //handle Login submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // handle invalid entries appropriately
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          return setMessage(
            "one or more of the fields were not provided"
          );
        }
        if (data) {
          // reset the state
          setEmail("");
          setPassword("");
          // TODO  handle login
          handleLogin();
          // redirect user to /profile
          history.push("/");
          return;
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <>
      <div className="login">
        <p className="login__title">Log in</p>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__form-email"
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            style={{ color: "red" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login__form-password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            style={{ color: "red" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className="login__submit">
            Log in
          </button>
        </form>

        {/* link to login page */}
        <p>
          Not a member? Sign Up <Link to="/signup">here</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
