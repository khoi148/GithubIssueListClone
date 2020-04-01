import React,{ useState, useEffect }  from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DetailIssue from './pages/DetailIssue';
import AddNewIssue from './pages/AddNewIssue';

const clientId = process.env.REACT_APP_CLIENT_ID;
let URL_SEARCH_REPOS_BEG = `https://api.github.com/search/repositories?q=`;
let URL_SEARCH_ISSUES_BEG = `https://api.github.com/search/issues?q=`;
let additional_qualifier = "";
let url = "";
let currentQuery = "";
let perPage = 12;
export default function App() {

  let [commentExist, setCommentExist] = useState([]);
  let [issue, setIssue] = useState(null);

  let [createComment, setCreateComment] = useState("");
  let [reactionsThread, setReactionsThread] = useState([]);
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
      localStorage.setItem("token", accessToken); //store token in local storage
      setToken(accessToken);
    }

    if (existingToken) {
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
    // console.log("on page", page, "going to page ", pageNum);
    let pageLocal = page;
    let pageOriginal = page;
    if (pageNum === "next") pageLocal += 1;
    else if (pageNum === "prev") pageLocal -= 1;
    else if (pageNum === "next-5") pageLocal += 5;
    else if (pageNum === "prev-5") pageLocal -= 5;
    else pageLocal = parseInt(pageNum);

const clientId = '72ed9cbcdaa66f954d55';

export default function App() {
    const [token, setToken] = useState(null);
    function setTokenFunc() {
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
            localStorage.setItem("token", accessToken);
            setToken(accessToken);
        }

        if (existingToken) {
            console.log("existing token: ", existingToken);
            setToken(existingToken);
        }
    }

    useEffect(() => { setTokenFunc() }, []);
    return (
        <div>
            <Switch>
                <Route path='/' render={(props) => <Homepage {...props}/>} exact/>
                <Route path='/issue/:user/:repos/:ids' render={(props)=> <DetailIssue {...props}/>}/>
                <Route path='/addnewissue/:user/:repos' render={(props)=> <AddNewIssue {...props}/>}/>
                <Route path='*' component={NotFound}/>
            </Switch>
        </div>
    )
}

const NotFound = () => {
    return <h1>404 NOT FOUND</h1>
}