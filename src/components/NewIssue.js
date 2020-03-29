import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactModal from "react-modal";
import {Tab, Tabs } from "react-bootstrap";

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
              <label>Title</label>
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
              <label>Labels</label>
              <p style={{fontSize: '12px'}}>P/s: Every label must be divided by comma.</p>
              <p>Suggest:
              <span className="btn-suggest"
              onClick={()=> 
                props.setDataSubmit({
                  ...props.dataSubmit,
                  labels: 'bug,'
               })
              }
              style={{
                backgroundColor: '#d73a4a',
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "white"
              }}>bug</span>
              <span className="btn-suggest"
              onClick={()=> 
                props.setDataSubmit({
                  ...props.dataSubmit,
                  labels: 'documentation,'
               })
              }
              style={{
                borderRadius: "5px",
                backgroundColor: '#0075ca',
                padding: "5px 5px 5px 5px",
                color: "white"
              }}>documentation</span>
              <span className="btn-suggest"
              onClick={()=> 
                props.setDataSubmit({
                  ...props.dataSubmit,
                  labels: 'duplicate,'
               })
              }
              style={{
                backgroundColor: '#cfd3d7',
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "black"
              }}>duplicate</span>
              <span className="btn-suggest"
              onClick={()=> 
                props.setDataSubmit({
                  ...props.dataSubmit,
                  labels: 'enhancement,'
               })
              }
              style={{
                backgroundColor: '#a2eeef',
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "black"
              }}>enhancement</span>
              <span className="btn-suggest"
              onClick={()=> 
                props.setDataSubmit({
                  ...props.dataSubmit,
                  labels: 'good first issue,'
               })
              }
              style={{
                backgroundColor: '#7057ff',
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "white"
              }}>good first issue</span>
              <span className="btn-suggest"
              onClick={()=> 
                props.setDataSubmit({
                  ...props.dataSubmit,
                  labels: 'help wanted,'
               })
              }
              style={{
                backgroundColor: '#008672',
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "white"
              }}>help wanted</span>
              <span className="btn-suggest"
              onClick={()=> 
                props.setDataSubmit({
                  ...props.dataSubmit,
                  labels: 'invalid,'
               })
              }
              style={{
                backgroundColor: '#e4e669',
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "black"
              }}>invalid</span>
              <span className="btn-suggest"
              onClick={()=> 
                props.setDataSubmit({
                  ...props.dataSubmit,
                  labels: 'question,'
               })
              }
              style={{
                backgroundColor: '#d876e3',
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "black"
              }}>question</span>
              <span className="btn-suggest"
              onClick={()=> 
                props.setDataSubmit({
                  ...props.dataSubmit,
                  labels: 'wontfix,'
               })
              }
              style={{
                borderRadius: "5px",
                padding: "5px 5px 5px 5px",
                color: "black"
              }}>wontfix</span>
              </p>
              <input
                onChange={props.onInputChange}
                value={props.dataSubmit.labels}
                name="labels"
                type="text"
                className="form-control"
                id="labels-issue"
                placeholder="Labels"
              />
            </div>
            <div className="form-group">
            <label>Content</label>
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
            <h2>Title: {props.dataSubmit.title}</h2>
            <h5>Labels: <span className="bg-dark text-light"
            style={{
              borderRadius: "5px",
              padding: "5px 5px 5px 5px",
              color: "white"
            }}>{props.dataSubmit.labels}</span></h5>
            <p>Content: {props.dataSubmit.content}</p>
          </Tab>
        </Tabs>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </ReactModal>
  );
}
