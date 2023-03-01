import React from "react";
import axios from "../axios";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

import "./Checkout.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const Checkout = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

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
    const stripe = await stripePromise;
    try {
      const items = cartItems.map((item) => {
        return {
          id: item.product,
          qty: item.qty,
        };
      });

      // Call the backend to create a checkout session
      const { data } = await axios().post("/api/orders", {
        cartItems: items,
      });

      //Redirect user to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }

      // dispatch(cartReset());
      // history.push("/orders");
    } catch (error) {
      console.log(error.reponse.data.message);
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
                {`Pay $${getCartSubTotal()}`}
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
