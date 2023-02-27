import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Register from "./screens/Register.jsx";
import Login from "./screens/Login.jsx";
import Checkout from "./screens/Checkout.jsx";
import OrdersScreen from "./screens/OrdersScreen";

import { useSelector } from "react-redux";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  const user = useSelector((state) => state.user);
  const { userDetails } = user;

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          userDetails ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main className="app">
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/checkout">
            <Checkout />
          </PrivateRoute>
          <PrivateRoute exact path="/orders">
            <OrdersScreen />
          </PrivateRoute>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
