import React from "react";
import Header from "./components/Header/Header";
import { Switch, Route } from "react-router-dom";
import AuthContainer from "./components/Auth/AuthContainer";
import userFetch from "./hooks/fetchUser";
import "./App.scss";

function App() {
  const [user, setUser] = userFetch("/api/user");
  return (
    <div className="App">
      <Header />

      <Switch>
        {user ? (
          <>
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
          </>
        ) : (
          <AuthContainer />
        )}
      </Switch>
    </div>
  );
}

export default App;
