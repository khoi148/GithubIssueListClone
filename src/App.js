import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const [issues, setIssues] = useState([]);

  function setTokenFunc() {
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
  }
  async function apiSearchOwnersRepos(query = "khoi148/GithubIssueListClone") {
    //this url searches for a specific repo of an org
    const url = `https://api.github.com/search/repositories?q=repo:${query}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.github.squirrel-girl-preview+json"
      }
    });
    const responseJson = await response.json();
    setRepos(responseJson.items); //1 page of results in an array
    console.log("repo", responseJson);
  }
  async function apiSearchRepos(query = "khoi148") {
    //this url searches for repositories with [query] in their name, and sorts the results by interactions first in descending order
    const url = `https://api.github.com/search/repositories?q=${query}+in:name+sort:interactions&per_page=20&page=${page}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.github.squirrel-girl-preview+json"
      }
    });
    const responseJson = await response.json();
    setRepos(responseJson.items); //1 page of results in an array
    console.log("repo", responseJson);
  }

  async function apiSearchIssues(repo = "facebook/react") {
    //this url searches for issues of a specific [repo], and sorts the results in an array, with most updated issues first
    const url = `https://api.github.com/search/issues?q=repo:${repo}+sort:updated+type:issue`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.github.squirrel-girl-preview+json"
      }
    });
    const responseJson = await response.json();
    setIssues(responseJson.items);
    console.log("issues", responseJson);
  }
  useEffect(() => setTokenFunc(), []);

  return (
    <div className="App">
      <div className="container bg-warning">
        <h1>Header for Github API</h1>
        <button onClick={() => apiSearchRepos()}>Click Me for Repos!</button>
        <button onClick={() => apiSearchOwnersRepos()}>
          Click Me for Owner/Repos!
        </button>
        <button onClick={() => apiSearchIssues()}>Click Me for Issues!</button>
        <div className="d-flex flex-column w-100 justify-content-center">
          {repos.map(item => (
            <a href="#">{item.name}</a>
          ))}
        </div>
        <div className="d-flex flex-column w-100 bg-light justify-content-center">
          {issues.map(item => (
            <a href="#">
              `{item.title}___{item.updated_at.slice(0, 10)}`
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
