import React, { useState, useEffect } from "react";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
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
    </div>
  );
}

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div>
        <label>Email: </label>
        <input
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </div>
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
      <div>
        <label>Confirm Password: </label>
        <input
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
    </div>
  );
}

export default function AuthContainer(props) {
  const [access, setAccess] = useState("login");

  return (
    <div className="auth-container">
      <div>
        <div>
          <button onClick={() => setAccess("login")}>Login</button>
        </div>
        <div>
          <button onClick={() => setAccess("register")}>Register</button>
        </div>
      </div>
      <div>
        {access === "register" ? (
          <Register />
        ) : access === "login" ? (
          <Login />
        ) : null}
      </div>
    </div>
  );
}
