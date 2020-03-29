import React, { useState, useEffect } from "react";
import "./App.css";
import ListOfResults from "./components/ListOfResults.js";
import ProjectTabs from "./components/ProjectTabs.js";
import Navbar from "./components/Navbar.js";
import SearchBar from "./components/SearchBar.js";

let URL_SEARCH_REPOS_BEG = `https://api.github.com/search/repositories?q=`;
let URL_SEARCH_ISSUES_BEG = `https://api.github.com/search/issues?q=`;
let additional_qualifier = "";
let url = "";
let currentQuery = "";
let perPage = 12;
// let page = 1;
export default function App() {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const [token, setToken] = useState(null);
  const [repos, setRepos] = useState([]);
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [displayWhat, setDisplayWhat] = useState({ repo: true, issue: false });
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

      localStorage.setItem("token", accessToken.split("&")[0]); //store token in local storage
      setToken(accessToken);
    }

    if (existingToken) {
      console.log("existing token: ", existingToken.split("&")[0]);
      setToken(existingToken);
    }
  }
  async function apiSearchRepos(query = "khoi148", pageSet = 1) {
    if (pageSet === 1) setPage(1);

    currentQuery = query;
    //this url searches for repositories with [query] in their name, and sorts the results by interactions first in descending order
    const url1 =
      URL_SEARCH_REPOS_BEG +
      additional_qualifier +
      `${query}+in:name+sort:interactions&per_page=${perPage}&page=${pageSet}`;
    //this url searches for a specific repo of an org
    const url2 = URL_SEARCH_REPOS_BEG + additional_qualifier + `repo:${query}`;

    url = query.includes("/") && query.split("/").length === 2 ? url2 : url1;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.github.squirrel-girl-preview+json"
      }
    });
    const responseJson = await response.json();
    setDisplayWhat({ repo: true, issue: false });
    setRepos(responseJson); //1 page of results in an array
    console.log("repo", responseJson);
  }
  async function apiSearchIssues(query = "facebook", pageSet = 1) {
    if (pageSet === 1) setPage(1);
    currentQuery = query;
    //this url searches for issues of a specific [repo], and sorts the results in an array, with most updated issues first
    const url1 =
      URL_SEARCH_ISSUES_BEG +
      additional_qualifier +
      `repo:${query}+sort:updated+type:issue&per_page=${perPage}&page=${pageSet}`;
    //this url searches for issues with the query in their title
    const url2 =
      URL_SEARCH_ISSUES_BEG +
      additional_qualifier +
      `${query}+sort:updated+in:title+type:issue&per_page=${perPage}&page=${pageSet}`;
    url = query.includes("/") && query.split("/").length === 2 ? url1 : url2;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.github.squirrel-girl-preview+json"
      }
    });
    const responseJson = await response.json();
    setDisplayWhat({ repo: false, issue: true });
    setIssues(responseJson);
    console.log("issues", responseJson);
  }

  async function pageSwitch(pageNum, displayWhat) {
    console.log("on page", page, "going to page ", pageNum);
    let pageLocal = page;
    let pageOriginal = page;
    if (pageNum === "next") pageLocal += 1;
    else if (pageNum === "prev") pageLocal -= 1;
    else if (pageNum === "next-5") pageLocal += 5;
    else if (pageNum === "prev-5") pageLocal -= 5;
    else pageLocal = parseInt(pageNum);

    if (pageLocal < 1) pageLocal = 1;
    // console.log("value", issues.total_count);
    let totalCount =
      displayWhat.repo === true ? repos.total_count : issues.total_count;
    if (pageLocal > Math.max(Math.ceil(totalCount / perPage), 1))
      pageLocal = Math.max(Math.ceil(totalCount / perPage), 1);

    if (pageOriginal !== pageLocal) {
      setPage(pageLocal);
      if (displayWhat.repo !== undefined && displayWhat.repo === true) {
        apiSearchRepos(currentQuery, pageLocal);
      } else if (displayWhat.repo !== undefined && displayWhat.issue === true) {
        apiSearchIssues(currentQuery, pageLocal);
      }
    }
  }
  useEffect(() => setTokenFunc(), []);

  return (
    <div className="App">
      <Navbar />
      <div className="row">
        <div className="col-2 px-0"></div>

        <div className="col-8 px-0">
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
          {issues.length !== 0 || repos.length !== 0 ? (
            <ListOfResults
              issues={issues}
              repos={repos}
              displayWhat={displayWhat}
              page={page}
              perPage={perPage}
              pageSwitch={(input, display) => pageSwitch(input, display)}
              currentQuery={currentQuery}
            />
          ) : (
            <span className="p-0 text-muted">
              Please search for issues or repositories above
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
