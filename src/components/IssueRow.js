import React from "react";
import closeLogo from "../img/close.svg";
import openLogo from "../img/open.svg";
import moment from "moment";

export default function IssueRow(props) {
  let user = props.issue.repository_url.split("repos/")[1].split("/")[0];
  let repos = props.issue.repository_url.split("repos/")[1].split("/")[1];

  return (
    <div className="row p-3 w-100 m-0 my-2 border-bottom">
      <div className="col-10">
        <a
          href="#!"
          onClick={() => props.toggle(user, repos, props.issue.number)}
        >
          <h5 className="text-dark">
            {props.issue.title}
            <img
              className="ml-2"
              alt="..."
              src={props.issue.state === "closed" ? closeLogo : openLogo}
            />
          </h5>
          {props.issue.labels &&
            props.issue.labels.map(item => {
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
        </a>
        <h6 className="text-primary my-3">
          For Repo: {props.issue.url.split(".com/repos/")[1]}
        </h6>
        <h6 className="text-muted">
          #{props.issue.number} opened{" "}
          {moment(props.issue.updated_at).fromNow()}
          {" by" + props.issue.user.login}
        </h6>
      </div>
    </div>
  );
}

/* Issue object example:
url: "https://api.github.com/repos/AdguardTeam/AdguardFilters/issues/52424"
repository_url: "https://api.github.com/repos/AdguardTeam/AdguardFilters"
labels_url: "https://api.github.com/repos/AdguardTeam/AdguardFilters/issues/52424/labels{/name}"
comments_url: "https://api.github.com/repos/AdguardTeam/AdguardFilters/issues/52424/comments"
events_url: "https://api.github.com/repos/AdguardTeam/AdguardFilters/issues/52424/events"
html_url: "https://github.com/AdguardTeam/AdguardFilters/issues/52424"
id: 589620779
node_id: "MDU6SXNzdWU1ODk2MjA3Nzk="
number: 52424
title: "apps.facebook.com"
user: {login: "adguard-bot", id: 30082422, node_id: "MDQ6VXNlcjMwMDgyNDIy", avatar_url: "https://avatars1.githubusercontent.com/u/30082422?v=4", gravatar_id: "", …}
labels: (3) [{…}, {…}, {…}] 
--> inside a label object {
  id: 1652348314
  node_id: "MDU6TGFiZWwxNjUyMzQ4MzE0"
  url: "https://api.github.com/repos/EnigmaDragons/ProjectBitVault/labels/project"
  name: "project"
  color: "E88A03"
  default: false
  description: null
}

state: "open"
locked: false
assignee: null
assignees: []
milestone: null
comments: 0
created_at: "2020-03-28T17:25:32Z"
updated_at: "2020-03-28T17:25:33Z"
closed_at: null
author_association: "NONE"
body: "..."
score: 1
*/
