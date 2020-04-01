import React, { useState } from "react";
import ReactModal from "react-modal";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NewIssue(props) {
  //props user, repo

  return (
    <div>
      <Link
        to={`/addnewissue/${props.user}/${props.repo}`}
        className="flex-grow-1"
        style={{ height: "30px" }}
      >
        <button className="btn btn-success btn-sm text-light text-decoration-none">
          New Issue
        </button>
      </Link>
      {/* <ReactModal
        ariaHideApp={false}
        isOpen={isOpen}
        style={{ overlay: { display: "flex", justifyContent: "center" } }}
      >
        <form onSubmit={event => postIssue(event)}>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={k => setKey(k)}
          >
            <Tab eventKey="createissue" title="Create Issue">
              <div className="form-group">
                <label>
                  Title of Issue for {props.user}/{props.repo}
                </label>
                <input
                  onChange={onInputChange}
                  value={dataSubmit.title}
                  name="title"
                  type="text"
                  className="form-control"
                  id="title-issue"
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label>Labels</label>
                <p style={{ fontSize: "12px" }}>
                  P/s: Every label must be divided by comma.
                </p>
                <p>
                  Suggest:
                  <span
                    className="btn-suggest"
                    onClick={() =>
                      setDataSubmit({
                        ...dataSubmit,
                        labels: (dataSubmit.labels += "bug,")
                      })
                    }
                    style={{
                      backgroundColor: "#d73a4a",
                      borderRadius: "5px",
                      padding: "5px 5px 5px 5px",
                      color: "white"
                    }}
                  >
                    bug
                  </span>
                  <span
                    className="btn-suggest"
                    onClick={() =>
                      setDataSubmit({
                        ...dataSubmit,
                        labels: (dataSubmit.labels += "documentation,")
                      })
                    }
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#0075ca",
                      padding: "5px 5px 5px 5px",
                      color: "white"
                    }}
                  >
                    documentation
                  </span>
                  <span
                    className="btn-suggest"
                    onClick={() =>
                      setDataSubmit({
                        ...dataSubmit,
                        labels: (dataSubmit.labels += "duplicate,")
                      })
                    }
                    style={{
                      backgroundColor: "#cfd3d7",
                      borderRadius: "5px",
                      padding: "5px 5px 5px 5px",
                      color: "black"
                    }}
                  >
                    duplicate
                  </span>
                  <span
                    className="btn-suggest"
                    onClick={() =>
                      setDataSubmit({
                        ...dataSubmit,
                        labels: (dataSubmit.labels += "enhancement,")
                      })
                    }
                    style={{
                      backgroundColor: "#a2eeef",
                      borderRadius: "5px",
                      padding: "5px 5px 5px 5px",
                      color: "black"
                    }}
                  >
                    enhancement
                  </span>
                  <span
                    className="btn-suggest"
                    onClick={() =>
                      setDataSubmit({
                        ...dataSubmit,
                        labels: (dataSubmit.labels += "good first issue,")
                      })
                    }
                    style={{
                      backgroundColor: "#7057ff",
                      borderRadius: "5px",
                      padding: "5px 5px 5px 5px",
                      color: "white"
                    }}
                  >
                    good first issue
                  </span>
                  <span
                    className="btn-suggest"
                    onClick={() =>
                      setDataSubmit({
                        ...dataSubmit,
                        labels: (dataSubmit.labels += "help wanted,")
                      })
                    }
                    style={{
                      backgroundColor: "#008672",
                      borderRadius: "5px",
                      padding: "5px 5px 5px 5px",
                      color: "white"
                    }}
                  >
                    help wanted
                  </span>
                  <span
                    className="btn-suggest"
                    onClick={() =>
                      setDataSubmit({
                        ...dataSubmit,
                        labels: (dataSubmit.labels += "invalid,")
                      })
                    }
                    style={{
                      backgroundColor: "#e4e669",
                      borderRadius: "5px",
                      padding: "5px 5px 5px 5px",
                      color: "black"
                    }}
                  >
                    invalid
                  </span>
                  <span
                    className="btn-suggest"
                    onClick={() =>
                      setDataSubmit({
                        ...dataSubmit,
                        labels: (dataSubmit.labels += "question,")
                      })
                    }
                    style={{
                      backgroundColor: "#d876e3",
                      borderRadius: "5px",
                      padding: "5px 5px 5px 5px",
                      color: "black"
                    }}
                  >
                    question
                  </span>
                  <span
                    className="btn-suggest"
                    onClick={() =>
                      setDataSubmit({
                        ...dataSubmit,
                        labels: (dataSubmit.labels += "wontfix,")
                      })
                    }
                    style={{
                      borderRadius: "5px",
                      padding: "5px 5px 5px 5px",
                      color: "black"
                    }}
                  >
                    wontfix
                  </span>
                </p>
                <input
                  onChange={onInputChange}
                  value={dataSubmit.labels}
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
                  onChange={onInputChange}
                  value={dataSubmit.content}
                  name="content"
                  className="form-control"
                  id="input-issue"
                  rows="8"
                  placeholder="Content"
                ></textarea>
              </div>
            </Tab>
            <Tab eventKey="preview" title="Preview">
              <h2>Title: {dataSubmit.title}</h2>
              <h5>
                Labels:{" "}
                <span
                  style={{
                    borderRadius: "5px",
                    padding: "5px 5px 5px 5px"
                  }}
                >
                  {dataSubmit.labels}
                </span>
              </h5>
              <p>Content: {dataSubmit.content}</p>
            </Tab>
          </Tabs>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={() => setIsOpen(false)}
          >
            {" "}
            Close Prompt
          </button>
        </form>
      </ReactModal>
     */}
    </div>
  );
}
