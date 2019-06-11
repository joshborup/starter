import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
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

function Header(props) {
  const user = useSelector(state => state.user);
  return (
    <header className="main-header">
      <div>
        <div>{user ? <LoggedInLinks /> : null}</div>
      </div>
    </header>
  );
}

export default Header;
