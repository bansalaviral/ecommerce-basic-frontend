import "./SideDrawer.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/userActions";

const SideDrawer = ({ show, click }) => {
  const sideDrawerClass = ["sidedrawer"];
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

  if (show) {
    sideDrawerClass.push("show");
  }

  return (
    <div className={sideDrawerClass.join(" ")}>
      <ul className="sidedrawer__links" onClick={click}>
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
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
        {userDetails ? (
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default SideDrawer;
