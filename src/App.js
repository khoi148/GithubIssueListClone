import React, { useState, useEffect } from "react";
import "./App.css";
import ShowIssue from "./components/ShowIssue";
import NewIssue from "./components/NewIssue";
import ListOfResults from "./components/ListOfResults.js";
import ProjectTabs from "./components/ProjectTabs.js";
import Navbar from "./components/Navbar.js";
import SearchBar from "./components/SearchBar.js";

const clientId = prompt('Provide your client ID');
let URL_SEARCH_REPOS_BEG = `https://api.github.com/search/repositories?q=`;
let URL_SEARCH_ISSUES_BEG = `https://api.github.com/search/issues?q=`;
let additional_qualifier = "";
let url = "";
let currentQuery = "";
let perPage = 12;
export default function App() {
  // let [createIssueModal, setCreateIssueModal] = useState(false);

  let [showModal, setShowModal] = useState(false);
  let [commentExist, setCommentExist] = useState([]);
  let [issue, setIssue] = useState(null);

  let [createComment, setCreateComment] = useState("");
  let [reactionsThread, setReactionsThread] = useState([]);
  // Set user/repos/ids to test modal // remove them after making function to get Repos with issue list to hook ↓
  // install markdown : npm install --save react-markdown
  // install moment: npm install --save moment react-moment
  // const user = "hungprok";
  // const repos = "Tictactoe";
  // const ids = '3';
  // Set user/repos/ids to test modal --> remove them after making function to get Repos with issue list to hook ↑

  // let page = 1;
  const [token, setToken] = useState(null);
  const [repos, setRepos] = useState([]);
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [displayWhat, setDisplayWhat] = useState({
    repo: true,
    issue: false
  });
  
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
  useEffect(() => setTokenFunc(), []);

  const toggleIssue = async (user, repos, ids) => {
    let issueSide = {};
    try {
      try {
        const url = `https://api.github.com/repos/${user}/${repos}/issues/${ids}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/vnd.github.squirrel-girl-preview+json"
          }
        });
        const responseJson = await response.json();
        console.log(response);
        if (response.ok) {
          setIssue(responseJson);
          issueSide = responseJson;
        }
      } catch (e) {
        console.log(e);
      }
      try {
        const urlRec = `https://api.github.com/repos/${user}/${repos}/issues/${ids}/reactions`;
        const responseRec = await fetch(urlRec, {
          method: "GET",
          headers: {
            Accept: "application/vnd.github.squirrel-girl-preview+json"
          }
        });
        const responseJsonRec = await responseRec.json();
        if (responseRec.ok && responseJsonRec) {
          setReactionsThread(responseJsonRec);
        }
      } catch (e) {
        console.log(e);
      }

      if (issueSide.comments > 0) {
        try {
          const urlComment = `https://api.github.com/repos/${user}/${repos}/issues/${ids}/comments`;
          const responseComment = await fetch(urlComment, {
            method: "GET",
            headers: {
              "Content-Type":
                "application/vnd.github.squirrel-girl-preview+json"
            }
          });
          const respCommentJS = await responseComment.json();
          if (responseComment.ok) {
            setCommentExist(respCommentJS);
          }
        } catch (e) {
          console.log(e);
        }
      }
      setShowModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  const postComment = async comment => {
    if (!comment) {
      alert("Don't leave the comment blank");
      return false;
    }
    try {
      let user = issue.repository_url.split("repos/")[1].split("/")[0];
      let repos = issue.repository_url.split("repos/")[1].split("/")[1];
      let ids = issue.number;
      const issues = { body: comment };
      const url = `https://api.github.com/repos/${user}/${repos}/issues/${ids}/comments`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${token}`
        },
        body: JSON.stringify(issues)
      });
      if (response.ok) {
        alert("Your comment had been created successfully!");
        setCreateComment("");
        toggleIssue(user, repos, ids);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editComment = async idEdit => {
    let user = issue.repository_url.split("repos/")[1].split("/")[0];
    let repos = issue.repository_url.split("repos/")[1].split("/")[1];
    let ids = issue.number;
    let value = prompt("Type what you want to change");
    if (!value) {
      alert("Don't leave the comment blank");
      return false;
    }
    try {
      const issue = { body: value };
      const url = `https://api.github.com/repos/${user}/${repos}/issues/comments/${idEdit}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${token}`
        },
        body: JSON.stringify(issue)
      });
      if (response.ok) {
        alert("Your comment had been changed successfully!");
        toggleIssue(user, repos, ids); //id
      } else if (response.status === 403) {
        alert("You dont have any authorize to edit this comment!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async idDelete => {
    try {
      let user = issue.repository_url.split("repos/")[1].split("/")[0];
      let repos = issue.repository_url.split("repos/")[1].split("/")[1];
      let ids = issue.number;
      const url = `https://api.github.com/repos/${user}/${repos}/issues/comments/${idDelete}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/vnd.github.squirrel-girl-preview+json",
          Authorization: `token ${token}`
        }
      });
      if (response.ok) {
        alert("Your comment had been deleted successfully!");
        toggleIssue(user, repos, ids); //id issue
      } else if (response.status === 403) {
        alert("You dont have any authorize to delete this comment!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!token) {
    return <h1></h1>;
  }
  return (
    <div className="App">
      <ShowIssue
        toggleModal={showModal}
        setShowModal={setShowModal}
        issueSelected={issue}
        CommentsList={commentExist}
        setCreateComment={setCreateComment}
        createComment={createComment}
        postComment={postComment}
        reactionsThread={reactionsThread}
        editComment={editComment}
        deleteComment={deleteComment}
        token={token}
        toggleIssue={toggleIssue}
      />

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
              toggleIssue={toggleIssue}
              token={token}
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
