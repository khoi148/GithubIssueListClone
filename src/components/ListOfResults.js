import React, { Component } from "react";
import IssueRow from "./IssueRow.js";
import Pagination from "react-bootstrap/Pagination";

export default class ListOfResults extends Component {
  //this.props. repos | issues | displayWhat {repo: false, issue: false}

  constructor() {
    super();
    this.state = {
      arrayOfPages: []
    };
  }

  paginationClick = event => {
    let pageNum = event.target.id; //id
    console.log(pageNum);
    this.props.pageSwitch(pageNum, this.props.displayWhat);
  };

  render() {
    return (
      <div>
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
              <span className="text-secondary">
                Total results: {this.props.issues.total_count}
              </span>
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

          {this.props.issues.items !== undefined &&
            this.props.issues.items.map(item => {
              return <IssueRow issue={item} />;
            })}
        </div>

        {this.props.issues.items !== undefined && (
          <div className="bg-warning mt-4">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              {this.props.issues.items.map(item => {
                return (
                  <Pagination.Item
                    id={"test"}
                    onClick={event => this.paginationClick(event)}
                  >
                    1
                  </Pagination.Item>
                );
              })}

              {/* <Pagination.Ellipsis />
            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>}  */}

              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        )}
      </div>
    );
  }
}
