import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/userActions";

const Navbar = ({ click }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  // const getCartCount = () => {
  //   return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  // };

  const getCartCount = () => {
    return cartItems.length;
  };

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2 onClick={() => history.push("/")}>MERN Ecommerce</h2>
      </div>

      <ul className="navbar__links">
        {!userDetails ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : null}
        {userDetails ? (
          <li>
            <p style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </p>
          </li>
        ) : null}
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
