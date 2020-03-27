import React, { useState, useEffect } from "react";
import "./App.css";
import ShowIssue from "./components/ShowIssue";

const clientId = process.env.REACT_APP_CLIENT_ID;
function App(props) {
  const [token, setToken] = useState(null);
  let [showModal, setShowModal] = useState(false);
  let [commentExist, setCommentExist] = useState(null);
  let [issue, setIssue] = useState(null);
  let [createComment, setCreateComment] = useState(null)
  // Set user/repos/ids to test modal // remove them after making function to get Repos with issue list to hook ↓
  //  install markdown : npm install --save react-markdown
  const user = "ldchinhcr";
  const repos = "test-issue";
  const ids = "2";
  // Set user/repos/ids to test modal --> remove them after making function to get Repos with issue list to hook ↑
  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
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
      setToken(existingToken);
    }
  }, []);

  const toggleIssue = async () => {
    // add due to id later , change: ids dynamically
    const url = `https://api.github.com/repos/${user}/${repos}/issues/${ids}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.github.squirrel-girl-preview+json",
      }
    });
    const responseJson = await response.json();
    const urlRec = `https://api.github.com/repos/${user}/${repos}/issues/${ids}/reactions`;
    const responseRec = await fetch(urlRec, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.squirrel-girl-preview+json"
      }
    });
    const responseJsonRec = await responseRec.json();
    console.log(responseJson);
    setIssue(responseJson);
    if (responseJson.comments > 0) {
      const urlComment = `https://api.github.com/repos/${user}/${repos}/issues/${ids}/comments`;
      const responseComment = await fetch(urlComment, {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.github.squirrel-girl-preview+json"
        }
      });
      const respCommentJS = await responseComment.json();
      setCommentExist(respCommentJS);
    }
    setShowModal(true);
  };

  const postComment = async () => {
    if (!createComment) {
      alert("Don't leave the comment blank");
      return false;
    }
    const issue = { body: createComment };
    const url = `https://api.github.com/repos/${user}/${repos}/issues/${ids}/comments`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `token ${token}`
      },
      body: JSON.stringify(issue)
    });
    setCreateComment("");
    toggleIssue();//id
  };

  if (!token || !issue) {
    // add this to issue list
    return (
      <div>
        <div>On Loading...</div>
        <button onClick={() => toggleIssue()}>Here is issue</button>
      </div>
    );
  }
  return (
    <div>
      {console.log("rururn")}
      <ShowIssue
        toggleModal={showModal}
        setShowModal={setShowModal}
        issueSelected={issue}
        CommentsList={commentExist}
      />
    </div>
  );
}

export default App;
