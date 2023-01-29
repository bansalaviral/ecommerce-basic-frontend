import React, { useEffect } from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { useState } from "react";
import { cartReset } from "../redux/actions/cartActions";

const Checkout = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  const [paid, setPaid] = useState(false);

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

  const handleOrder = async () => {
    try {
      const items = cartItems.map((item) => {
        return {
          id: item.product,
          qty: item.qty,
        };
      });

      await axios().patch("/api/users/order", {
        cartItems: items,
      });

      dispatch(cartReset());

    } catch (error) {
      console.log(error.reponse.data.message);
      setPaid(false);
    }
  };

  return (
    <>
      <div className="checkoutscreen">
        <div className="checkoutscreen_left">
          <h2>Summary: </h2>

          {cartItems.map((item) => (
            <div className="itemcard" key={item.product}>
              <div className="itemcard__image">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div></div>
              <div className="itemcard_info">
                <p>
                  <span style={{ fontWeight: "bold" }}>Product Name: </span>{" "}
                  {item.name}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Quantity: </span>
                  {item.qty}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="checkoutscreen_right">
          <div className="cartscreen__info">
            <h3>Billing Details</h3>
            <p>
              Billed To: {userDetails.name} ({userDetails.email})
            </p>
            <p>Total Items: {getCartItemCount()} items</p>
            <p>Total Quantity: {getCartCount()} products</p>
            <p>Subtotal: ${getCartSubTotal()}</p>
          </div>
          <div>
            {userDetails && (
              <button onClick={handleOrder}>
                {!paid ? `Pay ${getCartSubTotal()}` : `Done ✅`}
              </button>
            )}
            {!userDetails && <button>Login</button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
