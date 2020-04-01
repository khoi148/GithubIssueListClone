import React, { useState } from "react";
import ReactModal from "react-modal";
import { Tab, Tabs } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";

export default function AddNewIssue(props) {
  //props user, repo
  const [key, setKey] = useState("createissue");
  const [timeToRedirect, setTimeToRedirect] = useState(false);
  let { user, repo } = useParams();

  let [dataSubmit, setDataSubmit] = useState({
    title: "",
    content: "",
    labels: []
  });
  const onInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setDataSubmit({
      ...dataSubmit,
      [name]: value
    });
  };
  //Route component
  const postIssue = async e => {
    e.preventDefault();
    if (typeof dataSubmit.labels === "string")
      dataSubmit.labels = dataSubmit.labels
        .split(",")
        .filter(item => item !== "");
    console.log(dataSubmit.labels);
    if (!dataSubmit.title || !dataSubmit.content) {
      alert("Dont leave title or content box blank!!");
      return false;
    }

    try {
      const issue = {
        title: dataSubmit.title,
        body: dataSubmit.content,
        labels: dataSubmit.labels
      };
      const url = `https://api.github.com/repos/${user}/${repo}/issues`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `token ${props.token}`
        },
        body: JSON.stringify(issue)
      });
      console.log(props.token);
      if (response.ok) {
        alert("Your issue had been created successfully!");
        setDataSubmit({ title: "", content: "", labels: [] });
        setTimeToRedirect(true);
        // setCreateIssueModal(false);
      } else {
        alert("The issue was not posted. API Error on POST");
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (timeToRedirect === true)
    return <Redirect to={`/homepage/${user}/${repo}`} />;
  return (
    <div className="d-flex flex-column align-items-center">
      <form onSubmit={event => postIssue(event)}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={k => setKey(k)}
        >
          <Tab eventKey="createissue" title="Create Issue">
            <div className="form-group">
              <label>
                Title of Issue for {user}/{repo}
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
      </form>
      <button className="btn btn-primary mx-2 self-align-start">
        <Link className="text-light text-decoration-none" to="/">
          Go back
        </Link>
      </button>
    </div>
  );
}
