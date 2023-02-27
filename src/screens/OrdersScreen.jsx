import React, { useEffect, useState } from "react";
import axios from "../axios";
import { formatDistance } from "date-fns";
// import { useDispatch, useSelector } from "react-redux";
import "./OrdersScreen.css";

const Checkout = () => {
  //   const dispatch = useDispatch();

  //   const user = useSelector((state) => state.user);
  //   const { userDetails } = user;

  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data } = await axios().get("/api/users/order");

      const modifiedData = data.reduce((acc, cur) => {
        if (acc.hasOwnProperty(cur.createdAt)) {
          const { createdAt, ...rest } = cur;
          acc[cur.createdAt].push(rest);
        } else {
          acc[cur.createdAt] = [cur];
        }

        return acc;
      }, {});

      setLoading(false);
      setOrderItems(modifiedData);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <div className="checkoutscreen">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="">
            <h2>Orders: </h2>

            {Object.keys(orderItems).map((orderDate) => (
              <div className="order_outer_card" key={orderDate}>
                <p>
                  {formatDistance(new Date(orderDate), new Date(), {
                    addSuffix: true,
                  })}
                </p>
                {orderItems[orderDate].map((item, idx) => (
                  <div className="itemcard order_itemcard" key={idx}>
                    <div className="itemcard__image">
                      <img src={item?.imageUrl} alt={item?.name} />
                    </div>
                    <div></div>
                    <div className="itemcard_info">
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Product Name:{" "}
                        </span>{" "}
                        {item?.name}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Quantity: </span>
                        {item?.qty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
