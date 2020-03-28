import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactModal from "react-modal";
import { Image, Form, Button } from "react-bootstrap";
import Moment from "react-moment";
import Comment from "./Comment.js";

const ReactDOM = require("react-dom");
const ReactMarkdown = require("react-markdown");
let html1 = null;

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

  if (infoIssue === null) {
    return;
  } else {
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={props.toggleModal}
        onRequestClose={() => props.setShowModal(false)}
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
              style={{
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "white"
              }}
            >
              ◌ Open
            </span>
          ) : (
            <span
              className="bg-danger"
              style={{
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "white"
              }}
            >
              √ Closed
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
          style={{
            borderBottom: "1px solid gray",
            paddingBottom: "10px",
            paddingTop: "10px"
          }}
        >
          <Image
            src={infoIssue.user.avatar_url}
            alt={infoIssue.user.login}
            className="avatar"
          />
          <span className="title-userissue">{infoIssue.user.login}</span>{" "}
          commented <Moment fromNow>{infoIssue.created_at}</Moment>
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
              //returns a promise due to async function map
              // console.log("testing", html1);

              return (
                <Comment item={item} user={props.user} repos={props.repos} />
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
              <Form.Control
                placeholder="Your comment"
                value={props.createComment}
                onChange={el => props.setCreateComment(el.target.value)}
                as="textarea"
                rows="3"
              />
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
