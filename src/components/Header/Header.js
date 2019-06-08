import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import fetchUser from "../../hooks/fetchUser";

function LoggedInLinks(props) {
  return (
    <div>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/page1">Page 1</NavLink>
      <NavLink to="/page2">Page 2</NavLink>
      <NavLink to="/page3">Page 3</NavLink>
    </div>
  );
}

function AuthLinks(props) {
  return (
    <div>
      <NavLink
        to={{
          pathname: "/auth",
          state: { auth: "login" }
        }}
      >
        Login
      </NavLink>
      <NavLink
        to={{
          pathname: "/auth",
          state: { auth: "register" }
        }}
      >
        Register
      </NavLink>
    </div>
  );
}

function Header(props) {
  const [user] = fetchUser("/api/user");
  return (
    <header className="main-header">
      <div>
        <div>{user ? <LoggedInLinks /> : <AuthLinks />}</div>
      </div>
    </header>
  );
}

export default Header;
