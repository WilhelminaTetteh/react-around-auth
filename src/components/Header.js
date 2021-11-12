import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
function Header({ email, handleLogOut, loggedIn }) {
  const location = useLocation();

  const handleAuthenticationRoutes = () => {
    if (location.pathname === "/signin") {
      return (
        <Link to="/signup" className="header__signup">
          Sign up
        </Link>
      );
    } else {
      return (
        <Link to="/signin" className="header__signup">
          Sign in
        </Link>
      );
    }
  };
  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" />
      {loggedIn && (
        <div className="header__nav">
          <p className="header__email">{email}</p>
          <Link
            to="/signin"
            onClick={handleLogOut}
            className="header__signup"
          >
            Log out
          </Link>
        </div>
      )}
      {!loggedIn && (
        <div className="header__nav">
          {handleAuthenticationRoutes()}
        </div>
      )}
    </header>
  );
}

export default Header;

// NOTE useLocation
// /*
// useLocation
// The useLocation hook returns the location object that represents the current URL.
// You can think about it like
// a useState that returns a new location whenever the URL changes.
// */
