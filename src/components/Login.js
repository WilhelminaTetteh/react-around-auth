// eslint-disable-next-line
import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  //handle Login submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // handle invalid entries
      return;
    }
    handleLogin(email, password);
    // history.push("/");
    // auth
    //   .authorize(email, password)
    //   .then((data) => {
    //     if (!data) {
    //       return setMessage(
    //         "one or more of the fields were not provided"
    //       );
    //     }
    //     if (data) {
    //       // reset the state
    //       setEmail("");
    //       setPassword("");
    //       // TODO  handle login
    //       handleLogin();
    //       // redirect user to /profile
    //       history.push("/");
    //       return;
    //     }
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //   });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <p className="login__title">Log in</p>
        <input
          className="login__form-email login__input"
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__form-password login__input"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={{ color: "#000" }} className="login__submit">
          Log in
        </button>
        {/* link to login page */}
        <p className="login__text">
          <Link className="login__link" to="/signup">
            {" "}
            Not a member? Sign Up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
