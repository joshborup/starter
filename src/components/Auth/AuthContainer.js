import React, { useState, useEffect } from "react";
import { customeErrMessage } from "../../utils/frontUtils";
import axios from "axios";

import { useDispatch } from "react-redux";

function Button({ label, action, className }) {
  return (
    <button className={className} onClick={() => action()}>
      {label}
    </button>
  );
}

function Login({ className }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function login() {
    setLoading(true);
    axios
      .post("/api/login", { username, password })
      .then(res => {
        let current = true;
        if (current) {
          setLoading(false);
          dispatch({ type: "SET_USER", payload: res.data });
        }
        return () => {
          current = false;
        };
      })
      .catch(err => {
        setLoading(false);
        customeErrMessage(setMessage, err.response.data);
      });
  }

  return (
    <form onSubmit={e => e.preventDefault()} className={className}>
      <div>
        <label>Username: </label>
        <input
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <Button
        action={
          username && password
            ? login
            : () => {
                customeErrMessage(
                  setMessage,
                  "type anything if you want that button to work"
                );
              }
        }
        label={loading ? "Logging in..." : "Login"}
        className="auth-btn"
      />
      <span>{message}</span>
    </form>
  );
}

function Register({ className }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondTimePassword, setsecondTimePassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function register() {
    setLoading(true);
    axios
      .post("/api/register", { username, password, email })
      .then(res => {
        let current = true;
        if (current) {
          setLoading(false);
          dispatch({ type: "SET_USER", payload: res.data });
        }
        return () => {
          current = false;
        };
      })
      .catch(err => {
        const { message, errmsg } = err.response.data;
        const errorMessage = message || errmsg;
        setLoading(false);
        console.dir(err);
        customeErrMessage(setMessage, errorMessage);
      });
  }

  useEffect(() => {
    setPasswordMatch(false);
    if (password === secondTimePassword) {
      setPasswordMatch(true);
    }
  });
  return (
    <form onSubmit={e => e.preventDefault()} className={className}>
      <div>
        <label>Username: </label>
        <input
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <div>
        <label>Confirm Password: </label>
        <input
          type="password"
          value={secondTimePassword}
          onChange={({ target: { value } }) => setsecondTimePassword(value)}
        />
      </div>
      <Button
        action={
          passwordMatch
            ? register
            : () => customeErrMessage(setMessage, "passwords dont match")
        }
        label={loading ? "Registering.." : "Register"}
        className="auth-btn"
      />
      <span>{message}</span>
    </form>
  );
}

function AuthContainer() {
  const [access, setAccess] = useState("login");

  return (
    <div className="login-register-container">
      <div className="button-tabs">
        <div>
          <button
            className={access === "login" ? "log active" : "log"}
            onClick={() => setAccess("login")}
          >
            Login
          </button>
        </div>
        <div>
          <button
            className={access === "register" ? "reg active" : "reg"}
            onClick={() => setAccess("register")}
          >
            Register
          </button>
        </div>
      </div>
      <div>
        {access === "register" ? (
          <Register className="auth-flex" />
        ) : access === "login" ? (
          <Login className="auth-flex" />
        ) : (
          <Login className="auth-flex" />
        )}
      </div>
    </div>
  );
}

function AuthPageContainer() {
  return (
    <div className="auth-container">
      <div>
        <AuthContainer />
      </div>
    </div>
  );
}

export default AuthPageContainer;
