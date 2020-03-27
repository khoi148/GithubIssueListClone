import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactModal from "react-modal";
import { Image } from "react-bootstrap";

const ReactDOM = require("react-dom");
const ReactMarkdown = require("react-markdown");

export default function ShowIssue(props) {
  let infoIssue = props.issueSelected;
  if (infoIssue === null) { return;}
  else {
    return (
      <ReactModal
        ariaHideApp={false}
        isOpen={props.toggleModal}
        onRequestClose={() => props.setShowModal(false)}
        style={{
          overlay: { display: "flex", justifyContent: "center"},
          content: { width: "90%", height: "90%", position: "relative" }
        }}
      >
        <h2>Title: {infoIssue.title}</h2>
        <div> Thread Status: {(infoIssue.state === 'open')? <div className='btn btn-success'>◌ Open</div> : <div className='btn btn-danger'>√ Closed</div>}</div>
        <div>User: {infoIssue.user.login}</div>
        <Image src={infoIssue.user.avatar_url} alt={infoIssue.user.login} className='avatar'/>
            <div>
            <ReactMarkdown source={infoIssue && infoIssue.body} />
            </div>
        <div>{props.CommentsList && props.CommentsList.map(item => {
            return (
                <div>
                <div>{item.user.login}</div>
                <div><Image src={item.user.avatar_url} alt={item.user.login} className='avatar'/></div>
                <div><ReactMarkdown source={item.body} /></div>
                </div>
            )
        })}</div>
      </ReactModal>
    );
  }
}
