import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import ShowIssue from "../components/ShowIssue";
import ListOfResults from "../components/ListOfResults.js";
import ProjectTabs from "../components/ProjectTabs.js";
import Navbar from "../components/Navbar.js";
import SearchBar from "../components/SearchBar.js";

const clientId = process.env.REACT_APP_CLIENT_ID;
let URL_SEARCH_REPOS_BEG = `https://api.github.com/search/repositories?q=`;
let URL_SEARCH_ISSUES_BEG = `https://api.github.com/search/issues?q=`;
let additional_qualifier = "";
let url = "";
let currentQuery = "";
let perPage = 12;
export default function Homepage(props) {
  let { userParam, repoParam } = useParams();
  //Chinhs vars
  //let [showModal, setShowModal] = useState(false);
  // let [commentExist, setCommentExist] = useState([]);
  // let [issue, setIssue] = useState(null);
  // let [createComment, setCreateComment] = useState("");
  // let [reactionsThread, setReactionsThread] = useState([]);
  //my Vars
  const [repos, setRepos] = useState([]);
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [displayWhat, setDisplayWhat] = useState({
    repo: true,
    issue: false
  });

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
    // console.log("on page", page, "going to page ", pageNum);
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

  useEffect(() => {
    if (userParam !== undefined && repoParam !== undefined) {
      console.log(
        "params detected, userParam: " + userParam + ", repoParam: " + repoParam
      );
      apiSearchIssues(`${userParam}/${repoParam}`);
    }
  }, []);

  if (!props.token) {
    return <h1>No Token Found</h1>;
  }
  return (
    <div className="App">
      {/* <ShowIssue
        //toggleModal={showModal}
        //setShowModal={setShowModal}
        issueSelected={issue}
        CommentsList={commentExist}
        setCreateComment={setCreateComment}
        createComment={createComment}
        postComment={postComment}
        reactionsThread={reactionsThread}
        editComment={editComment}
        deleteComment={deleteComment}
        //token={props.token}
        toggleIssue={toggleIssue}
      /> */}

      <Navbar />
      <div className="row">
        <div className="col-2 px-0"></div>

        <div className="col-8 px-0">
          <div className="row pt-3">
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
            </div>
          </div>
          {issues.length !== 0 || repos.length !== 0 ? (
            <ListOfResults
              issues={issues}
              repos={repos}
              token={props.token}
              apiSearchIssuesMethod={query => apiSearchIssues(query)}
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
