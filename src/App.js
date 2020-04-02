import React,{ useState, useEffect }  from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import DetailIssue from './pages/DetailIssue';
import AddNewIssue from './pages/AddNewIssue';

export default function App() {
  const [token, setToken] = useState(null);
  function setTokenFunc() {
    const clientId = prompt('input your cliend id');
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
            console.log("Existing token: ", existingToken);
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