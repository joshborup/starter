import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function LoggedInLinks(props) {
  const dispatch = useDispatch();
  function logout() {
    axios.get("/api/logout").then(() => {
      dispatch({ type: "SET_USER", payload: null });
    });
  }
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/page1">Page 1</NavLink>
      <NavLink to="/page2">Page 2</NavLink>
      <NavLink to="/page3">Page 3</NavLink>
      <button onClick={logout}>Logout</button>
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
