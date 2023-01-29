import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { setUser } from "../redux/actions/userActions.js";
import axios from "../axios";
import "./Login.css";
import { useDispatch } from "react-redux";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const { data } = await axios().post("api/users/login", {
        email,
        password,
      });

      dispatch(setUser(data));

      history.push("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="form">
      <div className="title">Login</div>

      <div className="input-container ic2">
        <input
          id="email"
          className="input"
          type="text"
          placeholder=" "
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="cut cut-short"></div>
        <label htmlFor="email" className="placeholder">
          Email
        </label>
      </div>
      <div className="input-container ic2">
        <input
          id="password"
          className="input"
          type="password"
          placeholder=" "
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="cut"></div>
        <label htmlFor="password" className="placeholder">
          Password
        </label>
      </div>
      <button type="text" className="submit" onClick={handleSubmit}>
        Submit
      </button>
      <div>
        <p style={{ color: "white", textAlign: "center", marginTop: "10px" }}>
          Didn't sign up yet?{" "}
          <Link
            to="/register"
            style={{ color: "#08d", textDecoration: "none" }}
          >
            Register
          </Link>
        </p>
      </div>
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
};

export default Login;
