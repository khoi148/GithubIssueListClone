import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactModal from "react-modal";
import { Image, Form, Button } from "react-bootstrap";
import Moment from "react-moment";

const ReactDOM = require("react-dom");
const ReactMarkdown = require("react-markdown");
const emoji = {
  ["+1"]:
    "https://github.githubassets.com/images/icons/emoji/unicode/1f44d.png",
  ["-1"]:
    "https://github.githubassets.com/images/icons/emoji/unicode/1f44e.png",
  laugh: "https://github.githubassets.com/images/icons/emoji/unicode/1f604.png",
  confused:
    "https://github.githubassets.com/images/icons/emoji/unicode/1f615.png",
  heart: "https://github.githubassets.com/images/icons/emoji/unicode/2764.png",
  hooray:
    "https://github.githubassets.com/images/icons/emoji/unicode/1f389.png",
  rocket:
    "https://github.githubassets.com/images/icons/emoji/unicode/1f680.png",
  eyes: "https://github.githubassets.com/images/icons/emoji/unicode/1f440.png"
};

export default function Comment(props) {
  let [html1, setReactionsComments] = useState([]);

  const emojiComment = async idComment => {
    // try {
    const urlComRec = `https://api.github.com/repos/${props.user}/${props.repos}/issues/comments/${idComment}/reactions`; //fix here fix here.......
    const responseComRec = await fetch(urlComRec, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.squirrel-girl-preview+json"
      }
    });
    const responseComRecJS = await responseComRec.json();
    if (responseComRec.ok) {
      let emojiComment = responseComRecJS.map(item => item.content);
      let totalEmojiComment = emojiComment.reduce((total, content) => {
        if (content in total) {
          total[content]++;
        } else {
          total[content] = 1;
        }
        console.log("total", total);
        return total;
      }, {});

      let emojiComArray = Object.keys(totalEmojiComment);
      let htmlforEmojiCom = emojiComArray.map(item => {
        return (
          <span className="emoji-showing">
            {item && <Image className="icon-reactions" src={emoji[item]} />}{" "}
            {item && totalEmojiComment[item]}
          </span>
        );
      });
      // console.log("html2", htmlforEmojiCom);
      setReactionsComments(htmlforEmojiCom);
    }
  };

  useEffect(() => {
    emojiComment(props.item.id);
  }, []);

  const addReactComments = async (id, idAdd) => {
    try {
      let issue = { content: idAdd };
      const url = `https://api.github.com/repos/${props.user}/${props.repos}/issues/comments/${id}/reactions`;
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
        props.toggleIssue(); //id id id id issue
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="comment-place">
      <div
        className="comment-headers"
        style={{
          borderBottom: "1px solid gray",
          paddingBottom: "10px",
          paddingTop: "10px"
        }}
      >
        <div>
          <Image
            src={props.item.user.avatar_url}
            alt={props.item.user.login}
            className="avatar"
          />
          {"  "}
          <span className="title-userissue">{props.item.user.login}</span>
          <span>
            {" "}
            commented <Moment fromNow>{props.item.created_at}</Moment>
          </span>
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
                onClick={() => addReactComments(props.item.id, "+1")}
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
                onClick={() => addReactComments(props.item.id, "-1")}
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
                onClick={() => addReactComments(props.item.id, "laugh")}
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
                onClick={() => addReactComments(props.item.id, "confused")}
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
                onClick={() => addReactComments(props.item.id, "heart")}
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
                onClick={() => addReactComments(props.item.id, "hooray")}
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
                onClick={() => addReactComments(props.item.id, "rocket")}
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
                onClick={() => addReactComments(props.item.id, "eyes")}
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
                onClick={() => props.editComment(props.item.id)}
                className="dropdown-item"
                type="button"
              >
                Edit Comments
              </button>
              <button
                onClick={() => props.deleteComment(props.item.id)}
                className="dropdown-item"
                type="button"
              >
                Delete Comments
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ReactMarkdown escapeHtml={true} source={props.item.body} />
        <span style={{ fontSize: "12px", fontStyle: "italic" }}>
          Updated <Moment fromNow>{props.item.updated_at}</Moment>
        </span>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            borderRadius: "10px"
          }}
        >
          {html1}
        </div>
      </div>
    </div>
  );
}
