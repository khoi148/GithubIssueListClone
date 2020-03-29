import React, { useState } from "react";
import Open from "../assets/icon/open.svg";
import Close from "../assets/icon/close.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactModal from "react-modal";
import { Image, Form, Button, Tab, Tabs } from "react-bootstrap";
import Moment from "react-moment";
import Comment from "./Comment.js";

// const ReactDOM = require("react-dom");
const ReactMarkdown = require("react-markdown");

export default function ShowIssue(props) {
  const emoji = {
    ["+1"]:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png",
    ["-1"]:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png",
    laugh:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f604.png",
    confused:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f615.png",
    heart:
      "https://github.githubassets.com/images/icons/emoji/unicode/2764.png",
    hooray:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f389.png",
    rocket:
      "https://github.githubassets.com/images/icons/emoji/unicode/1f680.png",
    eyes: "https://github.githubassets.com/images/icons/emoji/unicode/1f440.png"
  };
  const [key, setKey] = useState("comment");
  let infoIssue = props.issueSelected;
  let emojiThread = props.reactionsThread.map(item => item.content);
  let totalEmojiThread = emojiThread.reduce((total, content) => {
    if (content in total) {
      total[content]++;
    } else {
      total[content] = 1;
    }
    return total;
  }, {});
  let emojiArray = Object.keys(totalEmojiThread);
  let htmlforEmoji = emojiArray.map(item => {
    return (
      <span className="emoji-showing">
        {item && <Image className="icon-reactions" src={emoji[item]} />}{" "}
        {item && totalEmojiThread[item]}
      </span>
    );
  });

  const addReactThread = async (idAdd, id) => {
    try {
      let user = props.issueSelected.repository_url.split('repos/')[1].split('/')[0]
      let repos = props.issueSelected.repository_url.split('repos/')[1].split('/')[1]
      let issue = { content: idAdd };
      const url = `https://api.github.com/repos/${user}/${repos}/issues/${id}/reactions`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/vnd.github.squirrel-girl-preview+json",
          Authorization: `token ${props.token}`
        },
        body: JSON.stringify(issue)
      });
      if (response.ok) {
        alert("Your reaction had been added successfully!");
        props.toggleIssue(user,repos,id); //id id issue
      }
    } catch (e) {
      console.log(e);
    }
  };

  const statusIssue = async (id, content) => {
    try {
      let user = props.issueSelected.repository_url.split('repos/')[1].split('/')[0]
      let repos = props.issueSelected.repository_url.split('repos/')[1].split('/')[1]
      let status = "";
      if (content === "open") {
        status = "closed";
      } else if (content === "closed") {
        status = "open";
      }
      let issue = { state: status };
      const url = `https://api.github.com/repos/${user}/${repos}/issues/${id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${props.token}`
        },
        body: JSON.stringify(issue)
      });
      if (response.ok) {
        alert("Your issue's status had been changed successfully!");
        props.toggleIssue(user,repos,id);
      } else if (response.status === 403) {
        alert("You dont have any authorize to change status this issue!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editIssue = async id => {
    try {
      let user = props.issueSelected.repository_url.split('repos/')[1].split('/')[0]
      let repos = props.issueSelected.repository_url.split('repos/')[1].split('/')[1]
      let content = prompt("Your content need to change");
      if (content === "") {
        alert("Dont leave content blank");
        return false;
      } else {
        let issue = { body: content };
        const url = `https://api.github.com/repos/${user}/${repos}/issues/${id}`;
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `token ${props.token}`
          },
          body: JSON.stringify(issue)
        });
        if (response.ok) {
          alert("Your issue had been changed successfully!");
          props.toggleIssue(user,repos,id); //id issue
        } else if (response.status === 403) {
          alert("You dont have any authorize to change content this issue!");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(infoIssue)
  if (!infoIssue) {
    return <span></span>;
  } else {
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={props.toggleModal}
        onRequestClose={() => props.setShowModal(false)}
        style={{overlay: {display: 'flex', justifyContent: 'center'}, content: {width: '80%', height: '75%', position: 'relative', top: '15%'}}}
      >
        <h2 className="title-issue my-2">
          {infoIssue.title}{" "}
          <span
            style={{
              fontStyle: "italic",
              fontWeight: "normal",
              fontSize: "20px"
            }}
          >
            {" "}
            #{infoIssue.number}
          </span>{" "}
          {infoIssue.labels &&
            infoIssue.labels.map(item => {
              return (
                <button
                  className="labels-btn mx-1"
                  style={{
                    borderRadius: "5px",
                    padding: "5px 5px 5px 5px",
                    backgroundColor: `#${item.color}`,
                    fontSize: "10px",
                    fontWeight: "normal"
                  }}
                >
                  {item.name}
                </button>
              );
            })}
        </h2>
        <div className="py-2">
          {" "}
          {infoIssue.state === "open" ? (
            <span
              className="bg-success"
              title="Toggle to Close"
              style={{
                cursor: "pointer",
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "white"
              }}
              onClick={() => statusIssue(infoIssue.number, infoIssue.state)}
            >
              <Image src={Open} /> Open
            </span>
          ) : (
            <span
              className="bg-danger"
              title="Toggle to Open"
              style={{
                cursor: "pointer",
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "white"
              }}
              onClick={() => statusIssue(infoIssue.number, infoIssue.state)}
            >
              <Image src={Close} /> Closed
            </span>
          )}
          <span className="title-userissue">{infoIssue.user.login}</span>
          <span>
            {" "}
            opened this issued <Moment fromNow>
              {infoIssue.created_at}
            </Moment> - {infoIssue.comments} Comments
          </span>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{
            borderBottom: "1px solid gray",
            paddingBottom: "10px",
            paddingTop: "10px"
          }}
        >
          <div>
            <Image
              src={infoIssue.user.avatar_url}
              alt={infoIssue.user.login}
              className="avatar"
            />
            <span className="title-userissue">{infoIssue.user.login}</span>{" "}
            commented <Moment fromNow>{infoIssue.created_at}</Moment>
          </div>
          <div className="d-flex flex-row">
            <div className="dropdown mr-1">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Reactions
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button
                  className="dropdown-item"
                  onClick={() => addReactThread("+1", infoIssue.number)}
                  type="button"
                >
                  <Image
                    className="icon-reactions"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png"
                    alt="+1"
                  />{" "}
                  Like
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => addReactThread("-1", infoIssue.number)}
                  type="button"
                >
                  <Image
                    className="icon-reactions"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png"
                    alt="-1"
                  />{" "}
                  Dislike
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => addReactThread("laugh", infoIssue.number)}
                  type="button"
                >
                  <Image
                    className="icon-reactions"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/1f604.png"
                    alt="laugh"
                  />{" "}
                  Laugh
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => addReactThread("confused", infoIssue.number)}
                  type="button"
                >
                  <Image
                    className="icon-reactions"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/1f615.png"
                    alt="confused"
                  />{" "}
                  Confused
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => addReactThread("heart", infoIssue.number)}
                  type="button"
                >
                  <Image
                    className="icon-reactions"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png"
                    alt="heart"
                  />{" "}
                  Love
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => addReactThread("hooray", infoIssue.number)}
                  type="button"
                >
                  <Image
                    className="icon-reactions"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/1f389.png"
                    alt="hooray"
                  />{" "}
                  Hooray
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => addReactThread("rocket", infoIssue.number)}
                  type="button"
                >
                  <Image
                    className="icon-reactions"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png"
                    alt="rocket"
                  />{" "}
                  Rocket
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => addReactThread("eyes", infoIssue.number)}
                  type="button"
                >
                  <Image
                    className="icon-reactions"
                    src="https://github.githubassets.com/images/icons/emoji/unicode/1f440.png"
                    alt="eyes"
                  />{" "}
                  Eyes
                </button>
              </div>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button
                  onClick={() => editIssue(infoIssue.number)}
                  className="dropdown-item"
                  type="button"
                >
                  Edit Contents
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ReactMarkdown
            includeNodeIndex={true}
            escapeHtml={true}
            source={infoIssue && infoIssue.body}
          />
          <span style={{ fontSize: "12px", fontStyle: "italic" }}>
            Updated <Moment fromNow>{infoIssue.updated_at}</Moment>
          </span>
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "10px"
            }}
          >
            {htmlforEmoji}
          </div>
        </div>
        <div>
          {props.CommentsList &&
            props.CommentsList.map(item => {
              return (
                <Comment
                  postComment={props.postComment}
                  editComment={props.editComment}
                  item={item}
                  user={props.user}
                  repos={props.repos}
                  token={props.token}
                  deleteComment={props.deleteComment}
                  toggleIssue={props.toggleIssue}
                  issueSelected={props.issueSelected}
                />
              );
            })}
        </div>
        <div>
          <Form
            className="comment-place"
            onSubmit={el => {
              el.preventDefault();
              props.postComment(props.createComment);
            }}
          >
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Leave Comment</Form.Label>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={k => setKey(k)}
              >
                <Tab eventKey="comment" title="Comment Box">
                  <Form.Control
                    placeholder="Your comment"
                    value={props.createComment}
                    onChange={el => props.setCreateComment(el.target.value)}
                    as="textarea"
                    rows="3"
                  />
                </Tab>
                <Tab eventKey="preview" title="Preview">
                  <p className="mt-3">{props.createComment}</p>
                </Tab>
              </Tabs>
              <div className="d-flex justify-content-end align-self-end">
                <Button
                  className="my-2 btn-secondary"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </ReactModal>
    );
  }
}
