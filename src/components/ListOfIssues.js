import React, { useState, useEffect } from "react";

export default function ListOfIssues(props) {
  return (
    <div
      className="row mt-2"
      style={{ border: "1px solid grey", borderRadius: "10px" }}
    >
      <div
        className="d-flex p-3"
        style={{
          backgroundColor: "lightgray",
          width: "100%",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px"
        }}
      >
        <div className="col-3">
          <a href="#">22 Open</a>
          <a href="#">4 Closed</a>
        </div>
        <div className="col-9 d-flex justify-content-end">
          <div className="btn-group p-0 ml-2" style={{ height: "30px" }}>
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary btn-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Author
              </button>
              <div className="dropdown-menu">
                <div>Notifications</div>
                <a className="dropdown-item" href="#">
                  Not watching
                </a>
                <a className="dropdown-item" href="#">
                  Releases only
                </a>
                <a className="dropdown-item" href="#">
                  Watching
                </a>
                <a className="dropdown-item" href="#">
                  Ignoring
                </a>
              </div>
            </div>
          </div>
          <div className="btn-group p-0 ml-2" style={{ height: "30px" }}>
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary btn-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Label
              </button>
              <div className="dropdown-menu">
                <div>Notifications</div>
                ....
              </div>
            </div>
          </div>
          <div className="btn-group p-0 ml-2" style={{ height: "30px" }}>
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary btn-sm dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort
              </button>
              <div className="dropdown-menu">
                <div>Notifications</div>
                ....
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
}
