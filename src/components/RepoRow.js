import React from "react";
import moment from "moment";

export default function RepoRow(props) {
  return (
    <div className="row p-3 w-100 m-0 my-2 border-bottom">
      <div className="col-10">
        <a href="#!" onClick={() => console.log("repo clicked")}>
          <h5 className="text-primary" style={{ fontSize: "2rem" }}>
            {props.repo.full_name}
          </h5>
        </a>
        <h5 className="my-3" style={{ fontSize: "14px" }}>
          {props.repo.description}
        </h5>
        <h6 className="text-muted">
          Updated {moment(props.repo.updated_at).fromNow()}
        </h6>
      </div>
    </div>
  );
}

/* example Repo object being passed in
JSON

id: 242666884
node_id: "MDEwOlJlcG9zaXRvcnkyNDI2NjY4ODQ="
name: "GoogleLandingPage"
full_name: "khoi148/GoogleLandingPage"
private: false
owner: {login: "khoi148", id: 9248024, node_id: "MDQ6VXNlcjkyNDgwMjQ=", avatar_url: "https://avatars1.githubusercontent.com/u/9248024?v=4", gravatar_id: "", …}
html_url: "https://github.com/khoi148/GoogleLandingPage"
description: "Coderschool Repo 2020 - Copy of Google's Landing Page"
fork: false
url: "https://api.github.com/repos/khoi148/GoogleLandingPage"
forks_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/forks"
keys_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/keys{/key_id}"
collaborators_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/collaborators{/collaborator}"
teams_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/teams"
hooks_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/hooks"
issue_events_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/issues/events{/number}"
events_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/events"
assignees_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/assignees{/user}"
branches_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/branches{/branch}"
tags_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/tags"
blobs_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/git/blobs{/sha}"
git_tags_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/git/tags{/sha}"
git_refs_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/git/refs{/sha}"
trees_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/git/trees{/sha}"
statuses_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/statuses/{sha}"
languages_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/languages"
stargazers_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/stargazers"
contributors_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/contributors"
subscribers_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/subscribers"
subscription_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/subscription"
commits_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/commits{/sha}"
git_commits_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/git/commits{/sha}"
comments_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/comments{/number}"
issue_comment_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/issues/comments{/number}"
contents_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/contents/{+path}"
compare_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/compare/{base}...{head}"
merges_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/merges"
archive_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/{archive_format}{/ref}"
downloads_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/downloads"
issues_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/issues{/number}"
pulls_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/pulls{/number}"
milestones_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/milestones{/number}"
notifications_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/notifications{?since,all,participating}"
labels_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/labels{/name}"
releases_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/releases{/id}"
deployments_url: "https://api.github.com/repos/khoi148/GoogleLandingPage/deployments"
created_at: "2020-02-24T06:52:32Z"
updated_at: "2020-02-26T10:32:28Z"
pushed_at: "2020-02-26T10:32:26Z"
git_url: "git://github.com/khoi148/GoogleLandingPage.git"
ssh_url: "git@github.com:khoi148/GoogleLandingPage.git"
clone_url: "https://github.com/khoi148/GoogleLandingPage.git"
svn_url: "https://github.com/khoi148/GoogleLandingPage"
homepage: null
size: 5
stargazers_count: 0
watchers_count: 0
language: "HTML"
has_issues: true
has_projects: true
has_downloads: true
has_wiki: true
has_pages: false
forks_count: 0
mirror_url: null
archived: false
disabled: false
open_issues_count: 0
license: null
forks: 0
open_issues: 0
watchers: 0
default_branch: "master"
score: 1
*/
