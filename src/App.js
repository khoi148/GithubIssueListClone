import React, { useState, useEffect } from "react";
import "./App.css";
import ShowIssue from "./components/ShowIssue";
import NewIssue from './components/NewIssue'

const clientId = process.env.REACT_APP_CLIENT_ID;
function App(props) {
  let [createIssueModal, setCreateIssueModal] = useState(false);
  let [dataSubmit, setDataSubmit] = useState({title: '', content: '', labels: []});
  const [token, setToken] = useState(null);
  let [showModal, setShowModal] = useState(false);
  let [commentExist, setCommentExist] = useState([]);
  let [issue, setIssue] = useState(null);
  let [createComment, setCreateComment] = useState("");
  let [reactionsThread, setReactionsThread] = useState([]);
  // Set user/repos/ids to test modal // remove them after making function to get Repos with issue list to hook ↓
  // install markdown : npm install --save react-markdown
  // install moment: npm install --save moment react-moment
  const user = "ldchinhcr";
  const repos = "test-issue";
  const ids = '2';
  // Set user/repos/ids to test modal --> remove them after making function to get Repos with issue list to hook ↑
  useEffect(() => {
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
      setToken(existingToken);
    }
  }, []);

  const toggleIssue = async() => {
    // add due to id later , change: ids dynamically
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

  const onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
   })
  }

  const postIssue = async(el) => {
    el.preventDefault();
    dataSubmit.labels = dataSubmit.labels.split(',').filter(item => item !== '');
    if(!dataSubmit.title || !dataSubmit.content) {
      alert('Dont leave title or content box blank!!')
      return false;
    }
    try {
      const issue = {title: dataSubmit.title, body: dataSubmit.content, labels: dataSubmit.labels}
      const url = `https://api.github.com/repos/${user}/${repos}/issues`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${token}`
        },
        body: JSON.stringify(issue)
      });
      if (response.ok) {
        alert("Your issue had been created successfully!");
        setDataSubmit({title: '', content: '', labels: []});
      }
    } catch (e) {
      console.log(e);
    }
  }



  const postComment = async comment => {
    if (!comment) {
      alert("Don't leave the comment blank");
      return false;
    }
    try {
      const issue = { body: comment };
      const url = `https://api.github.com/repos/${user}/${repos}/issues/${ids}/comments`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${token}`
        },
        body: JSON.stringify(issue)
      });
      if (response.ok) {
        alert("Your comment had been created successfully!");
        setCreateComment("");
        toggleIssue(); //id
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editComment = async idEdit => {
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
        toggleIssue(); //id
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async idDelete => {
    try {
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
        toggleIssue(); //id issue
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!token || !issue) {
    // add this to issue list
    return (
      <div>
        <div>On Loading...</div>
        <button onClick={() => setCreateIssueModal(true)}>Make new issue</button>
        <NewIssue dataSubmit={dataSubmit} setDataSubmit={setDataSubmit} toggleCreateIssue={createIssueModal} setCreateIssue={setCreateIssueModal} postIssue={postIssue} onInputChange={onInputChange}/>
        <button onClick={() => toggleIssue()}>Here is show an issue</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => setCreateIssueModal(true)}>Make new issue</button>
      <button onClick={() => toggleIssue()}>Here is issue</button>
      <NewIssue dataSubmit={dataSubmit} setDataSubmit={setDataSubmit} toggleCreateIssue={createIssueModal} setCreateIssue={setCreateIssueModal} postIssue={postIssue} onInputChange={onInputChange}/>
      <ShowIssue
        {...props}
        ids={ids}
        user={user}
        repos={repos}
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
    </div>
  );
}

export default App;
