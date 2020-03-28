import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactModal from "react-modal";
import { Image, Form, Button, Tab, Tabs } from "react-bootstrap";

export default function NewIssue(props) {
  const [key, setKey] = useState("createissue");
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={props.toggleCreateIssue}
      onRequestClose={() => props.setCreateIssue(false)}
      style={{ overlay: { display: "flex", justifyContent: "center" } }}
    >
      <form onSubmit={props.postIssue}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={k => setKey(k)}
        >
          <Tab eventKey="createissue" title="Create Issue">
            <div className="form-group">
              <label for="title-input">Title</label>
              <input
                onChange={props.onInputChange}
                value={props.dataSubmit.title}
                name="title"
                type="text"
                className="form-control"
                id="title-issue"
                placeholder="Title"
              />
            </div>
            <div className="form-group">
            <label for="input-issue">Content</label>
            <textarea
              onChange={props.onInputChange}
              value={props.dataSubmit.content}
              name="content"
              className="form-control"
              id="input-issue"
              rows="8"
              placeholder="Content"
            ></textarea>
          </div>
          </Tab>
          <Tab eventKey="preview" title="Preview">
            <h2>{props.dataSubmit.title}</h2>
            <p>{props.dataSubmit.content}</p>
          </Tab>
        </Tabs>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </ReactModal>
  );
}
