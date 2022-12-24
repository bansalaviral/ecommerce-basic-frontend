import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/userActions.js";
import axios from "../axios";
import "./Register.css";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      dispatch(setUser(data));
      history.push("/");
      
    } catch (err) {
      setError(err.response.data.message);
      dispatch(setUser(null));
    }
  };

  return (
    <div className="form">
      <div className="title">Sign Up</div>
      <div className="subtitle">Let's create your account!</div>
      <div className="input-container ic1">
        <input
          id="firstname"
          className="input"
          type="text"
          placeholder=" "
          onChange={(e) => setName(e.target.value)}
        />
        <div className="cut"></div>
        <label htmlFor="fullname" className="placeholder">
          Full name
        </label>
      </div>

      <div className="input-container ic2">
        <input
          id="email"
          className="input"
          type="email"
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
        submit
      </button>
      {error && (
        <p className="error" style={{ color: "red" }}>
          Error: {error}
        </p>
      )}
    </div>
  );
};

export default Register;
