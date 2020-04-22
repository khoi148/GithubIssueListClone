import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DetailIssue from './pages/DetailIssue';
import AddNewIssue from './pages/AddNewIssue';


let URL_SEARCH_REPOS_BEG = `https://api.github.com/search/repositories?q=`;
let URL_SEARCH_ISSUES_BEG = `https://api.github.com/search/issues?q=`;
let additional_qualifier = "";
let url = "";
let currentQuery = "";
let perPage = 12;
export default function App() {
    const [token, setToken] = useState(null);
    const [page, setPage] = useState(1);
    const history = useHistory();
    
    function setTokenFunc() {
        let url = '';
        if (!localStorage.getItem("token")){
            const clientId = process.env.CLIENTID;
            url = `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
            }
        const existingToken = localStorage.getItem("token");
        const accessToken =
            window.location.search.split("=")[0] === "?access_token"
                ? window.location.search.split("&scope")[0].split("access_token=")[1]
                : null;

        if (!accessToken && !existingToken) {
            window.location.replace(url);
        }

        if (accessToken) {
            console.log(`New accessToken: ${accessToken}`);
            localStorage.setItem("token", accessToken);
            setToken(accessToken);
        }

        if (existingToken) {
            console.log("Existing token: ", existingToken);
            setToken(existingToken);
        }
    }

    useEffect(() => { setTokenFunc() }, []);

    const [displayWhat, setDisplayWhat] = useState({
        repo: true,
        issue: false
    });

    const [repos, setRepos] = useState([]);
    const [issues, setIssues] = useState([]);
    async function apiSearchRepos(query = "facebook", pageSet = 1) {
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



    return (
        <div>
            <Switch>
                <Route path='/' render={(props) => <Homepage
                    apiSearchIssues={apiSearchIssues}
                    apiSearchRepos={apiSearchRepos}
                    issues={issues}
                    repos={repos}
                    currentQuery={currentQuery}
                    displayWhat={displayWhat}
                    page={page}
                    setPage={setPage}
                    perPage={perPage}
                    history={history}
                    setRepos={setRepos}
                    setIssues={setIssues}
                    {...props} />} exact />
                <Route path='/issue/:user/:repos/:ids' render={(props) => <DetailIssue apiSearchIssues={apiSearchIssues} {...props} />} />
                <Route path='/addnewissue/:user/:repos' render={(props) => <AddNewIssue apiSearchIssues={apiSearchIssues} {...props} />} />
                <Route path='*' component={NotFound} />
            </Switch>
        </div>
    )
}

const NotFound = () => {
    return <h1>404 NOT FOUND</h1>
}