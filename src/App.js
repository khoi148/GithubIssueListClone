import React, { useState, useEffect } from "react";
import "./App.css";
import ListOfIssues from "./components/ListOfIssues.js";
import ProjectTabs from "./components/ProjectTabs.js";
import Navbar from "./components/Navbar.js";
import SearchBar from "./components/SearchBar.js";

export default function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const [token, setToken] = useState(null);
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const [issues, setIssues] = useState([]);
  const [repoOrIssue, setRepoOrIssue] = useState(true);

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

  async function apiSearchRepos(query = "khoi148") {
    //this url searches for repositories with [query] in their name, and sorts the results by interactions first in descending order
    const url1 = `https://api.github.com/search/repositories?q=${query}+in:name+sort:interactions&per_page=20&page=${page}`;
    //this url searches for a specific repo of an org
    const url2 = `https://api.github.com/search/repositories?q=repo:${query}`;
    let url =
      query.includes("/") && query.split("/").length === 2 ? url2 : url1;

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
  async function apiSearchIssues(query = "facebook") {
    //this url searches for issues of a specific [repo], and sorts the results in an array, with most updated issues first
    const url1 = `https://api.github.com/search/issues?q=repo:${query}+sort:updated+type:issue`;
    //this url searches for issues with the query in their title
    const url2 = `https://api.github.com/search/issues?q=${query}+sort:updated+in:title+type:issue`;
    let url =
      query.includes("/") && query.split("/").length === 2 ? url1 : url2;

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
      <Navbar />
      <div className="row">
        <div className="col-2"></div>

        <div className="col-8">
          <div className="row pt-3">
            <div className="col-6">
              <h5>
                <a href="#">github</a> /<a href="#">covid19-dashboard</a>
              </h5>
              <h6>
                generated from
                <a href="#">fastai/fastpages</a>
              </h6>
            </div>

            {/* these are tabs: Code Issues Pull-Reuquests ... */}
            <ProjectTabs />
          </div>

          {/* issues contribute permission request */}
          <div className="row mt-3">
            <div className="col-10 text-center">
              <p style={{ fontWeight: "bold" }}>
                Want to contribute to github/covid19-dashboard?
              </p>
              <p>
                If you have a bug or an idea, read the contributing guidelines
                before opening an issue.
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="row mt-3">
            <SearchBar
              apiSearchReposMethod={input => apiSearchRepos(input)}
              apiSearchIssuesMethod={input => apiSearchIssues(input)}
            />

            <div className="col-4 d-flex px-0 justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary text-dark btn-sm flex-grow-1 mx-2"
                style={{ height: "30px" }}
              >
                Labels (12)
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary text-dark btn-sm flex-grow-1 mr-2"
                style={{ height: "30px" }}
              >
                Milestones (10)
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm flex-grow-1"
                style={{ height: "30px" }}
              >
                New
              </button>
            </div>
          </div>

          <ListOfIssues
            issues={issues}
            apiSearchIssuesMethod={input => apiSearchIssues(input)}
          />
        </div>
      </div>

      <div className="container bg-success mt-5">
        <h1>Header for Github API</h1>
        <button onClick={() => apiSearchRepos()}>Click Me for Repos!</button>
        <button onClick={() => apiSearchRepos("khoi148/GithubIssueListClone")}>
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
