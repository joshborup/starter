import React, { useState, useEffect } from "react";
import axios from "axios";

function Button({ label, action, className }) {
  return (
    <button className={className} onClick={() => action()}>
      {label}
    </button>
  );
}

function Login({ setUser, className }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function login() {
    setLoading(true);
    axios.post("/api/login", { username, password }).then(res => {
      setLoading(false);
    });
  }

  return (
    <div className={className}>
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
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <Button action={login} label="Login" className="auth-btn" />
    </div>
  );
}

function Register({ className }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondTimePassword, setsecondTimePassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function register() {
    setLoading(true);
    axios.post("/api/register", { username, password, email }).then(res => {
      setLoading(false);
    });
  }

  useEffect(() => {
    setPasswordMatch(false);
    if (password === secondTimePassword) {
      setPasswordMatch(true);
    }
  });
  return (
    <div className={className}>
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
          passwordMatch ? register : () => setMessage("passwords dont match")
        }
        label="Register"
        className="auth-btn"
      />
      <span>{message}</span>
    </div>
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

export default function AuthPageContainer() {
  return (
    <div className="auth-container">
      <div>
        <AuthContainer />
      </div>
    </div>
  );
}
