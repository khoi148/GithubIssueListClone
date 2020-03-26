import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const [token, setToken] = useState(null);
  useEffect(() => {
    //this gets an existing token from local server, if not exist call server to get token
    const existingToken = localStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;

    if (!accessToken && !existingToken) {
      //if token above not found, call server to get token
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      localStorage.setItem("token", accessToken); //store token in local storage
      setToken(accessToken);
    }

    if (existingToken) {
      console.log("existing token: ", existingToken);
      setToken(existingToken);
    }
  }, []);

  return (
    <div className="App">
      <div>More</div>
    </div>
  );
}

export default App;
