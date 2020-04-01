import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { render } from "react-dom";

import Homepage from "./pages/Homepage.js";
import AddNewIssue from "./pages/AddNewIssue.js";
//import bootstrap;
const clientId = process.env.REACT_APP_CLIENT_ID;

export default function App() {
  const [token, setToken] = useState(null);

  function setTokenFunc() {
    //this gets an existing token from local server, if not exist call server to get token
    const existingToken = localStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("&scope")[0].split("access_token=")[1]
        : null;

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      localStorage.setItem("token", accessToken); //store token in local storage
      setToken(accessToken.split("&")[0]);
    }

    if (existingToken) {
      console.log("existing token: ", existingToken);
      setToken(existingToken.split("&")[0]);
    }
  }

  useEffect(() => setTokenFunc(), []);
  return (
    <div>
      <Switch>
        <Route
          exact
          path={["/", "/homepage/:userParam/:repoParam"]}
          render={props => <Homepage {...props} token={token} />}
        />
        <Route
          exact
          path="/addnewissue/:user/:repo"
          render={props => <AddNewIssue {...props} token={token} />}
        />
        <Route path="*" render={props => <div>No route found</div>} />
      </Switch>
    </div>
  );
}
