import React, { Component } from "react";

export default function IssueRow() {
  return (
    <div className="row p-3 bg-warning w-100 m-0">
      <div className="col-11 bg-success">
        <h5>
          Bug issue <button className="btn btn-danger btn-sm">error</button>
        </h5>
        <h6 className="text-muted">
          #29 opened 7 hours ago by
          <a href="#">Somebody</a>
        </h6>
      </div>
      <div className="col-1 text-right">
        <a href="#">cmt</a>
      </div>
    </div>
  );
}
