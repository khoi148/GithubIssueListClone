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
    </div>
  );
}
