import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //handle Login submission
  const handleSubmit = () => {
    console.log("login submitted");
  };
  return (
    <>
      <div className="login">
        <p className="login__title">Log in</p>
        <form className="login__form">
          <input
            className="login__form-email"
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login__form-password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
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
