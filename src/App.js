import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthContainer from "./components/Auth/AuthContainer";
import userFetch from "./hooks/fetchUser";

import "./App.scss";

function App() {
  userFetch("/api/user");
  const user = useSelector(state => state.user);
  return (
    <div className="App">
      <Header />
      {user ? (
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <div>Home</div>;
            }}
          />
          <Route
            path="/page1"
            render={() => {
              return <div>Page 1</div>;
            }}
          />
          <Route
            path="/page2"
            render={() => {
              return <div>Page 2</div>;
            }}
          />
          <Route
            path="/page3"
            render={() => {
              return <div>Page 3</div>;
            }}
          />
        </Switch>
      ) : (
        <AuthContainer />
      )}
    </div>
  );
}

export default App;
