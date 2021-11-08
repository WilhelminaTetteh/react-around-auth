import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" />
      <div style={{ display: "flex" }}>
        {/* <p>email@email.com</p> */}
        <Link to="/signup" className="header__signup">
          Signup
        </Link>
      </div>
    </header>
  );
}

export default Header;
